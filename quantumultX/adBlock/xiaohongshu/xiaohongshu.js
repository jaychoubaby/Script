// 2023-01-28 21:40

if (!$response.body) $done({});
const url = $request.url;
let obj = JSON.parse($response.body);

if (obj.data) {
  // 小红书-开屏广告-config
  if (url.includes("/v1/system_service/config")) {
    delete obj.data.store;
    delete obj.data.splash;
    delete obj.data.loading_img;
  } else if (url.includes("/v2/system_service/splash_config")) {
    // 小红书-开屏广告-splash_config
    if (obj.data?.ads_groups) {
      obj.data.ads_groups.forEach((i) => {
        i.start_time = 2208960000; // Unix 时间戳 2040-01-01 00:00:00
        i.end_time = 2209046399; // Unix 时间戳 2040-01-01 23:59:59
        if (i.ads) {
          i.ads.forEach((j) => {
            j.start_time = 2208960000; // Unix 时间戳 2040-01-01 00:00:00
            j.end_time = 2209046399; // Unix 时间戳 2040-01-01 23:59:59
          });
        }
      });
    }
  } else if (url.includes("/v6/homefeed")) {
    // 小红书-信息流广告
    let newItems = [];
    for (let item of obj.data) {
      // 去除直播
      if (item.model_type === "live_v2") {
        continue;
        // 去除赞助,带货
      } else if (item.ads_info) {
        continue;
        // 去除带货
      } else if (item.card_icon) {
        continue;
      } else {
        newItems.push(item);
      }
    }
    obj.data = newItems;
  }
}

body = JSON.stringify(obj);
$done({ body });