const cookieName = '周大福'
const signurlKey = 'back_signurl_ctf'
const signheaderKey = 'back_signheader_ctf'
const back = init()
const signurlVal = back.getdata(signurlKey)
const signheaderVal = back.getdata(signheaderKey)


sign()  //签到


let detail = ''
let subTitle = ''

function sign() {

  let h = JSON.parse(signheaderVal)
  var key = "Content-Type";
  var value = "application/json"
  h[key] = value;
  back.log(JSON.stringify(h))

  const url = { url: `https://api-miniprogram-cn.krewards.com/api/v1/miniprogram/member/sign`, headers: h }
  url.body = `{"channel":"Wechat Mini Program"}`;

  back.post(url, (error, response, data) => {
    try{
      back.log(`${cookieName}, data: ${data}`)
      const title = `${cookieName}`
      const result = JSON.parse(data)
      if (result.code == 0) {
        const points = result.data[0][1];
        subTitle = `签到结果: 🎉签到成功,获得${points}积分` +`\n`
      } else {
        subTitle = `签到结果: ⚠️${result.message}`
      } 
      back.msg(title, subTitle, detail)
      back.done()
    }catch(error){
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



