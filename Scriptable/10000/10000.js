/**
 * @version 1.1.0
 * @author back
 */

const getImage = async (url) => {
    const request = new Request(url);
    const image = await request.loadImage();
    return image
};



const useCache = () => {
    const fm = FileManager.local();
    const cacheDirectory = fm.joinPath(fm.cacheDirectory(), `${Script.name()}.Scriptable`);

    const writeString = (filePath, content) => {
        const safePath = fm.joinPath(cacheDirectory, filePath).replace(/\/+$/, '');
        const i = safePath.lastIndexOf('/');
        const directory = safePath.substring(0, i);
        if (!fm.fileExists(directory)) {
            fm.createDirectory(directory, true);
        }
        fm.writeString(safePath, content);
    };

    const writeJSON = (filePath, jsonData) => writeString(filePath, JSON.stringify(jsonData));

    const readString = (filePath) => {
        return fm.readString(
            fm.joinPath(cacheDirectory, filePath)
        )
    };

    const readJSON = (filePath) => JSON.parse(readString(filePath));


    return {
        cacheDirectory,
        writeString,
        writeJSON,
        readString,
        readJSON
    }
};

let card = '星卡';
let fee = '';
let flow = '';
let voice = '';
let base64str = '';
let time = '';
const API_URL = 'http://boxjs.com/query/data/Tele_AutoCheck.packge_detail';
const IMAGE_URL = 'https://raw.githubusercontent.com/jaychoubaby/Script/main/Scriptable/10000/10000.png';
const cache = useCache();


const readCache = async () => {
    console.log('读取缓存')
    try {
        const backJson = cache.readJSON('10000.json');
        console.log(`backJson:${backJson}`)
        if (backJson) {
            backInfo = JSON.parse(backJson);
            fee = backInfo.fee;
            flow = backInfo.flow;
            voice = backInfo.voice;
            time = backInfo.time;
        } else {
            console.log('10000.json缓存不存在')
        }

        base64str = cache.readString('base64str');
        console.log(`base64str:${base64str}`)
    } catch (e) {
        console.log(`读取缓存失败:${e}`);
    }
};


const writeCache = async () => {
    console.log('刷新缓存')
    try {
        // 获取boxjs缓存
        const url = API_URL;
        const request = new Request(url);
        const json = await request.loadJSON();
        const telecom = JSON.parse(json.val);
        fee = telecom.responseData.data.balanceInfo.indexBalanceDataInfo.balance + "元";
        flow = (telecom.responseData.data.flowInfo.commonFlow.balance / 1024 / 1024).toFixed(2) + "GB";
        voice = telecom.responseData.data.voiceInfo.voiceBars[0].rightTitleHh;

        const dfm = new DateFormatter();
        dfm.dateFormat = 'HH:mm';
        time = dfm.string(new Date());

        // 缓存
        var backJson = {
            fee: fee,
            flow: flow,
            voice: voice,
            time: time
        }
        cache.writeJSON('10000.json', JSON.stringify(backJson));

        // 背景图
        base64str = cache.readString('base64str');
        console.log(`获取缓存图片base64:${base64str}`);
        if (!base64str) {
            const image = await getImage(IMAGE_URL);
            const obase64str = Data.fromPNG(image).toBase64String();
            const uri = await getSmallBg(`data:image/png;base64,${obase64str}`);
            base64str = uri.replace(/^data:image\/\w+;base64,/, '');
            console.log(`写入缓存图片base64:${base64str}`);
            cache.writeString('base64str', base64str);
        }

        return json
    } catch (e) {
        console.log(`写入缓存失败:${e}`);
    }
};



const getSmallBg = async (url) => {
    const webview = new WebView();
    const js =
        `const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const { width, height } = img
        canvas.width = width
        canvas.height = height
        ctx.globalAlpha = 0.3
        ctx.drawImage(
          img,
          -width / 2 + 50,
          -height / 2 + 50,
          width,
          height
        )
        const uri = canvas.toDataURL()
        completion(uri);
      };
      img.src = '${url}'`;
    const uri = await webview.evaluateJavaScript(js, true);
    return uri
};


const render = async () => {
    const widget = new ListWidget();
    widget.backgroundColor = Color.dynamic(new Color('#fff'), new Color('#242426'));
    if (config.widgetFamily === 'small') {
        widget.url = API_URL;
        widget.backgroundImage = Image.fromData(Data.fromBase64String(base64str));
        widget.setPadding(12, 12, 12, 12);
        const coin = widget.addText(card);
        coin.font = Font.heavySystemFont(24);
        coin.rightAlignText();
        const name = widget.addText(fee);
        name.font = Font.systemFont(10);
        name.textColor = Color.gray();
        name.rightAlignText();
        widget.addSpacer();

        const trend = widget.addText(voice);
        trend.font = Font.semiboldSystemFont(16);
        trend.textColor = Color.gray();
        trend.rightAlignText();

        const price = widget.addText(flow);
        price.font = Font.boldSystemFont(28);
        price.rightAlignText();
        price.lineLimit = 1;
        price.minimumScaleFactor = 0.1;
        const history = widget.addText("更新于：" + time);
        history.font = Font.systemFont(10);
        history.textColor = Color.gray();
        history.rightAlignText();
        history.lineLimit = 1;
        history.minimumScaleFactor = 0.1;
    } else if (config.widgetFamily === 'medium') {
        widget.addText("暂不支持");
    } else if (config.widgetFamily === 'large') {
        widget.addText("暂不支持");
    }

    return widget
};

const main = async () => {

    // 获取数据并写入缓存
    if (! await writeCache()) {
        await readCache();
    }
    if (config.runsInApp) {
        config.widgetFamily = config.widgetFamily || 'small';
    }
    const widget = await render();
    Script.setWidget(widget);
    if (config.runsInApp) {
        switch (config.widgetFamily) {
            case 'small':
                widget.presentSmall();
                break
            case 'medium':
                widget.presentMedium();
                break
            case 'large':
                widget.presentLarge();
                break
        }
    }
};

await main();
