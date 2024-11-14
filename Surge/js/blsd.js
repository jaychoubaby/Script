const cookieName = '保利时代'
const signurlKey = 'back_signurl_blsd'
const signheaderKey = 'back_signheader_blsd'
const back = init()
const signurlVal = back.getdata(signurlKey)
const signheaderVal = back.getdata(signheaderKey)


sign()  //签到


function sign() {

  let h = JSON.parse(signheaderVal)
  var key = "Content-Type";
  var value = "application/json"
  h[key] = value;
  back.log(JSON.stringify(h))

  const url = { url: `https://a.zhimatech.com/restful/mall/3541/checkInRecord`, headers: h }
  url.body = `{"latitude":30.490946735418856,"longitude":114.41029969940566}`;
  back.post(url, (error, response, data) => {
    back.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data)
    if (result.code == 200) {
      subTitle = `签到结果: 🎉签到成功`
      detail += `日常签到积分:${result.data.point}`+`\n`
      detail += `连续签到奖励:${result.data.extra}`+`\n`
      detail += `到店签到积分:${result.data.to_shop_extra}`+`\n`
      detail += `周末奖励积分:${result.data.weekend_extra}`+`\n`
      detail += `今日获取积分:${result.data.point_total}`+`\n`
    } else {
      subTitle = `签到结果: ⚠️${result.msg}`
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
