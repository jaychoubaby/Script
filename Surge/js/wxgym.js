const cookieName = 'wxgym'
const headerKey = 'wxgym_header_key'
const bodyKey = 'wxgym_body_key'
const back = init()
const headerVal = back.getdata(headerKey)
const bodyVal = back.getdata(bodyKey)

// 预订参数（仅用于日志和结果显示）
const bookDate = formatDate(new Date())
const title = `${cookieName}`
let subTitle = ''
let detail = ''

bookVenue() // 执行预订

// 格式化日期为 YYYY-MM-DD 格式
function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function bookVenue() {
  // 直接使用存储的 headerVal 和 bodyVal
  try {
    const headers = JSON.parse(headerVal)
    const body = bodyVal // 保持 bodyVal 的原始格式
    
    const url = { 
      url: `https://wxgym.whsu.edu.cn/prod-api/system/order/create`, 
      headers: headers,
      body: body
    }
    
    back.log(`${cookieName}, 开始预订场地...`)
    back.log(`url:${url.url}`)
    back.log(`headers:${JSON.stringify(headers)}`)
    back.log(`body:${body}`)
    
    back.post(url, (error, response, data) => {
      try {
        back.log(`${cookieName}, 预订结果: ${data}`)
        const result = JSON.parse(data)
        if (result.code == 200) {
          subTitle = `预订结果: 🎉预订成功`
          
          // 尝试从返回的数据中提取预订信息
          const bodyObj = JSON.parse(body)
          detail = `预订日期: ${bodyObj?.orderBusiness?.reserveDate || bookDate}\n`
          
          // 提取场地名称和时间
          let siteName = "场地"
          let timeSlots = []
          if (bodyObj?.siteReserveList && bodyObj.siteReserveList.length > 0) {
            siteName = bodyObj.siteReserveList[0]?.siteName || "场地"
            timeSlots = bodyObj.siteReserveList.map(slot => {
              const startTime = slot.startTime?.split(' ')[1]?.substring(0, 5) || ''
              const endTime = slot.endTime?.split(' ')[1]?.substring(0, 5) || ''
              return `${startTime}-${endTime}`
            })
          }
          
          detail += `预订场地: ${siteName}\n`
          detail += `预订时间: ${timeSlots.join(', ')}\n`
          detail += `支付金额: ¥${bodyObj?.orderAmount || ''}\n`
          
          if (result.data && result.data.id) {
            detail += `订单号: ${result.data.id}\n`
          }
        } else {
          subTitle = `预订结果: ⚠️${result.msg || '预订失败'}`
        }
        
        back.msg(title, subTitle, detail)
        back.done()
      } catch(error) {
        back.log(`${cookieName}, 预订异常: ${error}`)
        subTitle = `预订结果: ⚠️发生错误`
        detail = `错误信息: ${error}`
        back.msg(title, subTitle, detail)
        back.done()
      }
    })
  } catch (error) {
    back.log(`${cookieName}, 参数解析错误: ${error}`)
    subTitle = `预订结果: ⚠️参数错误`
    detail = `错误信息: ${error}\n请检查headerKey和bodyKey的值是否正确`
    back.msg(title, subTitle, detail)
    back.done()
  }
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
