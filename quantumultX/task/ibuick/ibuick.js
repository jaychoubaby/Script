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
const getLaunchV2Url = 'https://app.sgmlink.com:443/service/ibuick/rest/api/public/ad/getLaunchV2?data=w5nybyKUvs8/UNwOUiCiaA%3D%3D';
const qaAnswerCreateUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/qa/answer/create';
const qaAnswerCreateData = `{"data":"UAEgHCvvBNrqUBbfZodj9aBE2OrkBltZZz3bpnrEfrpBbWD772iWs6zvBF75gOAllWLcQALe9ga23fA2B\/jqEOOlhDJGb8LQTfx8onaIX70NDVw4UiiVpWzjbHfnnggfsZZJQVLeRUbQ9ulVWKOF+d7nHuRJkiVgdRvgjcl\/uDUVP9WlR1ljTkHU1af1jop\/knaFKZtrXUa4XdhMxokM7tQ16K\/bic5y10wauci6aegzq29f29W5dNzi24AG1T\/q3H9d\/BsgtBCMOSTulwI8Jnwpt3T\/GNHq4NcibyLeIaWJd1L6zBiBx7jLAxTZf5pOMwb\/IEFiFxBgtOBT4d7eOlxdQI3aqVdtoMNqlDJlYMJlT9PsnEPzM4fPQhVMPiAIralM6YVWKjWx9wCKeQxwadByZ4cS5Q5EMdeD5R\/foGCYWJeycBp3aL\/mpFfKV+5+sj5gU5YdcKUcEkOmGAYRPM4w+4Nw8bd1HpGMJb2YywyVHFtfuNQ2F5sZqbxevQBAiuzXapkJ7BORmpJK69+BqIP0lneIzon9hkTqyjmU3+2utkDi9M3SSYxK1BDXznGdvX90tr3Jh9KMEHFzPkm5xa05i36I3rns\/jb1ybPlMUIGjOIrF8dpyRTBtZYYsjD+wjgC6iT0zO3iChsNwxsDgk0oX3OjQM+zRnMi3Uw\/OtJ\/HKXz35F0i56Cm\/dqAgvdfXm5cqGflRYmzYz8\/Vmvn2Ut8vRg4UQGG7PCh1RZlPMTPSMQfMcG4ftZbDe8I74ADn+NtF1FpDyHXZZ8NNE4vbPgDnVpTq5v4JLz6INecoIcGEtJV1xIvHvBexdnb\/uPSKiB\/t\/kAzpYU4kaoWp1zRUoTuvH0OaQtn2Ad7pvIYAmRGnnFQt6MR3LPIIwCgBHkHw1vkJiyuLa8cJovayWU1rOufQMBxzRiiLxs0w8ou0nh3XOc43GRnsDUYBUHhY1GzhY7lZV8ZuuepiWvCksMjWFGcAojBEi29xzfSkkpAeSDifmITthkpUdPypCaiOM"}`;
const getWorkstationLiveUrls = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/vehicleMaintenance/getWorkstationLiveUrl';
const getWorkstationLiveUrlData = `{"data":"En2qHuWqzbqxKI2XAFIfyYYjO9cCXwISC58tqj9xZpWB7u8G2QXpCSUciXVjql\/6dtNkNyqCx3WpwTICBLu3EhzskhxGdlQwPdZpruyOSjbhuOzfCHyCpolhAI+khty5dxKcug8jefswOWIMt8B+Ee5PHdYaRnYWKuZ1hMF99F0="}`;

// 进行一次点赞
const praiseContentUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/praiseContent';
const praiseContentData = `{"data":"E9hvq7XdfMYp+x5HECvGhkkkMyYjGiVmC7TzZ2bz6DQEmbb8ve4STXnLpNdPaCdUumtzqtU2hO65qMOSnfn5YrUG7Y0hrY\/6\/6OGK1vYkfQVt9xgdKwQOYhGs6FHYEcbFob5R3sf1aO0Y8J6XL\/w+EP3f2kTyrqRYif4JTuuVqQ="}`;
const cancelPraiseContentUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/cancelPraiseContent';
const cancelPraiseContentData = `{"data":"E9hvq7XdfMYp+x5HECvGhkkkMyYjGiVmC7TzZ2bz6DQEmbb8ve4STXnLpNdPaCdUumtzqtU2hO65qMOSnfn5YrUG7Y0hrY\/6\/6OGK1vYkfQVt9xgdKwQOYhGs6FHYEcbFob5R3sf1aO0Y8J6XL\/w+EP3f2kTyrqRYif4JTuuVqQ="}`;

