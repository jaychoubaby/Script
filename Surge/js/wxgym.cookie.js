const cookieName = 'wxgym_cookie'
const authKey = 'wxgym_auth_key'
const headerKey = 'wxgym_header_key'
const bodyKey = 'wxgym_body_key'
const urlKey = 'wxgym_url_key'
const back = init()

if ($request && $request.method != 'OPTIONS') {
  const urlVal = $request.url
  const headerVal = JSON.stringify($request.headers)
  const bodyVal = JSON.stringify($request.body)
  const authVal = $request.headers['Authorization'] || $request.headers['authorization']
  
  if (urlVal) back.setdata(urlVal, urlKey)
  if (headerVal) back.setdata(headerVal, headerKey)
  if (authVal) back.setdata(authVal, authKey)
  if (bodyVal) back.setdata(bodyVal, bodyKey)
  
  back.msg(cookieName, `获取Cookie: 成功`, `已保存授权信息`)
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
back.done()
