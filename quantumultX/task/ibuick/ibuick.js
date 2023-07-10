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

// task list

// updateTaskStatusV3
const updateTaskStatusV3Url = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/userTask/updateTaskStatusV3';

// 发布一条动态
const addContentV2Url = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/addContentV2';
const addContentV2Data = `{"data":"JDjWV9lNV0TSu23fxRcHRdXC4B1d3PD9jc8BPFh0Tf18d1I3scAzLMPKzLbOOeCx\/g+pXG13EVc0+tS4BMZ7RjoKOWMjLaT8c6hkhO4TphAVcGNwS8sHDWIgEWL2Pqft6JdhKE+51tUPPnzptM4JfoqR5T+G9eiTcBpMuknm6G6KCV\/f70ssXhbl+cseRzxqEaOapjSpdS3pZRnY0\/2foClk0KXeqjxBdT2SkmA9YN6EII1MhvutXeHTGISFPVmA\/JN1+gxQ3bWhDzN0fZAS5\/ZrC4cuSz39r\/AZgjuV+wXqOPjnlIMSq750EgUilTYeJvsU4OJ1jNMtfMxQRrCxnhWGU4bRutTDQ0bC8T\/ryZyluU0NgTgjQPx5MrJGf0AAQWn+wnGvEoFYGJgXqX5+I8z6SjYtqjIeZh6KpKQYyOe\/07TudLlRZDf66qDwHtGApufHbMqFD2HrSU4+yYXNJymKwgR\/y2OgWWfRKvlDGaBw06yPfHE+SChwD\/DGwtIR"}`;

// 获取用户任务列表V3
const getUserTaskListV3Url = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/userTask/getUserTaskListV3?data=cOVVqvieA5FUCyefjpEEFxaKXn2qC1HGEX8hKqtR6D/sOlU16gYwCG%2B0u7YLN7pwnsINKyT3DjBw1hdVB0WFYkfYf/DZ4rA%2BaxgbP43kfRlD2PFDUvgnDgYRwOXv6PbUtBHQM0y86Iq%2BSE4H8zy2i5/exRCCXvdSZjRxl/0UTtE%3D';

// 阅读一篇官方贴
const readContentUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/readContent';
const readContentData = `{"data":"ib00J4kZBfP\/WJGSXMCl1eE65nBi78pmty2EqvJIc\/RSTdXlN+YJO8pzUZp3E4VSn+Wk5tqjwW3\/JDx2WnQpSgADMhzwlpsM4k8zdRNVBNgp9qIzLCKzpCAMGBE3QJPkY7YT+3vcQKChCiNN6I8np2fx0hTefxtlIcLt8g29gIQ="}`;
const readContentUpdateTaskStatusV3Data = `{"data":"OR+8JKAJEvUBqW1xkZvbitGYGRbsf\/\/8D5RmaOdIcowE4jlYmr1SfTD2iXIQrvbpfGs8CtoMlLLWQHioQQ494\/\/7alqFVR9W0DRR+EeieI1kDxpYQnGuDdeoXlrtgaPH6mCCYTpROB5xmgXliELet0iMGoD0ByWBlbckWE1xDVU="}`;

// 浏览此刻页面
const readContentData_ck = `{"data":"lLL4++njitOGWh6+JLoHoUwn\/GoZPIquwZvqX7OhkKvLByAV02DRpLKWY8crCHE4wRtMKOKOaOG23W5PH3JGweW2V6J8IcbLl77udZfd+jD5+IFw0lLHAQclwwS6ShRKbVwor1PmJBPAJ4lJstG4zDQN1J4tu+Zh2fQz2\/+4BeY="}`;

// 发布一次提问
const qaQuestionCreateUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/qa/question/create';
const qaQuestionCreateData = `{"data":"WlKYhvxlUUTRgbVYkwUMDFYnVqiFTrMQjTWNWP5XVg1MK0K2Z0fxiDuO0ayLqB\/EosCvG0geoCHA3SkMtjj65TFJJYgNcS7xOiJEwB63qdqi0auLmq6A7xU1XWDOI8Nc7EYVW+ZqEG3aK8ssjyPlMg+CmDLrm0CtDNXjjcmkFo53GLzwVB4dfp8hSWZbAusT9fK+hw5tG2agrX97eHMymqbW542LbdQEdxIxcoF6KAKS0z0f\/DOhcZk7RROHcoRV2gm6e7qRF5ohPxRg9nm3JTZj3fjrW16JSEdI9dxGNopv\/0yoKI68eegjuDX5Bqzv3LrD\/fj6b9ttEwNfUtOI7A=="}`;

