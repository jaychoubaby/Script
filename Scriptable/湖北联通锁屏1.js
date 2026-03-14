// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: signal;

/**
 * 湖北联通锁屏组件 - 显示剩余流量和通话时间
 *
 * 支持锁屏组件类型：
 *   - accessoryInline      : 时钟上方单行
 *   - accessoryCircular    : 圆形（流量进度环）
 *   - accessoryRectangular : 矩形（推荐）
 *
 * @version 1.1.0
 */

// ─────────────────────────────────────────────
//  配置区域
// ─────────────────────────────────────────────
const preference = {
    authorization: '', // 填入你的 Authorization Token
    isShowFreeFlow: false // 是否显示免流包
};

// ─────────────────────────────────────────────
//  工具函数
// ─────────────────────────────────────────────

const getCacheManager = () => {
    const fm = FileManager.local();
    const cacheDir = fm.joinPath(fm.documentsDirectory(), Script.name());
    if (!fm.fileExists(cacheDir)) fm.createDirectory(cacheDir, true);
    return {
        read: (name) => {
            const path = fm.joinPath(cacheDir, name);
            return fm.fileExists(path) ? JSON.parse(fm.readString(path)) : null;
        },
        write: (name, data) => {
            fm.writeString(fm.joinPath(cacheDir, name), JSON.stringify(data));
        }
    };
};

const cache = getCacheManager();

const buildHeaders = () => {
    let auth = preference.authorization;
    if (!auth) {
        try {
            const conf = importModule/* ignore */('Config')['10010']();
            auth = conf.Authorization;
        } catch (e) {
            console.warn('未设置 Authorization');
        }
    }
    return {
        zx: '12',
        Authorization: auth,
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f2e) NetType/4G Language/en'
    };
};

const fetchBalance = async () => {
    const req = new Request('https://wap.10010hb.net/zinfo/front/user/findFeePackage');
    req.headers = buildHeaders();
    req.method = 'POST';
    const res = await req.loadJSON();
    if (res.success) return res.data;
    return Promise.reject(res);
};

const fetchPackageLeft = async () => {
    const req = new Request('https://wap.10010hb.net/zinfo/front/user/findLeftPackage');
    req.headers = buildHeaders();
    req.method = 'POST';
    const res = await req.loadJSON();
    if (res.success) return res.data;
    return Promise.reject(res);
};

const fetchData = async () => {
    try {
        const [balance, packageLeft] = await Promise.all([fetchBalance(), fetchPackageLeft()]);
        const { addupInfoList } = packageLeft;
        const flowData = { left: 0, total: 0 };
        const voiceData = { left: 0, total: 0 };

        for (const item of addupInfoList) {
            if (item.ELEM_TYPE === '1') {
                voiceData.left += Number(item.X_CANUSE_VALUE);
                voiceData.total += Number(item.ADDUP_UPPER);
            }
            if (item.ELEM_TYPE === '3') {
                if (preference.isShowFreeFlow || item.RESOURCE_TYPE !== '13') {
                    flowData.left += Number(item.X_CANUSE_VALUE);
                    flowData.total += Number(item.ADDUP_UPPER);
                }
            }
        }

        const data = { balanceData: balance, flowData, voiceData, updatedAt: Date.now() };
        cache.write('data.json', data);
        data._fresh = true;
        return data;
    } catch (e) {
        const data = cache.read('data.json');
        if (data) { data._fresh = false; return data; }
        return {
            balanceData: { amount: '0' },
            flowData: { left: 0, total: 0 },
            voiceData: { left: 0, total: 0 },
            _fresh: false
        };
    }
};

