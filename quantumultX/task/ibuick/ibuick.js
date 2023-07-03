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
const updateTaskStatusV3Url = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/userTask/updateTaskStatusV3';
const updateTaskStatusV3Data = `{"data":"C9qHDAjAlVgXBf1KOk1qP3F02c\/x9XN7Rps\/9o1ueFrOXwP5EjC7GvdtHN7CD2J+N2kkkjCkTJrwzGiTIr8ZZ7QMTr+iru8fplxVT+XOyusSxRTyaqcWhurh+gI\/2zZWcEufe15AZycUtInqIck4GoBfar7Bzuy7MSVzTGd72Us="}`;
const getAgreementsV2Url = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/common/getAgreementsV2';
const getAgreementsV2Data = `{"data":"FRkOtvqLUyvmwaU2jHPYLjrfFKz6ZhZqCH5IEdq33SjONGjHDcMCSndgJS9ED1CLnI4mpgiiSejV23aOpYo6e9TCZ++gByopPfYn577LnfGI0bvcoNtzfUjfpQpH52Dw29OJGZ8qYxwc64iN2aMPcvalOYGwVvsXDw0WKY5uiA8="}`;
const submitTodayUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/microSurvey/submitToday';
const submitTodayData = `{"data":"JFd\/dUuEBJ4rTvEEgoRIETB9y2F6mDbcAb8D3DuDnUTChcql6l4pH+nNS53LDXU0dulRy1K2aJm3tws0fFOeS1siCQVNM8\/9fLuu722DUTERmRtzMO+HFAlBS8JOo+4AjYp5b4Zdep0YvL9SlwAA555\/HjpKdq2ekXtSA7tZmbeH2AFsfcsIw6rkVIlLRs2C4DyEoi+Cel0s0qZcvm13qQ82KPDoktePCkRhJ67ZdZdtyx6NuWYkFpuyTPLobE+SKyYdG5g6HwpHCO4uEooy7HC4pNaACIzEqDzj9DUmhpWl\/6I6NgUVhgMyPDQv+SGZHApAhBnZtatmyVEXPJEIKw=="}`;
const queryTodayUrl = "https://app.sgmlink.com:443/service/ibuick/rest/api/private/microSurvey/queryToday";
const queryTodayData = `{"data":"cOVVqvieA5FUCyefjpEEFxaKXn2qC1HGEX8hKqtR6D\/sOlU16gYwCG+0u7YLN7pwnsINKyT3DjBw1hdVB0WFYkfYf\/DZ4rA+axgbP43kfRlD2PFDUvgnDgYRwOXv6PbUtBHQM0y86Iq+SE4H8zy2i5\/exRCCXvdSZjRxl\/0UTtE="}`;
const createUrl = "https://app.sgmlink.com:443/service/ibuick/rest/api/private/qa/answer/create";
const createData = `{"data":"HPr4Wi08yuhB4VofyKbaK+eOjgeGqxho82ANqasLiGJJIHwtlOX+iNLJ6ox8hsYN0ovXXnNx7kSqgxMz2B\/hw9XAHDTJduCAPUbdtKzydFvcXhesWg1PHrTWFwty4tPV7r33\/5qjOjn92WFk5us1EGprKloo7RFur3swdlGcGcwKN1l5DB+ddfksnWZJMbuVsCAbifS8geeXilqp2CYoAdG9G9T8+0JH4abjKo6XVRco\/BHPsELdj1IhBygiN0vLVrjSm3baFjIGuvPUV33mJQcp0WwXVG+sIQp8nYmoCisnRKbyrnNGIQ2at8VKL+ZFl5Xz27vVCgSebqk5A0p8uYzJCQui\/QBrN+K\/PgR\/t8MmEk35ABYiogRISnn8eXhCfmGiBgj5y1LoJ\/X875FINJg9YW90EPRDYQIbRTwHbvrQZ8so6qf4H25jmx8tkjRQG2pr7TXyBfoWQXdFKYWG2WMy6hV0E2vAmtf+zlS2CzBsh3CDFvtrx5k6uI8yB57DKCPbJcom\/\/LTJymxJNGMJFg4RYcYXwqPFIsDolkKLJTdGWXMbgkwJYJUmrFGk1e3GSlZ6nwBGrTuKSa5n0FZuCqxmwyAzdbg7lB65oHzx3Ui9\/LJe2Jsv9CJJRo+P7IRc5GStm554olo7PzEsFNzskJgUPLO5ILthFgYB+bYzhBhnqah5UpD8voW5pbsBxKsqJkYp4nuvswGt43N7UPS6cKbVAy\/+nSaV1oBkXa5\/vYhHCIX0YPcgiULPDBkFDYCGDp22uuIyArk13J2CIXxQFGoAwdM8JjLqGwniQqHmxJ5ylDNgN4hCsTSeArkjWMex2erpA\/GKURcF6j4BLC8aIMpuewYrR052A91YB\/8a0pFnQ9UTPXKRk8X\/WrLKgmYQ4lCrQhb89yG9Cb3F3xjWEMYXbd+BwmFeumxnMg5lTdM1ccJndoAGV8f\/5LuTcm4D9+nUyeCKzb\/VGawOfKfr5b7i5uHtDUeOy8wncmMIdTcv\/kk4Aquj2CQP1SNZ7OY"}`;
const queryVehicleAuthStatusUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/common/queryVehicleAuthStatus';
const queryVehicleAuthStatusData = `{"data":"cOVVqvieA5FUCyefjpEEFxaKXn2qC1HGEX8hKqtR6D\/sOlU16gYwCG+0u7YLN7pwnsINKyT3DjBw1hdVB0WFYkfYf\/DZ4rA+axgbP43kfRlD2PFDUvgnDgYRwOXv6PbUtBHQM0y86Iq+SE4H8zy2i5\/exRCCXvdSZjRxl\/0UTtE="}`;
const getTicketUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/userInfo/getTicket?data=cOVVqvieA5FUCyefjpEEFxaKXn2qC1HGEX8hKqtR6D/sOlU16gYwCG%2B0u7YLN7pwnsINKyT3DjBw1hdVB0WFYkfYf/DZ4rA%2BaxgbP43kfRlD2PFDUvgnDgYRwOXv6PbUtBHQM0y86Iq%2BSE4H8zy2i5/exRCCXvdSZjRxl/0UTtE%3D';


