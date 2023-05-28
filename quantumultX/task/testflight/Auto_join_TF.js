//*********************************
// */1 * * * * * https://raw.githubusercontent.com/chouchoui/QuanX/master/Scripts/testflight/Auto_join_TF.js, tag=TestFlight自动加入, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/testflight.png, enabled=true
//*********************************

setTimeout(() => {
  console.log("脚本超时 5 秒退出。");
  $done();
}, 5000)

!(async () => {
  // loon 23LA2tmX
  // stash elwvzipQ
  // forXray CcuVfzon
  ids = "CcVfzon";
  if (ids == "") {
    $notify("所有TF已加入完毕", "请手动关闭", "");
    $done();
  } else {
    ids = ids.split(",");
    try {
      for await (const ID of ids) {
        console.log("尝试：" + ID);
        await autoPost(ID);
      }
    } catch (error) {
      console.log(error);
      $done();
    }
  }
  $done();
})();

function autoPost(ID) {
  let Key = $prefs.valueForKey("key");
  console.log("Key：" + Key);
  let testurl = "https://testflight.apple.com/v3/accounts/" + Key + "/ru/";
  console.log("testurl" + testurl);
  let header = {
    "X-Session-Id": `${$prefs.valueForKey("session_id")}`,
    "X-Session-Digest": `${$prefs.valueForKey("session_digest")}`,
    "X-Request-Id": `${$prefs.valueForKey("request_id")}`,
  };
  console.log("header" + JSON.stringify(header));
  return new Promise(function (resolve) {
    $task.fetch({ url: testurl + ID, method: "GET", headers: header }).then(
      (resp) => {
        const { body: data } = resp;
        if (resp.status == 404) {
          ids = $prefs.valueForKey("APP_ID").split(",");
          ids = ids.filter((ids) => ids !== ID);
          $prefs.setValueForKey(ids.toString(), "APP_ID");
          console.log(ID + " " + "不存在该TF，已自动删除该APP_ID");
          $notify(ID, "不存在该TF", "已自动删除该APP_ID");
          resolve();
        } else {
          let jsonData = JSON.parse(data);
          if (jsonData.data == null) {
            console.log(ID + " " + jsonData.messages[0].message);
            resolve();
          } else if (jsonData.data.status == "FULL") {
            console.log(ID + " " + jsonData.data.message);
            resolve();
          } else {
            $task.fetch({ url: testurl + ID + "/accept", method: "POST", headers: header }).then((res) => {
              const { body } = res;
              let jsonBody = JSON.parse(body);
              $notify(jsonBody.data.name, "TestFlight加入成功", "");
              console.log(jsonBody.data.name + " TestFlight加入成功");
              ids = $prefs.valueForKey("APP_ID").split(",");
              ids = ids.filter((ids) => ids !== ID);
              $prefs.setValueForKey(ids.toString(), "APP_ID");
              resolve();
            });
          }
        }
      },
      (error) => {
        if (error == "The request timed out.") {
          resolve();
        } else {
          $notify("自动加入TF", error, "");
          console.log(ID + " " + error);
          resolve();
        }
      }
    );
  });
}