/** MB → 易读字符串 */
const formatFlow = (mb) =>
    mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(0)} MB`;

/** 剩余比例（0~1） */
const pct = (left, total) => (total > 0 ? Math.min(left / total, 1) : 0);

// ─────────────────────────────────────────────
//  绘制水平进度条
//  w × h 像素，返回 Image
// ─────────────────────────────────────────────
const drawProgressBar = (ratio, fgHex, w = 400, h = 8) => {
    const ctx = new DrawContext();
    ctx.size = new Size(w, h);
    ctx.opaque = false;
    ctx.respectScreenScale = true;

    const r = h / 2; // 圆角半径

    // 背景轨道（白色低透明度）
    ctx.setFillColor(new Color('ffffff', 0.22));
    ctx.fillRect(new Rect(0, 0, w, h));

    // 前景填充
    const fgW = Math.max(ratio * w, h); // 最小宽度 = h，保持圆头
    ctx.setFillColor(new Color(fgHex, 0.9));
    ctx.fillRect(new Rect(0, 0, fgW, h));

    return ctx.getImage();
};

// ─────────────────────────────────────────────
//  绘制圆弧进度环（用于 Circular）
// ─────────────────────────────────────────────
const drawProgressRing = (ratio, fgHex, size = 150) => {
    const ctx = new DrawContext();
    ctx.size = new Size(size, size);
    ctx.opaque = false;
    ctx.respectScreenScale = true;

    const cx = size / 2, cy = size / 2;
    const radius = size / 2 - 12;
    const lineW = 12;
    const deg = ratio * 360;

    ctx.setStrokeColor(new Color('ffffff', 0.2));
    ctx.setLineWidth(lineW);
    ctx.strokeEllipse(new Rect(cx - radius, cy - radius, radius * 2, radius * 2));

    ctx.setFillColor(new Color(fgHex, 0.9));
    for (let t = 0; t < deg; t++) {
        const rad = (t - 90) * Math.PI / 180;
        const x = cx + radius * Math.cos(rad) - lineW / 2;
        const y = cy + radius * Math.sin(rad) - lineW / 2;
        ctx.fillEllipse(new Rect(x, y, lineW, lineW));
    }
    return ctx.getImage();
};

// ─────────────────────────────────────────────
//  accessoryRectangular — 矩形锁屏（推荐）
//
//  布局（每块 = 文字行 + 进度条行）：
//    ┌─────────────────────────────┐
//    │ 📡 中国联通             🟢  │  ← 标题行
//    │ 📶 流量  30.11 GB           │  ← 流量文字
//    │ ████████████░░░░░░░░░░░░    │  ← 流量进度条
//    │ 📞 通话  169 分钟           │  ← 通话文字
//    │ ████████████████████░░░░    │  ← 通话进度条
//    └─────────────────────────────┘
// ─────────────────────────────────────────────
const buildRectangular = (widget, data) => {
    const { flowData, voiceData, balanceData, _fresh } = data;
    const flowStr = formatFlow(flowData.left);
    const voiceStr = `${voiceData.left} 分钟`;
    const flowRatio = pct(flowData.left, flowData.total);
    const voiceRatio = pct(voiceData.left, voiceData.total);
    const amountNum = balanceData ? balanceData.amount : '--';

    // ── 标题行 ──────────────────────────────────
    const titleRow = widget.addStack();
    titleRow.layoutHorizontally();
    titleRow.topAlignContent();

    const simIcon = titleRow.addImage(SFSymbol.named('simcard.fill').image);
    simIcon.imageSize = new Size(12, 12);
    titleRow.addSpacer(4);

    const titleTxt = titleRow.addText('中国联通');
    titleTxt.font = Font.semiboldSystemFont(11);

    titleRow.addSpacer();

    // 右上角：余额 两行叠放，简洁精致
    const balStack = titleRow.addStack();
    balStack.layoutVertically();

    const balLabel = balStack.addText('余额');
    balLabel.font = Font.systemFont(8);
    balLabel.textOpacity = 0.55;
    balLabel.rightAlignText();

    const balVal = balStack.addText(amountNum);
    balVal.font = Font.boldRoundedSystemFont(13);
    balVal.minimumScaleFactor = 0.7;
    balVal.rightAlignText();

    widget.addSpacer(2);

    // ── 流量区块 ────────────────────────────────
    const flowBlock = widget.addStack();
    flowBlock.layoutVertically();

    // 文字行
    const flowRow = flowBlock.addStack();
    flowRow.layoutHorizontally();
    flowRow.centerAlignContent();

    const flowIcon = flowRow.addImage(SFSymbol.named('antenna.radiowaves.left.and.right').image);
    flowIcon.imageSize = new Size(13, 13);
    flowRow.addSpacer(4);

    const flowLbl = flowRow.addText('流量  ');
    flowLbl.font = Font.systemFont(13);
    flowLbl.textOpacity = 0.72;

    const flowVal = flowRow.addText(flowStr);
    flowVal.font = Font.boldSystemFont(13);

    // 进度条
    flowBlock.addSpacer(2);
    const flowBarImg = flowBlock.addImage(drawProgressBar(flowRatio, '12A6E4'));
    flowBarImg.imageSize = new Size(172, 4);
    flowBarImg.cornerRadius = 2;

    widget.addSpacer(3);

    // ── 通话区块 ────────────────────────────────
    const voiceBlock = widget.addStack();
    voiceBlock.layoutVertically();

    const voiceRow = voiceBlock.addStack();
    voiceRow.layoutHorizontally();
    voiceRow.centerAlignContent();

    const voiceIcon = voiceRow.addImage(SFSymbol.named('phone.fill').image);
    voiceIcon.imageSize = new Size(13, 13);
    voiceRow.addSpacer(4);

    const voiceLbl = voiceRow.addText('通话  ');
    voiceLbl.font = Font.systemFont(13);
    voiceLbl.textOpacity = 0.72;

    const voiceVal = voiceRow.addText(voiceStr);
    voiceVal.font = Font.boldSystemFont(13);

    voiceBlock.addSpacer(2);
    const voiceBarImg = voiceBlock.addImage(drawProgressBar(voiceRatio, 'F86527'));
    voiceBarImg.imageSize = new Size(172, 4);
    voiceBarImg.cornerRadius = 2;

    return widget;
};

// ─────────────────────────────────────────────
//  accessoryCircular — 圆形（显示流量进度环）
// ─────────────────────────────────────────────
const buildCircular = (widget, data) => {
    const { flowData } = data;
    const ratio = pct(flowData.left, flowData.total);

    // 进度环作为背景
    widget.backgroundImage = drawProgressRing(ratio, '12A6E4', 150);

    widget.addSpacer();

    const center = widget.addStack();
    center.layoutVertically();
    center.addSpacer();

    const val = center.addText(
        flowData.left >= 1024
            ? `${(flowData.left / 1024).toFixed(1)}`
            : `${Math.round(flowData.left)}`
    );
    val.font = Font.boldSystemFont(18);
    val.minimumScaleFactor = 0.5;
    val.centerAlignText();

    const unit = center.addText(flowData.left >= 1024 ? 'GB' : 'MB');
    unit.font = Font.systemFont(9);
    unit.textOpacity = 0.85;
    unit.centerAlignText();

    center.addSpacer();
    widget.addSpacer();

    return widget;
};

// ─────────────────────────────────────────────
//  accessoryInline — 单行（仅支持 image + text）
// ─────────────────────────────────────────────
const buildInline = (widget, data) => {
    const { flowData, voiceData } = data;
    const icon = widget.addImage(SFSymbol.named('simcard.fill').image);
    icon.tintColor = Color.white();
    const txt = widget.addText(
        `流量 ${formatFlow(flowData.left)}  通话 ${voiceData.left}分钟`
    );
    txt.font = Font.systemFont(12);
    return widget;
};

// ─────────────────────────────────────────────
//  主流程
// ─────────────────────────────────────────────
const run = async () => {
    const data = await fetchData();
    const widget = new ListWidget();
    // iPhone 13 Pro Max accessoryRectangular 约 182×86pt
    // 适度垂直 padding 让内容呼吸，对齐左侧天气组件的视觉密度
    widget.setPadding(4, 4, 4, 4);
    widget.refreshAfterDate = new Date(Date.now() + 30 * 60 * 1000);

    const family = config.widgetFamily;

    if (family === 'accessoryInline') {
        buildInline(widget, data);
    } else if (family === 'accessoryCircular') {
        buildCircular(widget, data);
    } else {
        // accessoryRectangular 及 App 内预览
        buildRectangular(widget, data);
    }

    if (config.runsInWidget) {
        Script.setWidget(widget);
    } else {
        await widget.presentAccessoryRectangular();
    }

    Script.complete();
};

await run();