let msg = '';

; (sign = async () => {
    back.log(`🔔 ${cookieName}`)
    await getContentDetail()
    await readContent()
    await addComment()
    await getCommentPage()
    await updateTaskStatusV3()
    await getAgreementsV2()
    await submitToday()
    await queryToday()
    await create()
    await queryVehicleAuthStatus()
    await getTicket()
    back.msg(cookieName, "签到成功", msg)
})()
    .catch((e) => back.log(`❌ ${cookieName} 签到失败: ${e}`))
    .finally(() => back.done())



function getContentDetail() {
    return new Promise((resolve, reject) => {
        const url = { url: getContentDetailUrl, headers: JSON.parse(signheaderVal) }
        url.body = getContentDetailData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`getContentDetail:` + JSON.parse(data).message)
                msg = msg + `getContentDetail:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.msg(cookieName, `getContentDetail结果: 失败`, `说明: ${e}`)
                back.log(`❌ ${cookieName} getContentDetail - 失败: ${e}`)
                back.log(`❌ ${cookieName} getContentDetail - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

function readContent() {
    return new Promise((resolve, reject) => {
        const url = { url: readContentUrl, headers: JSON.parse(signheaderVal) }
        url.body = readContentData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`readContent:` + JSON.parse(data).message)
                msg = msg + `readContent:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.msg(cookieName, `readContent结果: 失败`, `说明: ${e}`)
                back.log(`❌ ${cookieName} readContent - 失败: ${e}`)
                back.log(`❌ ${cookieName} readContent - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

function addComment() {
    return new Promise((resolve, reject) => {
        const url = { url: addCommentUrl, headers: JSON.parse(signheaderVal) }
        url.body = addCommentData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`addComment:` + JSON.parse(data).message)
                msg = msg + `addComment:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.msg(cookieName, `addComment: 失败`, `说明: ${e}`)
                back.log(`❌ ${cookieName} addComment - 失败: ${e}`)
                back.log(`❌ ${cookieName} addComment - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

function getCommentPage() {
    return new Promise((resolve, reject) => {
        const url = { url: getCommentPageUrl, headers: JSON.parse(signheaderVal) }
        url.body = getCommentPageData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`getCommentPage:` + JSON.parse(data).message)
                msg = msg + `getCommentPage:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.msg(cookieName, `getCommentPage: 失败`, `说明: ${e}`)
                back.log(`❌ ${cookieName} getCommentPage - 失败: ${e}`)
                back.log(`❌ ${cookieName} getCommentPage - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

function updateTaskStatusV3() {
    return new Promise((resolve, reject) => {
        const url = { url: updateTaskStatusV3Url, headers: JSON.parse(signheaderVal) }
        url.body = updateTaskStatusV3Data;
        back.post(url, (error, response, data) => {
            try {
                back.log(`updateTaskStatusV3:` + JSON.parse(data).message)
                msg = msg + `updateTaskStatusV3:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.msg(cookieName, `updateTaskStatusV3: 失败`, `说明: ${e}`)
                back.log(`❌ ${cookieName} updateTaskStatusV3 - 失败: ${e}`)
                back.log(`❌ ${cookieName} updateTaskStatusV3 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

function getAgreementsV2() {
    return new Promise((resolve, reject) => {
        const url = { url: getAgreementsV2Url, headers: JSON.parse(signheaderVal) }
        url.body = getAgreementsV2Data;
        back.post(url, (error, response, data) => {
            try {
                back.log(`getAgreementsV2:` + JSON.parse(data).message)
                msg = msg + `getAgreementsV2:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.msg(cookieName, `getAgreementsV2: 失败`, `说明: ${e}`)
                back.log(`❌ ${cookieName} getAgreementsV2 - 失败: ${e}`)
                back.log(`❌ ${cookieName} getAgreementsV2 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

function submitToday() {
    return new Promise((resolve, reject) => {
        const url = { url: submitTodayUrl, headers: JSON.parse(signheaderVal) }
        url.body = submitTodayData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`submitToday:` + JSON.parse(data).message)
                msg = msg + `submitToday:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.msg(cookieName, `submitToday: 失败`, `说明: ${e}`)
                back.log(`❌ ${cookieName} submitToday - 失败: ${e}`)
                back.log(`❌ ${cookieName} submitToday - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

function queryToday() {
    return new Promise((resolve, reject) => {
        const url = { url: queryTodayUrl, headers: JSON.parse(signheaderVal) }
        url.body = queryTodayData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`queryToday:` + JSON.parse(data).message)
                msg = msg + `queryToday:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.msg(cookieName, `queryToday: 失败`, `说明: ${e}`)
                back.log(`❌ ${cookieName} queryToday - 失败: ${e}`)
                back.log(`❌ ${cookieName} queryToday - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

function create() {
    return new Promise((resolve, reject) => {
        const url = { url: createUrl, headers: JSON.parse(signheaderVal) }
        url.body = createData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`create:` + JSON.parse(data).message)
                msg = msg + `create:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.msg(cookieName, `create: 失败`, `说明: ${e}`)
                back.log(`❌ ${cookieName} create - 失败: ${e}`)
                back.log(`❌ ${cookieName} create - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

function queryVehicleAuthStatus() {
    return new Promise((resolve, reject) => {
        const url = { url: queryVehicleAuthStatusUrl, headers: JSON.parse(signheaderVal) }
        url.body = queryVehicleAuthStatusData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`queryVehicleAuthStatus:` + JSON.parse(data).message)
                msg = msg + `queryVehicleAuthStatus:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.msg(cookieName, `queryVehicleAuthStatus: 失败`, `说明: ${e}`)
                back.log(`❌ ${cookieName} queryVehicleAuthStatus - 失败: ${e}`)
                back.log(`❌ ${cookieName} queryVehicleAuthStatus - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

function getTicket() {
    return new Promise((resolve, reject) => {
        const url = { url: getTicketUrl, headers: JSON.parse(signheaderVal) }
        url.body = getTicketData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`getTicket:` + JSON.parse(data).message)
                msg = msg + `getTicket:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.msg(cookieName, `getTicket: 失败`, `说明: ${e}`)
                back.log(`❌ ${cookieName} getTicket - 失败: ${e}`)
                back.log(`❌ ${cookieName} getTicket - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
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



