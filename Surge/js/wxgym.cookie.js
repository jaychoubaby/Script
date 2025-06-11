const cookieName = '武汉体育学院健身房'
const authKey = 'wxgym_auth_key'
const headerKey = 'wxgym_header_key'
const urlKey = 'wxgym_url_key'
const wxgym = init()

if ($request && $request.method != 'OPTIONS') {
  const urlVal = $request.url
  const headerVal = JSON.stringify($request.headers)
  const authVal = $request.headers['Authorization'] || $request.headers['authorization']
  
  if (urlVal) wxgym.setdata(urlVal, urlKey)
  if (headerVal) wxgym.setdata(headerVal, headerKey)
  if (authVal) wxgym.setdata(authVal, authKey)
  
  wxgym.msg(cookieName, `获取Cookie: 成功`, `已保存授权信息`)
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
wxgym.done()