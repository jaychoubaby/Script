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

addComment() //评论




let detail = ''
let subTitle = ''

function addComment(){
    let h = JSON.parse(signheaderVal)
    const url = { url: `https://app.sgmlink.com:443/service/ibuick/rest/api/private/bbs/addComment`, headers: h }
    url.body = `{"data":"Rf\/Mvqc0XJdZnGqd4rjyPN6wRAEz8Z9fIxEkkhAEbCl1lxJpaynQxFT+y5ks2Vm4CZmcFF3Y3ys24u9KW+cN1KmIhaJULwNj8y9Zc+ySMjDbWUFEDsdWSDBV50JyDf9W1zlmFkanQGMujnIFET+ea0uvRJ5BMkZauQ5xUu8AC0A="}`;
    back.post(url, (error, response, data) => {
        try{
          back.log(`${cookieName}, data: ${data}`)
          const title = `${cookieName}`
          const result = JSON.parse(data)
          if (result.resultCode == "0000") {
            subTitle = `评论结果: 🎉评论成功` +`\n`
          } else {
            subTitle = `评论结果: ⚠️${result.message}`
          } 
          // 等待5秒
          setTimeout( function(){


            }, 5 * 1000 );
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



