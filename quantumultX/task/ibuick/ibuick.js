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
const getContentPageV2Url = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/getContentPageV2';
const getContentPageV2Data = `{"data":"pyCJnoeXIqE3UFrvMHK+Sei2baf4J3ZTvx7EFRux4RRFS\/SGH0cIyicOiNKaLpdAe0\/wRBbtKLKvtioOCbDdA61ds5gjs0IkqWYjcQxqDA4="}`;
const getContentPageV2UpdateTaskStatusV3Data = `{"data":"lJgex2y\/ufpqjPNDpePiRtv3cSYTLTmjoCGW3xGLX\/KTfexwHNtDmlz+3VRRyucTB5pRaOjo2OzXeOnGjza2g32zX6yga+FaTFXOwFf5eiufSnxYQeKfuYqC4QDPBMfJsRNslNdwJMGSiGNlyMzRCuoNpwEWvDsJECoRaWmCdEg="}`;
const getContentDetailUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/getContentDetail';
const getContentDetailData = `{"data":"lLL4++njitOGWh6+JLoHoUwn\/GoZPIquwZvqX7OhkKvLByAV02DRpLKWY8crCHE4wRtMKOKOaOG23W5PH3JGweW2V6J8IcbLl77udZfd+jD5+IFw0lLHAQclwwS6ShRKbVwor1PmJBPAJ4lJstG4zDQN1J4tu+Zh2fQz2\/+4BeY="}`;
const getCommentPageUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/getCommentPage';
const getCommentPageData = `{"data":"P5gh0jFgvpAqpI6sOoM\/azNesGjB+fVYwoin\/7Quf2wwgtLKpHw8wlP3xJoe0tJbaLCNaYT1FSYS\/cLCpgbhpZAC4KtIvVVir5Vhm2PdJX8HBEGlVfAYQqwJgRHrnflwzxp9v+gXcGSXZ8\/wpFuqXfWhAA2GMN8ufu6W2P\/Pem4="}`;
const readContentDataCk = `{"data":"lLL4++njitOGWh6+JLoHoUwn\/GoZPIquwZvqX7OhkKvLByAV02DRpLKWY8crCHE4wRtMKOKOaOG23W5PH3JGweW2V6J8IcbLl77udZfd+jD5+IFw0lLHAQclwwS6ShRKbVwor1PmJBPAJ4lJstG4zDQN1J4tu+Zh2fQz2\/+4BeY="}`;

// 发布一次提问
const qaQuestionCreateUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/qa/question/create';
const qaQuestionCreateData = `{"data":"WlKYhvxlUUTRgbVYkwUMDFYnVqiFTrMQjTWNWP5XVg1MK0K2Z0fxiDuO0ayLqB\/EosCvG0geoCHA3SkMtjj65TFJJYgNcS7xOiJEwB63qdqi0auLmq6A7xU1XWDOI8Nc7EYVW+ZqEG3aK8ssjyPlMg+CmDLrm0CtDNXjjcmkFo53GLzwVB4dfp8hSWZbAusT9fK+hw5tG2agrX97eHMymqbW542LbdQEdxIxcoF6KAKS0z0f\/DOhcZk7RROHcoRV2gm6e7qRF5ohPxRg9nm3JTZj3fjrW16JSEdI9dxGNopv\/0yoKI68eegjuDX5Bqzv3LrD\/fj6b9ttEwNfUtOI7A=="}`;

// 使用用车手账
const billItemAddUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bill/item/add';
const billItemAddData = `{"data":"Gufl28SNZs9XpC1kIQv+pNH59+uJb+EcQPOCWAJxdLDKiyjP\/ioKy+q3K1eavxH\/HOr\/+xoyCKOL4p3yCn5Hm7f9czzLlCWtAIYY8AZhOXu9TUrvmUjriiYIY1pYlS+SjJmNkbw9OVEygUNeyA1pe39ldPdLk2vHurf1d\/DYfFSekgV48E62inEaXt3\/atLn9cu5s+IU6sUyJEWggKhodTjp3NfXQF2+8NefadsrVLobrZ1EFsgQCDbCO+pYpfL6fEDZyfkQH7k5pSXjKL1\/qnVOQ4qyNb8gK3Ph0LGoth0sh30szQOxiW8UiNZMYlc5edcbEcQbBaTRbw4ga5nAUg=="}`;