// 使用用车手账
const billItemAddUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bill/item/add';
const billItemAddData = `{"data":"Gufl28SNZs9XpC1kIQv+pNH59+uJb+EcQPOCWAJxdLDKiyjP\/ioKy+q3K1eavxH\/HOr\/+xoyCKOL4p3yCn5Hm7f9czzLlCWtAIYY8AZhOXu9TUrvmUjriiYIY1pYlS+SjJmNkbw9OVEygUNeyA1pe39ldPdLk2vHurf1d\/DYfFSekgV48E62inEaXt3\/atLn9cu5s+IU6sUyJEWggKhodTjp3NfXQF2+8NefadsrVLobrZ1EFsgQCDbCO+pYpfL6fEDZyfkQH7k5pSXjKL1\/qnVOQ4qyNb8gK3Ph0LGoth0sh30szQOxiW8UiNZMYlc5edcbEcQbBaTRbw4ga5nAUg=="}`;

//发布一次回答
const qaAnswerCreateUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/qa/answer/create';
const qaAnswerCreateData = `{"data":"OKcZYThO43tizDlwZ6Dn80IeD7APAeJHM3hB9uviFwbwqUy1A+OV8GjWt8uk1Xod2pnyMNheFfV4+8qAesRkRANUs+sj70Rl9C4wl5mt9M3cKNb+NYm+tQSSAIDNt5CGu5RpnzVP\/OrCQutspfA948EvQ03d6OxEbCtfhkJ8C+5M9DYGdg+3xM1enUreMU2WTZ8CzdB1eMtTLm1CoDXUCXGHXDMmiKl2QYDdNiUrkCxrFNjsSsbx0nS0eyIRgEQkW4WeZz+vlsMAKff9wxf2MKyyOKGwdLS7i\/2d7A\/iJivYLjbNqn1hAWQMoWYaR+6\/4L\/IWtZtyokhpPJCDPlZ6X4oTRNQe0htsq0VJB3Tl19JqHa8qcnlNuAvgSsKVVK4ZayfLl08hWEJw9g7dfkFsPXhpdamIwO02Bl4xPTIRcalsp+EV613aRc6JC\/YP0y0y+pmChUusBZPFATOtUtlgIlTxF\/Zyvb6oq2EgUPbPswcyrdvjzM5t\/5Arkl5z95IajS5g0Tekig2ERRF19Ijw+I5JPLg5NGGvkOAvEPmYmkvKLBGUDP4GBvdetCxMTJI4frkvWiyPwyu1cIEvUA2lST9nszsCUl2yLwPRj1CbWSUWhfjr\/34mFVCAxUCkYKFbSvkl12h3SPRssQ2GZ8vBpHkSfLoiJQgBjwKmEcyqJMTT8rMOovC9hYOB6MoucN7DPFEAjz2yW7vENUZowTzgmTtvIP1BE7X6T0tly2bQ0Rg5dquj3\/kadqtmrsr7tMwpduAwhWB+FRAhL01OqxGmM08RvrV\/bEVjuOofstFz3taCHtByAkpNYnF5eXwRQ2ddDTzjAz7ZdT6qLTjE3YsGCFkJjyZDlOCNs9WaLICwXjW10ZD3yd2TUCFbFK7LwlUmKMtC3yvTm86DjRi+LnuHpYPq2LIhk\/3+o7keZFXiLSnJvI3foYqMaL31yebc+QeentevdrcMh2KnGMQUshamNhpvDWWEDCXe+0tNFOu\/exq824QsQc+bvjeIQVm3lgCa4LnzmY2P+t0XISESctpCQieIOZhnrFYCaG94Q4yVxAHgI3wa5vsAZU0oN1T07jOkrGt57RNYDGxZI+ffn6MhMkfQ7+VLNfLjzLnQnDqKB7e9Ahu8nhB+yN9WCUSjCIC5hrTkGb\/P\/kvHjZcXDR827idNn4CMGYuHrjp1AVw5f0="}`;

