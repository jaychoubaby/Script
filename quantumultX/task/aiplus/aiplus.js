const cookieName = 'aiplus'
const signurlKey = 'back_signurl_aiplus'
const signheaderKey = 'back_signheader_aiplus'
const back = init()
const signurlVal = back.getdata(signurlKey)
const signheaderVal = back.getdata(signheaderKey)

/**
 * [task_local]
 * 
 * 0 11 9 * * * https://raw.githubusercontent.com/jaychoubaby/Script/main/qxjs/aiplus/aiplus.js, tag=aiplus签到, enabled=true
 */


sign()  //签到


let detail = ''
let subTitle = ''

function sign() {
  const url = { url: `https://gpt-api-2.it007996.top/chatapi/marketing/signin`, headers:  JSON.parse(signheaderVal)}
  url.body = `{}`;
  back.post(url, (error, response, data) => {
    try{
      const rData = JSON.parse(data)
      if (rData.code == 200) {
        subTitle = `签到结果: 🎉签到成功` +`\n`
      } else {
        subTitle = `签到结果: ⚠️${rData.message}`
      } 
      // 查询
      memberInfo()
    }catch(error){
      back.log(error)
      back.done()
    }
  })
}

function signinpage(){
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    const url = { url: `https://gpt-api-2.it007996.top/chatapi/marketing/signinpage?StartTime=${yyyy}-${mm}`, headers: JSON.parse(signheaderVal) }
    back.get(url, (error, response, data) => {
        const rData = JSON.parse(data)
        if (rData.code == 200) {
            let array = rData.result;
            let count = 0;
            for (let i = 0; i < array.length; i++) {
                if (array[i].isSignIn) {
                    count++;
                }
            }
            detail += `${mm}已签到天数:${count}`+`\n`
        } else {
          detail = `🎉查询签到天数结果: ${rData.message}`
        } 
      })

}

function memberInfo() {
  const url = { url: `https://gpt-api-2.it007996.top/chatapi/auth/memberInfo`, headers: JSON.parse(signheaderVal) }
  back.get(url, (error, response, data) => {
    const title = `${cookieName}`
    const rData = JSON.parse(data)
    if (rData.code == 200) {
      detail += `对话总量:${rData.result.wallets[0].totalValue}`+`\n`
      detail += `对话剩余:${rData.result.wallets[0].availableValue}`+`\n`
      detail += `绘画总量:${rData.result.wallets[1].totalValue}`+`\n`
      detail += `绘画剩余:${rData.result.wallets[1].availableValue}`+`\n`
    } else {
      detail = `🎉查询结果: ${rData.message}`
    } 
    // 签到天数
    // signinpage();
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