// 在线看车
const pdcSubmitUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/pdc/submit';
const pdcSubmitData = `{"data":"QD02J7OzKf2LvteClx+q9sH9XXhdpzxZtW4sxsctG1dCVGDP\/UUvimrbn1kRTaoKUG\/Rw0\/5SEHiB+dFcLKc\/mtaHuImkevPlxjTHGc+O7bWWK6QgMS5bOZ4GniX7tE07D9Y5J8Nh1KMOXuW+NI4IhRf9heC2DcGmQSpcTT08Rw\/L9vKMaVkZ3QQGoddH9VrsTtaDZKuw8yUMshCzbKlpYR5Jb3BCwTJGtdFDZJDJieAN205goxjHTdKQMvfr24HLzScwMBR7MkaIk\/AuC2uPhdjRBYqkOceWamCy9qjBF4M38f+9CB+\/s2aS\/t\/Sn7H9GvH3vmGgfnav+AqD0gbJA=="}`;
const getTicketUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/userInfo/getTicket?data=cOVVqvieA5FUCyefjpEEFxaKXn2qC1HGEX8hKqtR6D/sOlU16gYwCG%2B0u7YLN7pwnsINKyT3DjBw1hdVB0WFYkfYf/DZ4rA%2BaxgbP43kfRlD2PFDUvgnDgYRwOXv6PbUtBHQM0y86Iq%2BSE4H8zy2i5/exRCCXvdSZjRxl/0UTtE%3D'
const zxkcUpdateTaskStatusV3Data = `{"data":"nB2mtIZI4viubupyhomoK\/F8onK7y3dWD911FwORzJWvXNS1kIMOnX+R\/g6aikXTuuEkjo4gBiZabIutA\/3pmhY2Pp\/WBmBCMzif4It67rKBQZEYCnNzB5JAYnTRo68R+LtKkobJJpdX2sk9eQnN7FlIAGZxKUv9dlnDku7P2JI="}`;

// 添加评论
const getContentDetailDataPl = `{"data":"GDfIEAY06xRDFhgUJQSkka2pcFIGVe6dEf7KwLx8GGsQYhbFJE\/GseO0L1pHTN2pj64pQx8I41mGlJLFFFBGJkBFXxqLOTn\/Gw3f76vvsZnkQBnHAdpIZJNxiU4AuRvAsYUAHokTzP1xcsOyN0+JyFch+VCdKuxG7vFZ6pr70cE="}`;
const getCommentPageDataPl = `{"data":"nhbdzZBdmLKunDMN7ULYebLCgMIhZ+9jbuBet+eLCZUN47QBrG3Xr9ZZwM6kk3qXOslpZxzRpsSfRrY\/5mgy\/LtWNJZ\/P74WFoQPj9IZkS6jUR9msQZ5000QGfSaQoNBk5rT+nrWhQaqXbVlv8GRRWCyAJ7FOrSMLNsk7CvdFJo="}`;
const getIconLayoutListUrl = 'https://app.sgmlink.com/service/ibuick/rest/api/public/appConfig/h5/getIconLayoutList';
const getIconLayoutListData = `{"version":"10.9.2"}`;
const readContentPl = `{"data":"GDfIEAY06xRDFhgUJQSkka2pcFIGVe6dEf7KwLx8GGsQYhbFJE\/GseO0L1pHTN2pj64pQx8I41mGlJLFFFBGJkBFXxqLOTn\/Gw3f76vvsZnkQBnHAdpIZJNxiU4AuRvAsYUAHokTzP1xcsOyN0+JyFch+VCdKuxG7vFZ6pr70cE="}`;
const getAgreementsV2Url = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/common/getAgreementsV2';
const getAgreementsV2Data = `{"data":"FRkOtvqLUyvmwaU2jHPYLjrfFKz6ZhZqCH5IEdq33SjONGjHDcMCSndgJS9ED1CLnI4mpgiiSejV23aOpYo6e9TCZ++gByopPfYn577LnfGI0bvcoNtzfUjfpQpH52Dw29OJGZ8qYxwc64iN2aMPcvalOYGwVvsXDw0WKY5uiA8="}`;
const addCommentUrl = 'https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/addComment';
const addCommentData = `{"data":"eGt8QOdAy6LqdWzWsgkyYT8vTQTuUavo4\/5hDXVh85699Wiyo5Mwi9LpBqPP5YPjnxQXLZcOoHaVarwORd1KrKU2tiIc4dfSAfK8V\/fxTBfZ7XtAADhjw603pLeZ8NH9GNW0Pj4UIq8t2fmqwd7Yb70lGbCQmF4689NhaOXfdquO7ZV5pgxTWc1L7\/RujJX+PJGH4DEpzgGYNDNidTsHMMd8Bs7olIwPZWRh18IcxUXMqSjpScsejYZpCQp4ytd+7e1XFLfM9ZPYqznP6ripSD4a4neMeGd9YO7voZhRDhOfTh0j4uLvdMQBc0+WYx\/qacrtC3YOtYUUvk4FXwoy8A=="}`;

