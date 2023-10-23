
/**
 * 规范使用 FileManager。每个脚本使用独立文件夹
 *
 * 注意：桌面组件无法写入 cacheDirectory 和 temporaryDirectory
 */
const useFileManager = () => {
    const fm = FileManager.iCloud();
    const paths = [fm.documentsDirectory(), Script.name()];
    const cacheDirectory = joinPath(...paths);
    /**
     * 删除路径末尾所有的 /
     * @param {string} filePath
     */
    const safePath = (filePath) => {
      return fm.joinPath(cacheDirectory, filePath).replace(/\/+$/, '')
    };
    /**
     * 如果上级文件夹不存在，则先创建文件夹
     * @param {string} filePath
     */
    const preWrite = (filePath) => {
      const i = filePath.lastIndexOf('/');
      const directory = filePath.substring(0, i);
      if (!fm.fileExists(directory)) {
        fm.createDirectory(directory, true);
      }
    };
  
    const writeString = (filePath, content) => {
      const nextPath = safePath(filePath);
      preWrite(nextPath);
      fm.writeString(nextPath, content);
    };
  
    /**
     * @param {string} filePath
     * @param {*} jsonData
     */
    const writeJSON = (filePath, jsonData) => writeString(filePath, JSON.stringify(jsonData));
    /**
     * @param {string} filePath
     * @param {Image} image
     */
    const writeImage = (filePath, image) => {
      const nextPath = safePath(filePath);
      preWrite(nextPath);
      return fm.writeImage(nextPath, image)
    };
  
    /**
     * 文件不存在时返回 null
     * @param {string} filePath
     * @returns {string|null}
     */
    const readString = (filePath) => {
      const fullPath = fm.joinPath(cacheDirectory, filePath);
      if (fm.fileExists(fullPath)) {
        return fm.readString(
          fm.joinPath(cacheDirectory, filePath)
        )
      }
      return null
    };
  
    /**
     * @param {string} filePath
     */
    const readJSON = (filePath) => JSON.parse(readString(filePath));
  
    /**
     * @param {string} filePath
     */
    const readImage = (filePath) => {
      return fm.readImage(fm.joinPath(cacheDirectory, filePath))
    };
  
    return {
      cacheDirectory,
      writeString,
      writeJSON,
      writeImage,
      readString,
      readJSON,
      readImage
    }
  };

/**
 * @param {...string} paths
 */
const joinPath = (...paths) => {
    const fm = FileManager.local();
    return paths.reduce((prev, curr) => {
      return fm.joinPath(prev, curr)
    }, '')
};

// BACK_LOCATION
let BACK_LOCATION;
// LL
let BACK_LL;
// 更新时间
let completionTime;
// 建议
let SUGGEST;
// 保养
let MAINTENANCE;
// 整体状态
let greetings;
// 副驾驶门未关状态
let CO_DRIVER_DOOR_AJAR_STATUS;
// 驾驶员门未关状态
let DRIVER_DOOR_AJAR_STATUS;
// 左后门未关状态 
let LEFT_REAR_DOOR_AJAR_STATUS;
// 右后门未关状态
let RIGHT_REAR_DOOR_AJAR_STATUS;
// 内容盗窃防护状态 
let CONTENT_THEFT_DETERRENT_STATE;
// 门上次遥控锁状态
let DOOR_LAST_REMOTE_LOCK_STATUS;
// 燃料数量 
let FUEL_AMOUNT;
// 燃油容量
let FUEL_CAPACITY;
// 燃油水平
let FUEL_LEVEL;
// 加仑中的燃油水平
let FUEL_LEVEL_IN_GAL;
// 危险请求已激活
let HAZARD_REQUEST_ACTIVE;
// 前灯状态
let HEADLIGHTS_STATUS;
// 上次旅行距离
let LAST_TRIP_TOTAL_DISTANCE;
// 上次旅行的燃油经济性
let LAST_TRIP_FUEL_ECON;
// 终身燃油经济性
let LIFETIME_FUEL_ECON;
// 里程表
let ODOMETER;
// 机油寿命 
let OIL_LIFE;
// 后部关闭锁定状态
let REAR_CLOSURE_LOCK_STATUS;
// 远程启动状态已验证 
let REMOTE_START_STATUS_AUTHENTICATED;
// 轮胎压力 左前
let TIRE_PRESSURE_LF;
// 轮胎压力 左后
let TIRE_PRESSURE_LR;
// 轮胎压力 右前
let TIRE_PRESSURE_RF;
// 轮胎压力 右后
let TIRE_PRESSURE_RR;

