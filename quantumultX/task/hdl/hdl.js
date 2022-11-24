const cookieName = '海底捞'
const signurlKey = 'back_signurl_hdl'
const signheaderKey = 'back_signheader_hdl'
const back = init()
const signurlVal = back.getdata(signurlKey)
const signheaderVal = back.getdata(signheaderKey)

/**
 * [task_local]
 * 
 * 0 6 9 * * * https://raw.githubusercontent.com/jaychoubaby/Script/main/qxjs/hdl/hdl.js, tag=海底捞签到, enabled=true
 */


sign()  //签到


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
      queryFragment()
    }catch(error){
      back.log(error)
      back.done()
    }
  })
}

function queryFragment() {
  back.log('signheaderVal:' + JSON.stringify(signheaderVal))
  const url = { url: `https://superapp-public.kiwa-tech.com/activity/wxapp/signin/queryFragment`, headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  back.post(url, (error, response, data) => {
    back.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    const result = JSON.parse(data)
    if (result.success) {
      detail += `碎片总数:${result.data.total}`+`\n`
      detail += `今日签到时间:${result.data.today}`+`\n`
      detail += `碎片过期时间:${result.data.expireDate}`+`\n`
    } else {
      detail = `🎉查询碎片结果: ${result.msg}`
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