// 浏览会员商城
const llhyscUpdateTaskStatusV3Data = `{"data":"O9Hud+5xuvC4TeL3zIC4ZdY5RC4NuGhiFjmo7IzK\/zPaEe41hXzTelIkip1uH+2hSTw1wHW+14j2FxITg4WoytgkP3GcRfcWcZEUtIwHX+O0U45qcnRGMnEdzSKJThTV2t2RF1X99owPINJ2XJLv37cUbb\/LYhkdWCSSkYa4XH8="}`;

// 分享一篇官方贴
const fxypgftUpdateTaskStatusV3Data = `{"data":"C9qHDAjAlVgXBf1KOk1qP3F02c\/x9XN7Rps\/9o1ueFrOXwP5EjC7GvdtHN7CD2J+N2kkkjCkTJrwzGiTIr8ZZ7QMTr+iru8fplxVT+XOyusSxRTyaqcWhurh+gI\/2zZWcEufe15AZycUtInqIck4GoBfar7Bzuy7MSVzTGd72Us="}`;

// 浏览同城页面
const lltcymUpdateTaskStatusV3Data = `{"data":"Rs\/a2v4SPBfnI0i\/ZyUw\/r34oORtMFkSgkGeeo5FVIOnJzdf3bH7KG3Dy\/94JEap4povkJ1naj3zg\/qeONOymyCdQagAWqFbwkEUcVhnq2t3Ncsfn2wUinCn\/+8bY4Ek0V7qeY95AJSqSF3cURKuluehgJV+xd6q7FJrDNzRbH0="}`;

// 浏览圈子页面
const llqzymUpdateTaskStatusV3Data = `{"data":"O2CxGv2Xj2ARINoF7XDoPT87cbTH5oabegRUPPtGw1qvleJpbt73vTY9Rsc1SD2Hb28p0L\/zqygP9BMFADyYQUlQbDo3ONovB1nysv+fbLBvW01wWNOLICKY47yge9lRRQbnBehWq5IdQp947RCSIFoncTMVq33Ox580f9hN8eQ="}`;

// 浏览足迹页面
const llzjymUpdateTaskStatusV3Data = `{"data":"Zm5RdMnZlWn1uTtZv4x0rpkrKtAFlsHDw6JFXefWJNJbBYvU2tvmLhfgFHJ9nQqNnlqE0lPYagqCo3PVrM7Ot19v1Epbem+rsjdoEjTrBSu1bdaDJqdixWAfMUX9RC6VpA+ESgJZHTkgELFmfXLYWgv7P2X42W3uSK1bZl13z\/U="}`;