// Whether or not to use a background image for the widget (if false, use gradient color)
const USE_BACKGROUND_IMAGE = false;

// Font name and size
const FONT_NAME = 'Menlo';
const FONT_SIZE = 10;

// Colors
const COLORS = {
    bg0: '#29323c',
    bg1: '#1c1c1c',
    personalCalendar: '#5BD2F0',
    workCalendar: '#9D90FF',
    weather: '#FDFD97',
    location: '#FEB144',
    period: '#FF6663',
    deviceStats: '#7AE7B9',
};

/******************************************************************************
 * Initial Setups
 *****************************************************************************/

/** 规范使用文件缓存。每个脚本使用独立文件夹 */
const useCache = () => useFileManager();
const cache = useCache();

// Fetch data and create widget
const data = await fetchCarInfo();
const widget = createWidget(data);

// Set background image of widget, if flag is true
if (USE_BACKGROUND_IMAGE) {
    // Determine if our image exists and when it was saved.
    const files = FileManager.iCloud();
    const path = files.joinPath(files.documentsDirectory(), 'terminal-widget-background');
    const exists = files.fileExists(path);

    // If it exists and we're running in the widget, use photo from cache
    if (exists && config.runsInWidget) {
        widget.backgroundImage = files.readImage(path);

    // If it's missing when running in the widget, use a gradient black/dark-gray background.
    } else if (!exists && config.runsInWidget) {
        const bgColor = new LinearGradient();
        bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")];
        bgColor.locations = [0.0, 1.0];
        widget.backgroundGradient = bgColor;

    // But if we're running in app, prompt the user for the image.
    } else if (config.runsInApp){
        const img = await Photos.fromLibrary();
        widget.backgroundImage = img;
        files.writeImage(path, img);
    }
}
  
if (config.runsInApp) {  
widget.presentMedium();
}
  
Script.setWidget(widget);
Script.complete();



/**
 * Get boxjs car info data
 */
