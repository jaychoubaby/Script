// 2023-02-20 20:55

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/v1/search/hot_list")) {
  if (obj.data?.items) {
    obj.data.items = [];
  }
} else if (url.includes("/v1/system_service/config")) {
  // 小红书-开屏广告-config
  if (obj.data) {
    delete obj.data.store;
    delete obj.data.splash;
    delete obj.data.loading_img;
  }
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
} else if (url.includes("/v4/search/trending")) {
  if (obj.data?.queries) {
    obj.data.queries = [];
  }
  if (obj.data?.hint_word) {
    obj.data.hint_word = {};
  }
} else if (url.includes("/v4/search/hint")) {
  if (obj.data?.hint_words) {
    obj.data.hint_words = [];
  }
} else if (url.includes("/v6/homefeed")) {
  if (obj.data) {
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

$done({ body: JSON.stringify(obj) });