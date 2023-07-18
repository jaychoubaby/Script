const cookieName = '世界城'
const signurlKey = 'back_signurl_sjc'
const signheaderKey = 'back_signheader_sjc'
const signbodyKey = 'back_body_sjc'
const back = init()

if ($request && $request.method != 'OPTIONS') {
    const signurlVal = $request.url
    const signheaderVal = JSON.stringify($request.headers)
    const signbodyVal = JSON.stringify($request.body)
    if (signurlVal) back.setdata(signurlVal, signurlKey)
    if (signheaderVal) back.setdata(signheaderVal, signheaderKey)
    if (signbodyVal) back.setdata(signbodyVal, signbodyKey)
    back.msg(cookieName, `获取Cookie: 成功`, `${signbodyVal}`)
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
back.done()