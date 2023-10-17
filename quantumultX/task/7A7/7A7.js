const cookieName = '7A7'
    // 更新时间
const completionTime = 'completionTime'
    // 建议
const SUGGEST = 'SUGGEST'
    // 保养
const MAINTENANCE = "MAINTENANCE"
    // 整体状态
const greetings = "greetings"
    // 副驾驶门未关状态
const CO_DRIVER_DOOR_AJAR_STATUS = "CO_DRIVER_DOOR_AJAR_STATUS"
    // 驾驶员门未关状态
const DRIVER_DOOR_AJAR_STATUS = "DRIVER_DOOR_AJAR_STATUS"
    // 左后门未关状态 
const LEFT_REAR_DOOR_AJAR_STATUS = "LEFT_REAR_DOOR_AJAR_STATUS"
    // 右后门未关状态
const RIGHT_REAR_DOOR_AJAR_STATUS = "RIGHT_REAR_DOOR_AJAR_STATUS"
    // 内容盗窃防护状态 
const CONTENT_THEFT_DETERRENT_STATE = "CONTENT_THEFT_DETERRENT_STATE"
    // 门上次遥控锁状态
const DOOR_LAST_REMOTE_LOCK_STATUS = "DOOR_LAST_REMOTE_LOCK_STATUS"
    // 燃料数量 
const FUEL_AMOUNT = 'FUEL_AMOUNT'
    // 燃油容量
const FUEL_CAPACITY = 'FUEL_CAPACITY'
    // 燃油水平
const FUEL_LEVEL = 'FUEL_LEVEL'
    // 加仑中的燃油水平
const FUEL_LEVEL_IN_GAL = 'FUEL_LEVEL_IN_GAL'
    // 危险请求已激活
const HAZARD_REQUEST_ACTIVE = 'HAZARD_REQUEST_ACTIVE'
    // 前灯状态
const HEADLIGHTS_STATUS = 'HEADLIGHTS_STATUS'
    // 上次旅行距离
const LAST_TRIP_TOTAL_DISTANCE = 'LAST_TRIP_TOTAL_DISTANCE'
    // 上次旅行的燃油经济性
const LAST_TRIP_FUEL_ECON = 'LAST_TRIP_FUEL_ECON'
    // 终身燃油经济性
const LIFETIME_FUEL_ECON = 'LIFETIME_FUEL_ECON'
    // 里程表
const ODOMETER = 'ODOMETER'
    // 机油寿命 
const OIL_LIFE = 'OIL_LIFE'
    // 后部关闭锁定状态
const REAR_CLOSURE_LOCK_STATUS = 'REAR_CLOSURE_LOCK_STATUS'
    // 远程启动状态已验证 
const REMOTE_START_STATUS_AUTHENTICATED = 'REMOTE_START_STATUS_AUTHENTICATED'
    // 轮胎压力 左前
const TIRE_PRESSURE_LF = 'TIRE_PRESSURE_LF'
    // 轮胎压力 左后
const TIRE_PRESSURE_LR = 'TIRE_PRESSURE_LR'
    // 轮胎压力 右前
const TIRE_PRESSURE_RF = 'TIRE_PRESSURE_RF'
    // 轮胎压力 右后
const TIRE_PRESSURE_RR = 'TIRE_PRESSURE_RR'


const back = init()


if ($request && $request.method != 'OPTIONS') {
    var data = JSON.parse($response.body).data

    // 更新时间
    var completionTimeData = data.completionTime
    if (completionTimeData == null || completionTimeData == '') {
        back.done();
    }
    back.setdata(completionTimeData, completionTime)

    // 维护建议
    var maintenanceSuggestions = data.maintenanceSuggestions
    let SUGGEST_DATA = ''
    for (let i = 0; i < maintenanceSuggestions.length; i++) {
        if (maintenanceSuggestions[i].suggestType == 'SUGGEST') {
            SUGGEST_DATA += maintenanceSuggestions[i].title + " "
        }
        if (maintenanceSuggestions[i].suggestType == 'MAINTENANCE') {
            back.setdata(maintenanceSuggestions[i].hint + maintenanceSuggestions[i].viceHint + maintenanceSuggestions[i].warning, MAINTENANCE)
        }
    }
    if (SUGGEST_DATA) back.setdata(SUGGEST_DATA, SUGGEST)

    // 整体状态
    if (data.greeting.greetings) back.setdata(data.greeting.greetings, greetings)


    var diagnosticResponse = data.body.diagnosticResponse
    for (let i = 0; i < diagnosticResponse.length; i++) {
        var diagnosticElement = diagnosticResponse[i].diagnosticElement
        for (let j = 0; j < diagnosticElement.length; j++) {
            var itme = diagnosticElement[j]
            saveValueByName(itme)
        }
    }

    const back7A7Body = JSON.stringify($response.body)
    back.msg(cookieName, `获取7A7数据: 成功`, `${back7A7Body}`)
}

