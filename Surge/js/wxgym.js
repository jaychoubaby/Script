const cookieName = '武汉体育场馆预订'
const authKey = 'wxgym_auth_key'
const back = init()
const authVal = back.getdata(authKey)

// 预订参数
const stadiumsId = 'f6f54d53f4c84a09addae1221ebe6313'
const projectId = '6281b4301fd84f72a9e00e24990532d6'
const siteId = 'c807975ffb7740a7aad42010ec95d788' // 湖3号场地
const price = 30 // 每半小时价格
const bookDate = formatDate(new Date()) // 默认预订今天，可以修改为明天或其他日期

// 预订时间段（可根据需要修改）
const timeSlots = [
  { start: '19:00:00', end: '19:30:00', index: 2 },
  { start: '19:30:00', end: '20:00:00', index: 3 },
  { start: '20:00:00', end: '20:30:00', index: 4 },
  { start: '20:30:00', end: '21:00:00', index: 5 },
]

bookVenue() // 执行预订
const title = `${cookieName}`
let subTitle = ''
let detail = ''

// 格式化日期为 YYYY-MM-DD 格式
function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 获取当前时间，格式为 YYYY-MM-DD HH:MM:SS
function getCurrentTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 获取星期几
function getWeekDay(dateString) {
  const date = new Date(dateString)
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekDays[date.getDay()]
}

function bookVenue() {
  // 构建预订所需的场地列表
  const siteReserveList = timeSlots.map(slot => {
    const id = generateUUID() // 实际应用中这些ID可能需要从API获取
    const fullStartTime = `${bookDate} ${slot.start}`
    const fullEndTime = `${bookDate} ${slot.end}`
    const week = getWeekDay(bookDate)
    
    return {
      "id": id,
      "schemeId": "68849c0d8ddf4c47be8a398b04d33a90",
      "siteId": siteId,
      "startTime": fullStartTime,
      "endTime": fullEndTime,
      "week": week,
      "price": price,
      "yuliu1": null,
      "yuliu2": null,
      "isDel": "0",
      "revision": null,
      "createdBy": "admin",
      "createdTime": "2024-03-21 17:27:06",
      "updatedBy": null,
      "updatedTime": null,
      "reserveDate": bookDate,
      "reservePeople": null,
      "reserveState": 9,
      "syuliu2": null,
      "sremark": null,
      "nickName": null,
      "studentNumber": null,
      "schemeType": null,
      "oorderBusiness": null,
      "oorder": null,
      "index": slot.index,
      "siteName": "湖3号",
      "priceSchemeId": id
    }
  })

  // 构建价格方案列表
  const priceSchemeList = siteReserveList.map(site => {
    return { "id": site.id }
  })

  // 计算总价
  const orderAmount = (price * timeSlots.length).toFixed(2)

  // 构建请求体
  const requestBody = {
    "oederModule": "场地预订",
    "orderAmount": orderAmount,
    "paymentAmount": orderAmount,
    "orderTime": getCurrentTime(),
    "siteReserveList": siteReserveList,
    "orderBusiness": {
      "orderState": 0,
      "stadiumsId": stadiumsId,
      "projectId": projectId,
      "orderSource": "小程序",
      "payWay": "1",
      "remark": "备注",
      "reserveDate": bookDate,
      "siteReserveIds": ""
    },
    "priceSchemeList": priceSchemeList
  }

  // 构建请求头
  let headers = {
    'Host': 'wxgym.whsu.edu.cn',
    'Connection': 'keep-alive',
    'Authorization': authVal,
    'content-type': 'application/json',
    'Accept-Encoding': 'gzip,compress,br,deflate',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.60(0x18003c26) NetType/WIFI Language/zh_CN',
    'Referer': 'https://servicewechat.com/wxef02f265de0ff9f8/52/page-frame.html'
  }

  const url = { 
    url: `https://wxgym.whsu.edu.cn/prod-api/system/order/create`, 
    headers: headers,
    body: JSON.stringify(requestBody)
  }
  
  back.log(`${cookieName}, 开始预订场地...`)
  back.log(`url:${url}`)
  back.log(`Authorization:${authVal}`)
  back.log(`requestBody:${JSON.stringify(requestBody)}`)
  back.post(url, (error, response, data) => {
    try {
      back.log(`${cookieName}, 预订结果: ${data}`)
      const result = JSON.parse(data)
      if (result.code == 200) {
        subTitle = `预订结果: 🎉预订成功`
        detail = `预订日期: ${bookDate}\n`
        detail += `预订场地: 湖3号\n`
        detail += `预订时间: ${timeSlots.map(slot => `${slot.start.substring(0, 5)}-${slot.end.substring(0, 5)}`).join(', ')}\n`
        detail += `支付金额: ¥${orderAmount}\n`
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
}

// 生成UUID函数，用于模拟ID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
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
