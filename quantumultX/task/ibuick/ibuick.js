const cookieName = 'ibuick'
const signurlKey = 'back_signurl_ibuick'
const signheaderKey = 'back_signheader_ibuick'
const back = init()
const signurlVal = back.getdata(signurlKey)
const signheaderVal = back.getdata(signheaderKey)

/**
 * [task_local]
 * 
 * 0 10 9 * * * https://raw.githubusercontent.com/jaychoubaby/Script/main/qxjs/ibuick/ibuick.js, tag=ibuick任务, enabled=true
 */

// url list
const getContentDetailUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/getContentDetail';
const getContentDetailData = `{"data":"Ws8bq9+pXiUsSCJ3WslAaqWE9awdZGAHnDYXit19YuZJpWD8u9DpV\/OE83tIMMkYwZXjE\/LBL1eZDXgO6fLzZvR8MCYKJ+Qi17Co5cXyoCeXAxigFPNxA3kTs7wbrV3BXBjgbaf9\/t4v0iwhynOTekku7qSoRiz8aSMXC7rIYok="}`;
const readContentUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/readContent';
const readContentData = `{"data":"Ws8bq9+pXiUsSCJ3WslAaqWE9awdZGAHnDYXit19YuZJpWD8u9DpV\/OE83tIMMkYwZXjE\/LBL1eZDXgO6fLzZvR8MCYKJ+Qi17Co5cXyoCeXAxigFPNxA3kTs7wbrV3BXBjgbaf9\/t4v0iwhynOTekku7qSoRiz8aSMXC7rIYok="}`;
const addCommentUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/addComment';
const addCommentData = `{"data":"Rf\/Mvqc0XJdZnGqd4rjyPN6wRAEz8Z9fIxEkkhAEbCl1lxJpaynQxFT+y5ks2Vm4CZmcFF3Y3ys24u9KW+cN1KmIhaJULwNj8y9Zc+ySMjDbWUFEDsdWSDBV50JyDf9W1zlmFkanQGMujnIFET+ea0uvRJ5BMkZauQ5xUu8AC0A="}`;
const getCommentPageUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/getCommentPage';
const getCommentPageData = `{"data":"EEXknsrMM78hPFGhhVw6MlaifRs4PPGtpthpfz\/Efk7kJ7vTaRVBmeCGRa6Yy7hImt1EkvK5S09\/cygPeqXRn+UaSjSkXJ7Gdto9AUhkvPJUgBUco+UuikAay5wFp+SxF4YF2Sra6qDxZVqBkY248DNeEVLSlrjsfgcZDqE3TSE="}`;




let detail = ''
let subTitle = ''

function init() {
    setTimeout(getContentDetail, 3000);
    setTimeout(readContent, 3000);
    setTimeout(addComment, 3000);
    setTimeout(getCommentPage, 3000);
}

function getContentDetail() {
    let h = JSON.parse(signheaderVal)
    const url = { url: getContentDetailUrl, headers: h }
    url.body = getContentDetailData;
    back.post(url, (error, response, data) => {
        try {
            back.log(`${cookieName}, data: ${data}`)
            const title = `${cookieName}`
            const result = JSON.parse(data)
            if (result.resultCode == "0000") {
                subTitle = `getContentDetail结果: 🎉成功` + `\n`
            } else {
                subTitle = `getContentDetail结果: ⚠️${result.message}`
            }
            back.msg(title, subTitle, detail)
            back.done()
        } catch (error) {
            back.log(error)
            back.done()
        }
    })
}

function readContent() {
    let h = JSON.parse(signheaderVal)
    const url = { url: readContentUrl, headers: h }
    url.body = readContentData;
    back.post(url, (error, response, data) => {
        try {
            back.log(`${cookieName}, data: ${data}`)
            const title = `${cookieName}`
            const result = JSON.parse(data)
            if (result.resultCode == "0000") {
                subTitle = `getContentDetail结果: 🎉成功` + `\n`
            } else {
                subTitle = `getContentDetail结果: ⚠️${result.message}`
            }
            back.msg(title, subTitle, detail)
            back.done()
        } catch (error) {
            back.log(error)
            back.done()
        }
    })
}

function addComment() {
    let h = JSON.parse(signheaderVal)
    const url = { url: getCommentPageUrl, headers: h }
    url.body = getCommentPageData;
    back.post(url, (error, response, data) => {
        try {
            back.log(`${cookieName}, data: ${data}`)
            const title = `${cookieName}`
            const result = JSON.parse(data)
            if (result.resultCode == "0000") {
                subTitle = `addComment结果: 🎉评论成功` + `\n`
            } else {
                subTitle = `addComment结果: ⚠️${result.message}`
            }
            back.msg(title, subTitle, detail)
            back.done()
        } catch (error) {
            back.log(error)
            back.done()
        }
    })
}

function getCommentPage() {
    let h = JSON.parse(signheaderVal)
    const url = { url: `https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/addComment`, headers: h }
    url.body = addCommentData;
    back.post(url, (error, response, data) => {
        try {
            back.log(`${cookieName}, data: ${data}`)
            const title = `${cookieName}`
            const result = JSON.parse(data)
            if (result.resultCode == "0000") {
                subTitle = `addComment结果: 🎉评论成功` + `\n`
            } else {
                subTitle = `addComment结果: ⚠️${result.message}`
            }
            back.msg(title, subTitle, detail)
            back.done()
        } catch (error) {
            back.log(error)
            back.done()
        }
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