//发布一次回答
const qaAnswerCreateUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/qa/answer/create';
const qaAnswerCreateData = `[{"data":"OKcZYThO43tizDlwZ6Dn80IeD7APAeJHM3hB9uviFwbwqUy1A+OV8GjWt8uk1Xod2pnyMNheFfV4+8qAesRkRANUs+sj70Rl9C4wl5mt9M3cKNb+NYm+tQSSAIDNt5CGu5RpnzVP\/OrCQutspfA948EvQ03d6OxEbCtfhkJ8C+5M9DYGdg+3xM1enUreMU2WTZ8CzdB1eMtTLm1CoDXUCXGHXDMmiKl2QYDdNiUrkCxrFNjsSsbx0nS0eyIRgEQkW4WeZz+vlsMAKff9wxf2MKyyOKGwdLS7i\/2d7A\/iJivYLjbNqn1hAWQMoWYaR+6\/4L\/IWtZtyokhpPJCDPlZ6X4oTRNQe0htsq0VJB3Tl19JqHa8qcnlNuAvgSsKVVK4ZayfLl08hWEJw9g7dfkFsPXhpdamIwO02Bl4xPTIRcalsp+EV613aRc6JC\/YP0y0y+pmChUusBZPFATOtUtlgIlTxF\/Zyvb6oq2EgUPbPswcyrdvjzM5t\/5Arkl5z95IajS5g0Tekig2ERRF19Ijw+I5JPLg5NGGvkOAvEPmYmkvKLBGUDP4GBvdetCxMTJI4frkvWiyPwyu1cIEvUA2lST9nszsCUl2yLwPRj1CbWSUWhfjr\/34mFVCAxUCkYKFbSvkl12h3SPRssQ2GZ8vBpHkSfLoiJQgBjwKmEcyqJMTT8rMOovC9hYOB6MoucN7DPFEAjz2yW7vENUZowTzgmTtvIP1BE7X6T0tly2bQ0Rg5dquj3\/kadqtmrsr7tMwpduAwhWB+FRAhL01OqxGmM08RvrV\/bEVjuOofstFz3taCHtByAkpNYnF5eXwRQ2ddDTzjAz7ZdT6qLTjE3YsGCFkJjyZDlOCNs9WaLICwXjW10ZD3yd2TUCFbFK7LwlUmKMtC3yvTm86DjRi+LnuHpYPq2LIhk\/3+o7keZFXiLSnJvI3foYqMaL31yebc+QeentevdrcMh2KnGMQUshamNhpvDWWEDCXe+0tNFOu\/exq824QsQc+bvjeIQVm3lgCa4LnzmY2P+t0XISESctpCQieIOZhnrFYCaG94Q4yVxAHgI3wa5vsAZU0oN1T07jOkrGt57RNYDGxZI+ffn6MhMkfQ7+VLNfLjzLnQnDqKB7e9Ahu8nhB+yN9WCUSjCIC5hrTkGb\/P\/kvHjZcXDR827idNn4CMGYuHrjp1AVw5f0="},{"data":"mtqzQ4J19Kdwy2LI6XinwuYWT7NT4TrGGYbvqJP69igDbNj\/VpXtI2cSQLxGAF02JdYWin3HE96j7UWUbO+w2EEE7dK7ctsnbb9OyBihTzC1Q2ygpmDKQX41x6xgTP++44tJNUUCUc+SmDM1Jkc7ppm+yV64Vdp31s\/LDj09VG9WBW47asabpF2UaKU\/T4\/sK1gqo3KppvcsX\/vPyPyC0+MpFtHVVR1QbwkT9MTGWZawIDg1V0FcuTXeAFyuCY0lVXglYnZ2uWgq4kI1yCOJSnMYImqX3vUf9RbwDw1QHJ+Zb05bB5u2vwP1CVPx9r7qftZqYa+\/E6oohTGLtheI0pTxUamFGqrrQQ+GcE4Ju+PkYGdUbBPCndGBSrihP4EcS498z3DhgATqEgxIrxCw28UwU7JyMcS\/90Vt4cBR+FFPy2HXxNKVASuFdsFHHrsy4Eqs4e\/6+Qk9MGficE5i\/HOgo09GYYg+mWj1iUj4XDT94s3Bb4eGxRUbOjeX4uNDIOdLAGz0rbTtM1he1VRfW02zO5fSVwV3jJQ1dm\/mP+NAzCW6uXtStQ1Kf\/b0\/TMbls15I27m9RWBZC+IEVkkwKL9nsGof6bWh5acqSztOcBeQA9\/hMZ2+tZN1lOiPOViWgSgLF+wMlAEYQTTyrLtfP2coBwNSBCrQGOsjO31xvuLzQ9Z9LywXbfj1LCgseXyZ7yjS9FhYz9fK3kRBl4ric9zw+Uhc3eY0\/YakwYuYNIGL+pmWCKXizUH+hNxE1TqSaQMOb\/US1t5Q7i3SreMQquLD0iEgDAP5HnNfbzrx947n85TI1bYKVkaHkb5G1pUesPBBlQcFufE6UBa20usYwnzQXFGiptEUObkdj8FeGp5hLTt+7erA0thR1TRg8aqV4HzVFWbq2nVYYHZOOWTuGllEMW+JO9PSxIhbjOiIuCP9PPJlZHjKQPagtz3546Bht8lye1119uzf8cjyYApMSgQNn5F\/iooZJepDFNjO0OMCpX3sf2GeS+Ws0scc4kndutdpxYxSqpgpcvUXUDfS1fLPZqPyHuatWkhxM6wrKTyDZljoauiaEKoAuFVe2dq5ewjxhGnEbbPd6Yx+FgjYQfagF3myugqxjBx1R0Bbsbw1b\/A\/0naw383BFFXRpn8JKtltQZicWeKiVIZE7s4wLBkKkuAQhTBZTnq2xo2ds8="}]`;