async function fetchCarInfo() {
  const request = new Request('http://boxjs.net/api/save');
  request.body = '[]';
  request.method = 'POST';
  const res = await request.loadJSON();
  if (res.datas) {
    let carInfo = res.datas;
    // BACK_LOCATION
    BACK_LOCATION = carInfo.BACK_LOCATION;
    // LL
    BACK_LL = carInfo.BACK_LL;
    // 更新时间
    completionTime = carInfo.completionTime;
    // 建议
    SUGGEST = carInfo.SUGGEST;
    // 保养
    MAINTENANCE = carInfo.MAINTENANCE;
    // 整体状态
    greetings = carInfo.greetings;
    // 副驾驶门未关状态
    CO_DRIVER_DOOR_AJAR_STATUS = carInfo.CO_DRIVER_DOOR_AJAR_STATUS;
    // 驾驶员门未关状态
    DRIVER_DOOR_AJAR_STATUS = carInfo.DRIVER_DOOR_AJAR_STATUS;
    // 左后门未关状态 
    LEFT_REAR_DOOR_AJAR_STATUS = carInfo.LEFT_REAR_DOOR_AJAR_STATUS;
    // 右后门未关状态
    RIGHT_REAR_DOOR_AJAR_STATUS = carInfo.RIGHT_REAR_DOOR_AJAR_STATUS;
    // 内容盗窃防护状态 
    CONTENT_THEFT_DETERRENT_STATE = carInfo.CONTENT_THEFT_DETERRENT_STATE;
    // 门上次遥控锁状态
    DOOR_LAST_REMOTE_LOCK_STATUS = carInfo.DOOR_LAST_REMOTE_LOCK_STATUS;
    // 燃料数量 
    FUEL_AMOUNT = carInfo.FUEL_AMOUNT;
    // 燃油容量
    FUEL_CAPACITY = carInfo.FUEL_CAPACITY;
    // 燃油水平
    FUEL_LEVEL = carInfo.FUEL_LEVEL;
    // 加仑中的燃油水平
    FUEL_LEVEL_IN_GAL = carInfo.FUEL_LEVEL_IN_GAL;
    // 危险请求已激活
    HAZARD_REQUEST_ACTIVE = carInfo.HAZARD_REQUEST_ACTIVE;
    // 前灯状态
    HEADLIGHTS_STATUS = carInfo.HEADLIGHTS_STATUS;
    // 上次旅行距离
    LAST_TRIP_TOTAL_DISTANCE = carInfo.LAST_TRIP_TOTAL_DISTANCE;
    // 上次旅行的燃油经济性
    LAST_TRIP_FUEL_ECON = carInfo.LAST_TRIP_FUEL_ECON;
    // 终身燃油经济性
    LIFETIME_FUEL_ECON = carInfo.LIFETIME_FUEL_ECON;
    // 里程表
    ODOMETER = carInfo.ODOMETER;
    // 机油寿命 
    OIL_LIFE = carInfo.OIL_LIFE;
    // 后部关闭锁定状态
    REAR_CLOSURE_LOCK_STATUS = carInfo.REAR_CLOSURE_LOCK_STATUS;
    // 远程启动状态已验证 
    REMOTE_START_STATUS_AUTHENTICATED = carInfo.REMOTE_START_STATUS_AUTHENTICATED;
    // 轮胎压力 左前
    TIRE_PRESSURE_LF = carInfo.TIRE_PRESSURE_LF;
    // 轮胎压力 左后
    TIRE_PRESSURE_LR = carInfo.TIRE_PRESSURE_LR;
    // 轮胎压力 右前
    TIRE_PRESSURE_RF = carInfo.TIRE_PRESSURE_RF;
    // 轮胎压力 右后
    TIRE_PRESSURE_RR = carInfo.TIRE_PRESSURE_RR;
    const data = {
      BACK_LOCATION,
      BACK_LL,
      completionTime,
      SUGGEST,
      MAINTENANCE,
      greetings,
      CO_DRIVER_DOOR_AJAR_STATUS,
      DRIVER_DOOR_AJAR_STATUS,
      LEFT_REAR_DOOR_AJAR_STATUS,
      RIGHT_REAR_DOOR_AJAR_STATUS,
      CONTENT_THEFT_DETERRENT_STATE,
      DOOR_LAST_REMOTE_LOCK_STATUS,
      FUEL_AMOUNT,
      FUEL_CAPACITY,
      FUEL_LEVEL,
      FUEL_LEVEL_IN_GAL,
      HAZARD_REQUEST_ACTIVE,
      HEADLIGHTS_STATUS,
      LAST_TRIP_TOTAL_DISTANCE,
      LAST_TRIP_FUEL_ECON,
      LIFETIME_FUEL_ECON,
      ODOMETER,
      OIL_LIFE,
      REAR_CLOSURE_LOCK_STATUS,
      REMOTE_START_STATUS_AUTHENTICATED,
      TIRE_PRESSURE_LF,
      TIRE_PRESSURE_LR,
      TIRE_PRESSURE_RF,
      TIRE_PRESSURE_RR
    };
    cache.writeJSON('data.json', data);
    return data;
  }
  console.log(`使用缓存数据`);
  return cache.readJSON('data.json');
}


/**
 * Main widget function.
 * 
 * @param {} data The data for the widget to display
 */
