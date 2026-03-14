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
    authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSRVpFUWtZM01qVTBSak5HUVRFeE9ETTVSRUpGUVRSR01qRTRSa0UyTlVFeU9EaEVNVGM0T1VNNE1UQTVOMEpDUmpVNE5EUTNNVEJGUVVJelFUZ3pSamMyTlVJNVFqRXdRalU0TVVZNE1rUkZOREF6UTBJMFFUTkVSRVEwTVRRNE9UZzVSa1pEUmpjMFJEaERRelF5UTBGR05EZ3hNREpFTWpkRVF6TTRORFk9IiwiZXhwIjoxNzcyNDcxNzYzLCJpYXQiOjE3Njk4Nzk3NjN9.FrqN7ZOAUC1jAW6ovR2wjOFQvzg5HkrEF8BI-ABgitlx7dETof1x8AloyoV1FGJbnIiEh5_Bup_wvq2iRiercw', // 填入你的 Authorization Token
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
        //const data = cache.read('data.json');
        //if (data) { data._fresh = false; return data; }
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
const drawProgressBar = (ratio, fgHex, w = 400, h = 10) => {
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
//  accessoryRectangular — 矩形锁屏
//
//  仿日历组件：左窄（3层）| 右宽（4层）
//    ┌─────────┬──────────────────────────┐
//    │📡 联通  │ 📶 流量  30.11 GB        │  ← 层1
//    │         │ ████████████░░░░░░░░░░░  │  ← 层2
//    │余额     │ 📞 通话  169 分钟        │  ← 层3
//    │190.05   │ ████████████████████░░░  │  ← 层4
//    └─────────┴──────────────────────────┘
//    ← ~55pt → ←      ~115pt            →
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
//  accessoryRectangular — 矩形锁屏（日历风格）
//
//  左窄 45pt（3层） | 右宽 自动（4层）
//    ┌───────┬───────────────────────┐
//    │📡 联通│ 📶 流量 30.11 GB       │  ← 流量文字
//    │       │ ████████████░░░░░░░░   │  ← 流量进度条
//    │余额   │ 📞 通话 169 分钟       │  ← 通话文字
//    │190.05 │ ████████████████████   │  ← 通话进度条
//    └───────┴───────────────────────┘
// ─────────────────────────────────────────────
const buildRectangular = (widget, data) => {
    const { flowData, voiceData, balanceData } = data;
    const flowStr = formatFlow(flowData.left);
    const voiceStr = `${voiceData.left} 分钟`;
    const flowRatio = pct(flowData.left, flowData.total);
    const voiceRatio = pct(voiceData.left, voiceData.total);
    const amountNum = balanceData ? balanceData.amount : '--';

    // 整体水平布局
    const root = widget.addStack();
    root.layoutHorizontally();

    // ── 左栏（固定 45pt） ──
    const left = root.addStack();
    left.layoutVertically();
    left.size = new Size(55, 0);

    // 顶部弹性 spacer（与右侧对齐）
    left.addSpacer();

    // 第1层：品牌图标 + 简短文字
    const brandRow = left.addStack();
    brandRow.layoutHorizontally();
    brandRow.centerAlignContent();
    const simIcon = brandRow.addImage(SFSymbol.named('simcard.fill').image);
    simIcon.imageSize = new Size(13, 13);
    brandRow.addSpacer(2);
    const brandTxt = brandRow.addText('联通');
    brandTxt.font = Font.semiboldSystemFont(15);
    // 保持左栏宽度，文字略微居中
    left.addSpacer();

    // 第2层：余额标签（居中显示）
    const balRow = left.addStack();
    balRow.layoutHorizontally();
    balRow.addSpacer();
    const balLabel = balRow.addText('余额');
    balLabel.font = Font.systemFont(10);
    balLabel.textOpacity = 0.5;
    balRow.addSpacer();
    left.addSpacer(1);

    // 第3层：余额数值（大号圆角粗体）
    const balVal = left.addText(amountNum);
    balVal.font = Font.boldRoundedSystemFont(17);
    balVal.minimumScaleFactor = 0.55;
    // 底部弹性 spacer，使左栏总高度与右栏匹配
    left.addSpacer(0);

    // 两栏间距（更紧凑）
    root.addSpacer(-1);

    // ── 右栏（自动填充） ──
    const right = root.addStack();
    right.layoutVertically();

    // 顶部弹性 spacer（与左侧对齐）
    right.addSpacer();

    // 第1层：流量文字行
    const flowRow = right.addStack();
    flowRow.layoutHorizontally();
    flowRow.centerAlignContent();
    const flowIcon = flowRow.addImage(SFSymbol.named('antenna.radiowaves.left.and.right').image);
    flowIcon.imageSize = new Size(12, 12);
    flowRow.addSpacer(3);
    const flowLbl = flowRow.addText('流量 ');
    flowLbl.font = Font.systemFont(12);
    flowLbl.textOpacity = 0.7;
    const flowVal = flowRow.addText(flowStr);
    flowVal.font = Font.boldSystemFont(10.5);

    // 第2层：流量进度条
    right.addSpacer(2);
    const flowBar = right.addImage(drawProgressBar(flowRatio, '12A6E4'));
    flowBar.imageSize = new Size(115, 4);
    flowBar.cornerRadius = 2;

    // 第3层：通话文字行
    right.addSpacer(5);
    const voiceRow = right.addStack();
    voiceRow.layoutHorizontally();
    voiceRow.centerAlignContent();
    const voiceIcon = voiceRow.addImage(SFSymbol.named('phone.fill').image);
    voiceIcon.imageSize = new Size(12, 12);
    voiceRow.addSpacer(3);
    const voiceLbl = voiceRow.addText('通话 ');
    voiceLbl.font = Font.systemFont(12);
    voiceLbl.textOpacity = 0.7;
    const voiceVal = voiceRow.addText(voiceStr);
    voiceVal.font = Font.boldSystemFont(11);

    // 第4层：通话进度条
    right.addSpacer(2);
    const voiceBar = right.addImage(drawProgressBar(voiceRatio, 'F86527'));
    voiceBar.imageSize = new Size(115, 4);
    voiceBar.cornerRadius = 2;

    // 底部弹性 spacer
//     right.addSpacer();

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
    widget.setPadding(2, 4, 2, 4);
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