// 在线看车
const pdcSubmitUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/pdc/submit';
const pdcSubmitData = `{"data":"QD02J7OzKf2LvteClx+q9sH9XXhdpzxZtW4sxsctG1dCVGDP\/UUvimrbn1kRTaoKUG\/Rw0\/5SEHiB+dFcLKc\/mtaHuImkevPlxjTHGc+O7bWWK6QgMS5bOZ4GniX7tE07D9Y5J8Nh1KMOXuW+NI4IhRf9heC2DcGmQSpcTT08Rw\/L9vKMaVkZ3QQGoddH9VrsTtaDZKuw8yUMshCzbKlpYR5Jb3BCwTJGtdFDZJDJieAN205goxjHTdKQMvfr24HLzScwMBR7MkaIk\/AuC2uPhdjRBYqkOceWamCy9qjBF4M38f+9CB+\/s2aS\/t\/Sn7H9GvH3vmGgfnav+AqD0gbJA=="}`;
const getTicketUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/userInfo/getTicket?data=cOVVqvieA5FUCyefjpEEFxaKXn2qC1HGEX8hKqtR6D/sOlU16gYwCG%2B0u7YLN7pwnsINKyT3DjBw1hdVB0WFYkfYf/DZ4rA%2BaxgbP43kfRlD2PFDUvgnDgYRwOXv6PbUtBHQM0y86Iq%2BSE4H8zy2i5/exRCCXvdSZjRxl/0UTtE%3D'
const zxkcUpdateTaskStatusV3Data = `{"data":"nB2mtIZI4viubupyhomoK\/F8onK7y3dWD911FwORzJWvXNS1kIMOnX+R\/g6aikXTuuEkjo4gBiZabIutA\/3pmhY2Pp\/WBmBCMzif4It67rKBQZEYCnNzB5JAYnTRo68R+LtKkobJJpdX2sk9eQnN7FlIAGZxKUv9dlnDku7P2JI="}`;