function createWidget(data) {
    console.log(`Creating widget with data: ${JSON.stringify(data)}`);
  
    const widget = new ListWidget();
    if  (!USE_BACKGROUND_IMAGE) {
    const bgColor = new LinearGradient();
    bgColor.colors = [new Color(COLORS.bg0), new Color(COLORS.bg1)];
    bgColor.locations = [0.0, 1.0];
    widget.backgroundGradient = bgColor;
    }
    widget.setPadding(10, 15, 15, 10);
  
    const stack = widget.addStack();
    stack.layoutVertically();
    stack.spacing = 4;
    stack.size = new Size(320, 0);
  
    // Line 0 - Last updated
    const lastLoginLine = stack.addText(`Last updated: ${completionTime} on back`);
    lastLoginLine.textColor = Color.white();
    lastLoginLine.textOpacity = 0.7;
    lastLoginLine.font = new Font(FONT_NAME, FONT_SIZE);
  
    // Line 1 - greetings
    const inputLine = stack.addText(`7A7:~ ${greetings}$ . . .`);
    inputLine.textColor = Color.white();
    inputLine.font = new Font(FONT_NAME, FONT_SIZE);
  
    // Line 2 - SUGGEST
    const nextPersonalCalendarEventLine = stack.addText(`🗓 | ${SUGGEST}`);
    nextPersonalCalendarEventLine.textColor = new Color(COLORS.personalCalendar);
    nextPersonalCalendarEventLine.font = new Font(FONT_NAME, FONT_SIZE);
  
    // Line 3 - TIRE_PRESSURE_LF TIRE_PRESSURE_LR TIRE_PRESSURE_RF TIRE_PRESSURE_RR 
    const nextWorkCalendarEventLine = stack.addText(`🛞 | L(${TIRE_PRESSURE_LF} ${TIRE_PRESSURE_LR})  R(${TIRE_PRESSURE_RF} ${TIRE_PRESSURE_RR})`);
    nextWorkCalendarEventLine.textColor = new Color(COLORS.workCalendar);
    nextWorkCalendarEventLine.font = new Font(FONT_NAME, FONT_SIZE);
  
    // Line 4 - FUEL_LEVEL | FUEL_AMOUNT | FUEL_CAPACITY
    const weatherLine = stack.addText(`⛽ | ⚡︎[${FUEL_LEVEL}] ${FUEL_AMOUNT}/${FUEL_CAPACITY}`);
    weatherLine.textColor = new Color(COLORS.weather);
    weatherLine.font = new Font(FONT_NAME, FONT_SIZE);
    
    // Line 5 - LIFETIME_FUEL_ECON
    const locationLine = stack.addText(`🚗 | ${LIFETIME_FUEL_ECON}`);
    locationLine.textColor = new Color(COLORS.location);
    locationLine.font = new Font(FONT_NAME, FONT_SIZE);
  
    // Line 6 - ODOMETER
    const periodLine = stack.addText(`🏁 | ${ODOMETER}`);
    periodLine.textColor = new Color(COLORS.period);
    periodLine.font = new Font(FONT_NAME, FONT_SIZE);
  
    // Line 7 - BACK_LOCATION  BACK_LL
    const deviceStatsLine = stack.addText(`📍 |  ${BACK_LOCATION}`);
    deviceStatsLine.textColor = new Color(COLORS.deviceStats);
    deviceStatsLine.font = new Font(FONT_NAME, FONT_SIZE);

    // Add link to location
    const stackLL = widget.addStack();
    stackLL.bottomAlignContent();
    stackLL.layoutHorizontally();
    stackLL.setPadding(0,315,0,0);
    let docsSymbol = SFSymbol.named("location");
    let docsElement = stackLL.addImage(docsSymbol.image);
    docsElement.imageSize = new Size(20, 20);
    docsElement.tintColor = Color.white();
    docsElement.imageOpacity = 0.5;
    docsElement.url = BACK_LL;
  
    return widget;
  }