// 在线看车
const pdcSubmitUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/pdc/submit';
const pdcSubmitData = `{"data":"QD02J7OzKf2LvteClx+q9sH9XXhdpzxZtW4sxsctG1dCVGDP\/UUvimrbn1kRTaoKUG\/Rw0\/5SEHiB+dFcLKc\/mtaHuImkevPlxjTHGc+O7bWWK6QgMS5bOZ4GniX7tE07D9Y5J8Nh1KMOXuW+NI4IhRf9heC2DcGmQSpcTT08Rw\/L9vKMaVkZ3QQGoddH9VrsTtaDZKuw8yUMshCzbKlpYR5Jb3BCwTJGtdFDZJDJieAN205goxjHTdKQMvfr24HLzScwMBR7MkaIk\/AuC2uPhdjRBYqkOceWamCy9qjBF4M38f+9CB+\/s2aS\/t\/Sn7H9GvH3vmGgfnav+AqD0gbJA=="}`;
const getTicketUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/userInfo/getTicket?data=cOVVqvieA5FUCyefjpEEFxaKXn2qC1HGEX8hKqtR6D/sOlU16gYwCG%2B0u7YLN7pwnsINKyT3DjBw1hdVB0WFYkfYf/DZ4rA%2BaxgbP43kfRlD2PFDUvgnDgYRwOXv6PbUtBHQM0y86Iq%2BSE4H8zy2i5/exRCCXvdSZjRxl/0UTtE%3D'
const pdcSubmitUpdateTaskStatusV3Data = `{"data":"nB2mtIZI4viubupyhomoK\/F8onK7y3dWD911FwORzJWvXNS1kIMOnX+R\/g6aikXTuuEkjo4gBiZabIutA\/3pmhY2Pp\/WBmBCMzif4It67rKBQZEYCnNzB5JAYnTRo68R+LtKkobJJpdX2sk9eQnN7FlIAGZxKUv9dlnDku7P2JI="}`;

// 添加评论
const addCommentUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/addComment';
const addCommentData = `{"data":"Rf\/Mvqc0XJdZnGqd4rjyPN6wRAEz8Z9fIxEkkhAEbCl1lxJpaynQxFT+y5ks2Vm4CZmcFF3Y3ys24u9KW+cN1KmIhaJULwNj8y9Zc+ySMjDbWUFEDsdWSDBV50JyDf9W1zlmFkanQGMujnIFET+ea0uvRJ5BMkZauQ5xUu8AC0A="}`;


let msg = '';
; (sign = async () => {
    back.log(`🔔 ${cookieName}`)

    // 发布一条动态
    await addContentV2()
    // 获取用户任务列表V3
    await getUserTaskListV3()

    // 阅读一篇官方贴
    await readContent(readContentData)
    await updateTaskStatusV3(readContentUpdateTaskStatusV3Data)

    // 浏览此刻页面
    await readContent(readContentData)
    await updateTaskStatusV3(readContentData_ck)

    // 发布一次提问
    await qaQuestionCreate()

    // 使用用车手账
    await billItemAdd()

    // 发布一次回答
    await qaAnswerCreate()

    // 在线看车
    await pdcSubmit()
    await getTicket()
    await updateTaskStatusV3(readContentUpdateTaskStatusV3Data)

    // 添加评论
    await addComment()

    back.msg(cookieName, "签到成功", msg)
})()
    .catch((e) => back.log(`❌ ${cookieName} 签到失败: ${e}`))
    .finally(() => back.done())



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 发布一条动态
 * @returns 
 */