// 添加评论
const getContentDetailDataPl = `{"data":"ib00J4kZBfP\/WJGSXMCl1eE65nBi78pmty2EqvJIc\/RSTdXlN+YJO8pzUZp3E4VSn+Wk5tqjwW3\/JDx2WnQpSgADMhzwlpsM4k8zdRNVBNgp9qIzLCKzpCAMGBE3QJPkY7YT+3vcQKChCiNN6I8np2fx0hTefxtlIcLt8g29gIQ="}`;
const getCommentPageDataPl = `{"data":"QVxvAy8NqOlKcD8iaqfBjc4Iag4fE0GVE1\/q5jEM8jbzL0PWOuIGKxEQqPaRC\/1rM+NPXb2NACgnEHz67egejYnIe1mR7w8R3G7QHyxPAlFJbI6NOVm3iOB7o6\/qhVI117S2\/+XuNUwX7StwJeQVRpaGCklCczEC+Zn2eR3s6Co="}`;
const getAgreementsV2Url = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/common/getAgreementsV2';
const getAgreementsV2Data = `{"data":"FRkOtvqLUyvmwaU2jHPYLjrfFKz6ZhZqCH5IEdq33SjONGjHDcMCSndgJS9ED1CLnI4mpgiiSejV23aOpYo6e9TCZ++gByopPfYn577LnfGI0bvcoNtzfUjfpQpH52Dw29OJGZ8qYxwc64iN2aMPcvalOYGwVvsXDw0WKY5uiA8="}`;
const addCommentUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/addComment';
const addCommentData = `{"data":"Aok3vbzXJJFiwiX8CGhBWssB2Vt1482cm116NvE9w7C0n1lV45tABW5q1Nw9KNmoUaIoo4rvhyUGz2M6ETemn2BV6BRCn55bsrw8F7OlYjgWvTwsBTWuEykd4PjBnvWpBWTCHLod\/gKVic76U2QPz+3pt4xt07QGO4UIEZ8Z6ZdwNmHa1LNADqmFeZcEnhCKkD8adZFZPk3nBCLlTxg+LetwRJM\/xQ9MzYdkRhQl1rbhLBEbJ0kUPsQ6HA9nmVetD9HJcnwQ\/r9heD86fswxh+EkZDYDo50+tb+Mc6uWFNuZQ71DBT2fn5OYfg9AnSafd9przyLW+\/xeantz0YLd8w=="}`;

// 浏览会员商城
const llhyscUpdateTaskStatusV3Data = `{"data":"O9Hud+5xuvC4TeL3zIC4ZdY5RC4NuGhiFjmo7IzK\/zPaEe41hXzTelIkip1uH+2hSTw1wHW+14j2FxITg4WoytgkP3GcRfcWcZEUtIwHX+O0U45qcnRGMnEdzSKJThTV2t2RF1X99owPINJ2XJLv37cUbb\/LYhkdWCSSkYa4XH8="}`;

