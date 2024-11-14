const cookieName = '光谷天地'
const signurlKey = 'back_signurl_ggtd'
const signheaderKey = 'back_signheader_ggtd'
const back = init()
const signurlVal = back.getdata(signurlKey)
const signheaderVal = back.getdata(signheaderKey)


sign()  //签到
const title = `${cookieName}`
let subTitle = ''
let detail = ''


function sign() {
  let h = JSON.parse(signheaderVal)
  var key = "Content-Type";
  var value = "application/json"
  h[key] = value;
  back.log(JSON.stringify(h))
  const url = { url: `https://a.zhimatech.com/restful/mall/3704/checkInRecord`, headers: h }
  url.body = `{"latitude":30.460142936671787,"longitude":114.38339108709094}`;
  back.post(url, (error, response, data) => {
    try{
      back.log(`${cookieName},sign data: ${data}`)
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

      // 到店签到
      // setTimeout(function(){
      //   toShopSign(url)
      // },5000)

      back.msg(title, subTitle, detail)
      back.done()
    }catch(error){
      back.log(error)
      back.done()
    }
  })
}

function toShopSign(url) {
  back.post(url, (error, response, data) => {
    back.log(`${cookieName},toShopSign data: ${data}`)
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