function addContentV2() {
    return new Promise((resolve, reject) => {
        const url = { url: addContentV2Url, headers: JSON.parse(signheaderVal) }
        url.body = addContentV2Data;
        back.post(url, (error, response, data) => {
            try {
                back.log(`发布一条动态:` + JSON.parse(data).message)
                msg = msg + `发布一条动态:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 发布一条动态 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 发布一条动态 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

/**
 * 获取用户任务列表V3
 * @returns 
 */
function getUserTaskListV3() {
    return new Promise((resolve, reject) => {
        const url = { url: getUserTaskListV3Url, headers: JSON.parse(signheaderVal) }
        back.post(url, (error, response, data) => {
            try {
                back.log(`获取用户任务列表V3:` + JSON.parse(data).message)
                msg = msg + `获取用户任务列表V3:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 获取用户任务列表V3 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 获取用户任务列表V3 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

/**
 * 阅读一篇官方贴
 * @returns 
 */
function readContent(data) {
    return new Promise((resolve, reject) => {
        const url = { url: readContentUrl, headers: JSON.parse(signheaderVal) }
        url.body = data;
        back.post(url, (error, response, data) => {
            try {
                back.log(`阅读一篇官方贴:` + JSON.parse(data).message)
                msg = msg + `阅读一篇官方贴:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 阅读一篇官方贴 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 阅读一篇官方贴 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

/**
 * updateTaskStatusV3
 * @returns 
 */
function updateTaskStatusV3(data) {
    return new Promise((resolve, reject) => {
        const url = { url: updateTaskStatusV3Url, headers: JSON.parse(signheaderVal) }
        url.body = data;
        back.post(url, (error, response, data) => {
            try {
                back.log(`updateTaskStatusV3:` + JSON.parse(data).message)
                msg = msg + `updateTaskStatusV3:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} updateTaskStatusV3 - 失败: ${e}`)
                back.log(`❌ ${cookieName} updateTaskStatusV3 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

/**
 * 发布一次提问
 * @returns 
 */
function qaQuestionCreate() {
    return new Promise((resolve, reject) => {
        const url = { url: qaQuestionCreateUrl, headers: JSON.parse(signheaderVal) }
        url.body = qaQuestionCreateData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`发布一次提问:` + JSON.parse(data).message)
                msg = msg + `发布一次提问:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 发布一次提问 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 发布一次提问 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

/**
 * 使用用车手账
 * @returns 
 */
function billItemAdd() {
    return new Promise((resolve, reject) => {
        const url = { url: billItemAddUrl, headers: JSON.parse(signheaderVal) }
        url.body = billItemAddData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`使用用车手账:` + JSON.parse(data).message)
                msg = msg + `使用用车手账:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 使用用车手账 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 使用用车手账 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}


/**
 * 发布一次回答
 * @returns 
 */
function qaAnswerCreate() {
    return new Promise((resolve, reject) => {
        const url = { url: qaAnswerCreateUrl, headers: JSON.parse(signheaderVal) }
        url.body = qaAnswerCreateData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`发布一次回答:` + JSON.parse(data).message)
                msg = msg + `发布一次回答:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 发布一次回答 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 发布一次回答 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

 /**
 * 在线看车
 * @returns 
 */
function pdcSubmit() {
    return new Promise((resolve, reject) => {
        const url = { url: pdcSubmitUrl, headers: JSON.parse(signheaderVal) }
        url.body = pdcSubmitData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`在线看车:` + JSON.parse(data).message)
                msg = msg + `在线看车:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 在线看车 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 在线看车 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}


 /**
 * getTicket
 * @returns 
 */
 function getTicket() {
    return new Promise((resolve, reject) => {
        const url = { url: getTicketUrl, headers: JSON.parse(signheaderVal) }
        back.post(url, (error, response, data) => {
            try {
                back.log(`getTicket:` + JSON.parse(data).message)
                msg = msg + `getTicket:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} getTicket - 失败: ${e}`)
                back.log(`❌ ${cookieName} getTicket - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}


/**
 * 添加评论
 * @returns 
 */
function addComment() {
    return new Promise((resolve, reject) => {
        const url = { url: addCommentUrl, headers: JSON.parse(signheaderVal) }
        url.body = addCommentData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`添加评论:` + JSON.parse(data).message)
                msg = msg + `添加评论:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 添加评论 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 添加评论 - response: ${JSON.stringify(response)}`)
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