var msg = '';
; (sign = async () => {
    back.log(`🔔 ${cookieName}`)

    // 发布一条动态
    await addContentV2()
    await delay(3000);

    // 发布一次提问
    await qaQuestionCreate()
    await delay(3000);

    // 进行一次点赞
    await praiseContent()
    await delay(3000);

    // 取消点赞
    await cancelPraiseContent()
    await delay(3000);

    // 发布一次回答
    // await getLaunchV2()
    // await getAgreementsV2()
    await qaAnswerCreate()
    // await getWorkstationLiveUrl()
    await delay(3000);

    // 使用用车手账
    await billItemAdd()
    await delay(3000);

    // 添加评论
    // await getContentDetail(getContentDetailDataPl)
    // await getCommentPage(getCommentPageDataPl)
    // await getIconLayoutList()
    // await readContent(readContentPl)
    await addComment()
    await delay(3000);

    // 获取用户任务列表V3
    // await getUserTaskListV3()
    // await delay(3000);

    // 浏览此刻页面
    // await getContentPageV2()
    await updateTaskStatusV3(getContentPageV2UpdateTaskStatusV3Data,'浏览此刻页面')
    // await getContentDetail(getContentDetailData)
    // await getCommentPage(getCommentPageData)
    // await readContentCK(readContentDataCk)
    await delay(3000);

    // 在线看车
    await updateTaskStatusV3(zxkcUpdateTaskStatusV3Data,'在线看车')
    // await getTicket()
    await delay(3000);

    // 阅读一篇官方贴
    // await getContentDetail(getContentDetailDataPl)
    // await getCommentPage(getCommentPageDataPl)
    // await readContent(readContentData)
    await updateTaskStatusV3(readContentUpdateTaskStatusV3Data,'阅读一篇官方贴')
    await delay(3000);

    // 浏览会员商城
    await updateTaskStatusV3(llhyscUpdateTaskStatusV3Data,'浏览会员商城')
    await delay(3000);

    // 分享一篇官方贴
    await updateTaskStatusV3(fxypgftUpdateTaskStatusV3Data,'分享一篇官方贴')
    await delay(3000);

    // 浏览同城页面
    await updateTaskStatusV3(lltcymUpdateTaskStatusV3Data,'浏览同城页面')
    await delay(3000);

    // 浏览圈子页面
    await updateTaskStatusV3(llqzymUpdateTaskStatusV3Data,'浏览圈子页面')
    await delay(3000);

    // 浏览足迹页面
    await updateTaskStatusV3(llzjymUpdateTaskStatusV3Data,'浏览足迹页面')


    back.msg(cookieName, "签到成功", msg)
})()
    .catch((e) => back.log(`❌ ${cookieName} 签到失败: ${e}`))
    .finally(() => back.done())



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 发布一条动态
 * @returns 
 */
