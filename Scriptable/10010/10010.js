/**
 *
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
    const cacheDirectory = fm.joinPath(fm.documentsDirectory(), `${Script.name()}.Scriptable`);

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

let card = '王卡';
let clientCookie = '';
let fee = '';
let flow = '';
let voice = '';
let point = '';
let base64str = '';

const API_URL = 'http://boxjs.com/query/data/@YaYa_10010.cookie';
const IMAGE_URL = 'https://raw.githubusercontent.com/jaychoubaby/Script/main/Scriptable/10010/10010.png';
const cache = useCache();


const readCache = async () => {
    console.log('读取缓存')
    try {
        const backJson = cache.readJSON('10010.json');
        console.log(`backJson:${backJson}`)
        if (backJson) {
            backInfo = JSON.parse(backJson);
            fee = backInfo.fee;
            flow = backInfo.flow;
            voice = backInfo.voice;
            time = backInfo.time;
        } else {
            console.log('10010.json缓存不存在')
        }

        base64str = cache.readString('base64str');
    } catch (e) {
        console.log(`读取缓存失败:${e}`);
    }
};

const writeCache = async () => {
    console.log('刷新缓存')
    try {
        clientCookie = await getBoxJsCookie();
        if (!clientCookie) {
            // 获取缓存cookie
            clientCookie = cache.readString('cookie');
            console.log(`获取缓存cookie: ${clientCookie}`)
        } else {
            if (cache.readString('cookie') != clientCookie) {
                cache.writeString('cookie', clientCookie);
            }
        }
        if (!clientCookie) {
            throw '无法获取cookie';
        }

        // 查询数据
        await getData();

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
        cache.writeJSON('10010.json', backJson);

        // 背景图
        base64str = cache.readString('base64str');
        if (!base64str) {
            const image = await getImage(IMAGE_URL);
            const obase64str = Data.fromPNG(image).toBase64String();
            const uri = await getSmallBg(`data:image/png;base64,${obase64str}`);
            base64str = uri.replace(/^data:image\/\w+;base64,/, '');
            cache.writeString('base64str', base64str);
        }
        return true;
    } catch (e) {
        console.log(`写入缓存失败:${e}`);
    }
};


const getBoxJsCookie = async () => {
    try {
        // 获取boxjs缓存
        const url = API_URL;
        const request = new Request(url);
        const json = await request.loadJSON();
        return json.val;
    } catch (e) {
        console.log(`获取boxjs cookie失败:${e}`);
    }
}

const login = async () => {
    const url = 'https://m.client.10010.com/dailylottery/static/textdl/userLogin?version=iphone_c@8.0200&desmobile=';
    try {
        const sign = new Request(url);
        sign.headers = { 'cookie': clientCookie };
        const signInfo = await sign.loadString();

        if (signInfo.indexOf('天天抽奖') >= 0 && signInfo.indexOf('请稍后重试') < 0) {
            console.log('用户登录成功');
        } else {
            console.log('用户登录失败');
        }
    } catch (e) {
        console.log(`用户登录失败:${e}`);
    }
}

const getData = async () => {
    await login();
    const url = 'https://m.client.10010.com/mobileserviceimportant/home/queryUserInfoSeven?version=iphone_c@8.0200&desmobiel=&showType=0';
    try {
        const req = new Request(url);
        req.headers = { 'cookie': clientCookie };
        const userInfo = await req.loadJSON();

        if (userInfo.code === 'Y') {
            userInfo.data.dataList.forEach((item) => {
                if (item.type === 'fee') {
                    fee = item.number + item.unit;
                }
                if (item.type === 'flow') {
                    flow = item.number + item.unit;
                }
                if (item.type === 'voice') {
                    voice = item.number + item.unit;
                }
                if (item.type === 'point') {
                    point = item.number + item.unit;
                }
            });
        } else {
            throw 'cookie错误/服务器维护';
        }
    } catch (e) {
        console.log('获取信息失败：' + e);
    }
}

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


const render = async (data) => {
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