function saveValueByName(item) {
    if (itme.name == 'CO DRIVER DOOR AJAR STATUS') {
        back.setdata(itme.value, CO_DRIVER_DOOR_AJAR_STATUS)
    }
    if (itme.name == 'DRIVER DOOR AJAR STATUS') {
        back.setdata(itme.value, DRIVER_DOOR_AJAR_STATUS)
    }
    if (itme.name == 'LEFT REAR DOOR AJAR STATUS') {
        back.setdata(itme.value, LEFT_REAR_DOOR_AJAR_STATUS)
    }
    if (itme.name == 'RIGHT REAR DOOR AJAR STATUS') {
        back.setdata(itme.value, RIGHT_REAR_DOOR_AJAR_STATUS)
    }
    if (itme.name == 'CONTENT THEFT DETERRENT STATE') {
        back.setdata(itme.value, CONTENT_THEFT_DETERRENT_STATE)
    }
    if (itme.name == 'DOOR LAST REMOTE LOCK STATUS') {
        back.setdata(itme.value, DOOR_LAST_REMOTE_LOCK_STATUS)
    }
    if (itme.name == 'FUEL AMOUNT') {
        back.setdata(itme.value + itme.unit, FUEL_AMOUNT)
    }
    if (itme.name == 'FUEL CAPACITY') {
        back.setdata(itme.value + itme.unit, FUEL_CAPACITY)
    }
    if (itme.name == 'FUEL LEVEL') {
        back.setdata(itme.value + itme.unit, FUEL_LEVEL)
    }
    if (itme.name == 'FUEL LEVEL IN GAL') {
        back.setdata(itme.value + itme.unit, FUEL_LEVEL_IN_GAL)
    }
    if (itme.name == 'HAZARD REQUEST ACTIVE') {
        back.setdata(itme.value, HAZARD_REQUEST_ACTIVE)
    }
    if (itme.name == 'HEADLIGHTS STATUS') {
        back.setdata(itme.value, HEADLIGHTS_STATUS)
    }
    if (itme.name == 'LAST TRIP TOTAL DISTANCE') {
        back.setdata(itme.value + itme.unit, LAST_TRIP_TOTAL_DISTANCE)
    }
    if (itme.name == 'LAST TRIP FUEL ECON') {
        back.setdata(itme.value + itme.unit, LAST_TRIP_FUEL_ECON)
    }
    if (itme.name == 'LIFETIME FUEL ECON') {
        back.setdata(itme.value + itme.unit, LIFETIME_FUEL_ECON)
    }
    if (itme.name == 'ODOMETER') {
        back.setdata(itme.value + itme.unit, ODOMETER)
    }
    if (itme.name == 'OIL LIFE') {
        back.setdata(itme.value + itme.unit, OIL_LIFE)
    }

    if (itme.name == 'REAR CLOSURE LOCK STATUS') {
        back.setdata(itme.status, REAR_CLOSURE_LOCK_STATUS)
    }

    if (itme.name == 'REMOTE START STATUS AUTHENTICATED') {
        back.setdata(itme.value, REMOTE_START_STATUS_AUTHENTICATED)
    }

    if (itme.name == 'TIRE PRESSURE LF') {
        back.setdata(itme.value + itme.unit, TIRE_PRESSURE_LF)
    }
    if (itme.name == 'TIRE PRESSURE LR') {
        back.setdata(itme.value + itme.unit, TIRE_PRESSURE_LR)
    }
    if (itme.name == 'TIRE PRESSURE RF') {
        back.setdata(itme.value + itme.unit, TIRE_PRESSURE_RF)
    }
    if (itme.name == 'TIRE PRESSURE RR') {
        back.setdata(itme.value + itme.unit, TIRE_PRESSURE_RR)
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
back.done()