var msg = '';
; (sign = async () => {
    back.log(`🔔 ${cookieName}`)

    // 发布一条动态
    await addContentV2()
    // 获取用户任务列表V3
    await getUserTaskListV3()

    // 浏览此刻页面
    await getContentPageV2()
    await updateTaskStatusV3(getContentPageV2UpdateTaskStatusV3Data,'浏览此刻页面')
    await getContentDetai(getContentDetailData)
    await getCommentPage(getCommentPageData)
    await readContentCK()

    // 发布一次提问
    await qaQuestionCreate()

    // 使用用车手账
    await billItemAdd()

    // 发布一次回答
    await qaAnswerCreate()

    // 在线看车
    await updateTaskStatusV3(zxkcUpdateTaskStatusV3Data,'在线看车')
    await getTicket()

    // 阅读一篇官方贴
    await getContentDetai(getContentDetailDataPl)
    await getCommentPage(getCommentPageDataPl)
    await readContent()
    await updateTaskStatusV3(readContentUpdateTaskStatusV3Data,'阅读一篇官方贴')

    // 添加评论
    await addComment()

    // 浏览会员商城
    await updateTaskStatusV3(llhyscUpdateTaskStatusV3Data,'浏览会员商城')

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
        back.get(url, (error, response, data) => {
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
function readContent() {
    return new Promise((resolve, reject) => {
        const url = { url: readContentUrl, headers: JSON.parse(signheaderVal) }
        url.body = readContentData;
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
  * 浏览此刻页面
  * @returns 
  */
 function getContentPageV2() {
    return new Promise((resolve, reject) => {
        const url = { url: getContentPageV2Url, headers: JSON.parse(signheaderVal) }
        url.body = getContentPageV2Data;
        back.post(url, (error, response, data) => {
            try {
                back.log(`浏览此刻页面-getContentPageV2:` + JSON.parse(data).message)
                msg = msg + `浏览此刻页面-getContentPageV2:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 浏览此刻页面-getContentPageV2 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 浏览此刻页面-getContentPageV2 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}


/**
  * 浏览此刻页面
  * @returns 
  */
function getContentDetai(data) {
    return new Promise((resolve, reject) => {
        const url = { url: getContentDetailUrl, headers: JSON.parse(signheaderVal) }
        url.body = data;
        back.post(url, (error, response, data) => {
            try {
                back.log(`浏览此刻页面-getContentDetai:` + JSON.parse(data).message)
                msg = msg + `浏览此刻页面-getContentDetai:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 浏览此刻页面-getContentDetai - 失败: ${e}`)
                back.log(`❌ ${cookieName} 浏览此刻页面-getContentDetai - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}


/**
  * 浏览此刻页面
  * @returns 
  */
function getCommentPage(data) {
    return new Promise((resolve, reject) => {
        const url = { url: getCommentPageUrl, headers: JSON.parse(signheaderVal) }
        url.body = data;
        back.post(url, (error, response, data) => {
            try {
                back.log(`浏览此刻页面-getCommentPage:` + JSON.parse(data).message)
                msg = msg + `浏览此刻页面-getCommentPage:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 浏览此刻页面-getCommentPage - 失败: ${e}`)
                back.log(`❌ ${cookieName} 浏览此刻页面-getCommentPage - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

/**
 * 浏览此刻页面
 * @returns 
 */
function readContentCK() {
    return new Promise((resolve, reject) => {
        const url = { url: readContentUrl, headers: JSON.parse(signheaderVal) }
        url.body = readContentDataCk;
        back.post(url, (error, response, data) => {
            try {
                back.log(`浏览此刻页面:` + JSON.parse(data).message)
                msg = msg + `浏览此刻页面:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 浏览此刻页面 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 浏览此刻页面 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

/**
 * updateTaskStatusV3
 * @returns 
 */
function updateTaskStatusV3(data,task) {
    return new Promise((resolve, reject) => {
        const url = { url: updateTaskStatusV3Url, headers: JSON.parse(signheaderVal) }
        url.body = data;
        back.post(url, (error, response, data) => {
            try {
                back.log(task + `updateTaskStatusV3:` + JSON.parse(data).message)
                msg = msg + task + `updateTaskStatusV3:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} ${task} - updateTaskStatusV3 - 失败: ${e}`)
                back.log(`❌ ${cookieName} ${task} - updateTaskStatusV3 - response: ${JSON.stringify(response)}`)
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
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        if(dd % 2 == 0){
            url.body = qaAnswerCreateData[1];
        }else{
            url.body = qaAnswerCreateData[0];
        }
        back.log(`发布一次回答: body` + url.body)
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
        back.get(url, (error, response, data) => {
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
function getAgreementsV2() {
    return new Promise((resolve, reject) => {
        const url = { url: getAgreementsV2Url, headers: JSON.parse(signheaderVal) }
        url.body = getAgreementsV2Data;
        back.post(url, (error, response, data) => {
            try {
                back.log(`添加评论-getAgreementsV2:` + JSON.parse(data).message)
                msg = msg + `添加评论-getAgreementsV2:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 添加评论-getAgreementsV2 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 添加评论-getAgreementsV2 - response: ${JSON.stringify(response)}`)
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



