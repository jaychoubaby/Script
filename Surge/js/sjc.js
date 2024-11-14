const cookieName = '世界城'
const signurlKey = 'back_signurl_sjc'
const signheaderKey = 'back_signheader_sjc'
const back = init()
const signurlVal = back.getdata(signurlKey)
const signheaderVal = back.getdata(signheaderKey)

sign() //签到


function sign() {

    let h = JSON.parse(signheaderVal)
    var key = "Content-Type";
    var value = "application/json"
    h[key] = value;
    back.log(JSON.stringify(h))

    const url = { url: `https://m.mallcoo.cn/api/user/User/CheckinV2`, headers: h }
    url.body = `{"MallID":10010,"Header":{"Token":"utukSuajwE68vuMIR4L3wQgo-ur6PjbE,15019","systemInfo":{"model":"iPhone 13 Pro Max<iPhone14,3>","SDKVersion":"3.6.3","system":"iOS 18.1","version":"8.0.53","miniVersion":"DZ.2.66.1.SJC.13"}}}`;
    back.post(url, (error, response, data) => {
        back.log(`${cookieName}, data: ${data}`)
        const title = `${cookieName}`
        let subTitle = ''
        let detail = ''
        const result = JSON.parse(data)
        if (result.m == 1) {
            subTitle = `签到结果: 🎉签到成功`
            detail += `${result.d.Msg}` + `\n`
        } else {
            subTitle = `签到结果: ⚠️${result.d.Msg}`
            detail += `${result.e}` + `\n`
        }
        back.msg(title, subTitle, detail)
        back.done()
    })
}



function init() {
    isSurge = () => {
        return undefined === this.$httpClient ? false : true
    }
    isQuanX = () => {
        return undefined === this.$task ? false : true
    }
    getdata = (key) => {
        if (isSurge()) return $persistentStore.read(key)
        if (isQuanX()) return $prefs.valueForKey(key)
    }
    setdata = (key, val) => {
        if (isSurge()) return $persistentStore.write(key, val)
        if (isQuanX()) return $prefs.setValueForKey(key, val)
    }
    msg = (title, subtitle, body) => {
        if (isSurge()) $notification.post(title, subtitle, body)
        if (isQuanX()) $notify(title, subtitle, body)
    }
    log = (message) => console.log(message)
    get = (url, cb) => {
        if (isSurge()) {
            $httpClient.get(url, cb)
        }
        if (isQuanX()) {
            url.method = 'GET'
            $task.fetch(url).then((resp) => cb(null, {}, resp.body))
        }
    }
    post = (url, cb) => {
        if (isSurge()) {
            $httpClient.post(url, cb)
        }
        if (isQuanX()) {
            url.method = 'POST'
            $task.fetch(url).then((resp) => cb(null, {}, resp.body))
        }
    }
    done = (value = {}) => {
        $done(value)
    }
    return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
