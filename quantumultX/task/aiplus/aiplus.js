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


memberInfo()  //签到


let detail = ''
let subTitle = ''

function sign() {

  let h = JSON.parse(signheaderVal)
  var key = "Content-Type";
  var value = "application/json"
  h[key] = value;
  back.log(JSON.stringify(h))

  const url = { url: `https://superapp-public.kiwa-tech.com/activity/wxapp/signin/signin`, headers: h }
  url.body = `{"signinSource":"MiniApp"}`;

  back.post(url, (error, response, data) => {
    try{
      back.log(`${cookieName}, data: ${data}`)
      const title = `${cookieName}`
      const result = JSON.parse(data)
      if (result.success) {
        subTitle = `签到结果: 🎉签到成功` +`\n`
      } else {
        subTitle = `签到结果: ⚠️${result.msg}`
      } 
      // 查询
      memberInfo()
    }catch(error){
      back.log(error)
      back.done()
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
      detail += `绘画总量:${rData.result.wallets[0].totalValue}`+`\n`
      detail += `绘画剩余:${rData.result.wallets[0].availableValue}`+`\n`
    } else {
      detail = `🎉查询结果: ${rData.type}`
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