async function addContentV2() {
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
async function getUserTaskListV3() {
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
async function readContent(data) {
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
  * 浏览此刻页面
  * @returns 
  */
async function getContentPageV2() {
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
async function getContentDetail(data) {
    return new Promise((resolve, reject) => {
        const url = { url: getContentDetailUrl, headers: JSON.parse(signheaderVal) }
        url.body = data;
        back.post(url, (error, response, data) => {
            try {
                back.log(`浏览此刻页面-getContentDetail:` + JSON.parse(data).message)
                msg = msg + `浏览此刻页面-getContentDetail:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 浏览此刻页面-getContentDetail - 失败: ${e}`)
                back.log(`❌ ${cookieName} 浏览此刻页面-getContentDetail - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}


/**
  * 浏览此刻页面
  * @returns 
  */
async function getCommentPage(data) {
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
async function readContentCK() {
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
async function updateTaskStatusV3(data,task) {
    return new Promise((resolve, reject) => {
        const url = { url: updateTaskStatusV3Url, headers: JSON.parse(signheaderVal) }
        url.body = data;
        back.post(url, (error, response, data) => {
            try {
                back.log(task + `:` + JSON.parse(data).message)
                msg = msg + task + `:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} ${task} - 失败: ${e}`)
                back.log(`❌ ${cookieName} ${task} - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

/**
 * 发布一次提问
 * @returns 
 */
async function qaQuestionCreate() {
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
 * 进行一次点赞
 * @returns 
 */
async function praiseContent() {
    return new Promise((resolve, reject) => {
        const url = { url: praiseContentUrl, headers: JSON.parse(signheaderVal) }
        url.body = praiseContentData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`进行一次点赞:` + JSON.parse(data).message)
                msg = msg + `进行一次点赞:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 进行一次点赞 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 进行一次点赞 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

/**
 * 进行一次点赞 - 取消点赞
 * @returns 
 */
async function cancelPraiseContent() {
    return new Promise((resolve, reject) => {
        const url = { url: cancelPraiseContentUrl, headers: JSON.parse(signheaderVal) }
        url.body = cancelPraiseContentData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`取消点赞:` + JSON.parse(data).message)
                msg = msg + `取消点赞:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 取消点赞 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 取消点赞 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}


/**
 * 使用用车手账
 * @returns 
 */
async function billItemAdd() {
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
async function qaAnswerCreate() {
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
 * 发布一次回答
 * @returns 
 */
async function getLaunchV2() {
    return new Promise((resolve, reject) => {
        const url = { url: getLaunchV2Url, headers: JSON.parse(signheaderVal) }
        back.get(url, (error, response, data) => {
            try {
                back.log(`发布一次回答 - getLaunchV2:` + JSON.parse(data).message)
                msg = msg + `发布一次回答 - getLaunchV2:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 发布一次回答 - getLaunchV2 - 失败: ${e}`)
                back.log(`❌ ${cookieName} 发布一次回答 - getLaunchV2 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}


/**
 * 发布一次回答
 * @returns 
 */
async function getWorkstationLiveUrl() {
    return new Promise((resolve, reject) => {
        const url = { url: getWorkstationLiveUrls, headers: JSON.parse(signheaderVal) }
        url.body = getWorkstationLiveUrlData; 
        back.post(url, (error, response, data) => {
            try {
                back.log(`发布一次回答 - getWorkstationLiveUrl:` + JSON.parse(data).message)
                msg = msg + `发布一次回答 - getWorkstationLiveUrl:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 发布一次回答 - getWorkstationLiveUrl - 失败: ${e}`)
                back.log(`❌ ${cookieName} 发布一次回答 - getWorkstationLiveUrl - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}

 /**
 * 在线看车
 * @returns 
 */
async function pdcSubmit() {
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
async function getTicket() {
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
 * getAgreementsV2
 * @returns 
 */
async function getAgreementsV2() {
    return new Promise((resolve, reject) => {
        const url = { url: getAgreementsV2Url, headers: JSON.parse(signheaderVal) }
        url.body = getAgreementsV2Data;
        back.post(url, (error, response, data) => {
            try {
                back.log(`getAgreementsV2:` + JSON.parse(data).message)
                msg = msg + `getAgreementsV2:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} getAgreementsV2 - 失败: ${e}`)
                back.log(`❌ ${cookieName} getAgreementsV2 - response: ${JSON.stringify(response)}`)
                resolve()
            }
        })
    })
}



/**
 * 添加评论
 * @returns 
 */
async function addComment() {
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

getIconLayoutList
/**
 * 添加评论
 * @returns 
 */
async function getIconLayoutList() {
    return new Promise((resolve, reject) => {
        const url = { url: getIconLayoutListUrl, headers: JSON.parse(signheaderVal) }
        url.body = getIconLayoutListData;
        back.post(url, (error, response, data) => {
            try {
                back.log(`添加评论 - getIconLayoutList:` + JSON.parse(data).message)
                msg = msg + `添加评论 - getIconLayoutList:` + JSON.parse(data).message + `\n`;
                resolve()
            } catch (e) {
                back.log(`❌ ${cookieName} 添加评论 - getIconLayoutList - 失败: ${e}`)
                back.log(`❌ ${cookieName} 添加评论 - getIconLayoutList - response: ${JSON.stringify(response)}`)
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



