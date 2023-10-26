/***********************************

> 应用名称：克拉壁纸 最新版Pro
> 软件版本：7.5.1
> 脚本作者：Cuttlefish
> 微信账号：墨鱼手记
> 解锁说明：解锁会员权限
> 更新时间：2022-12-10
> 通知频道：https://t.me/ddgksf2021
> 贡献投稿：https://t.me/ddgksf2013_bot
> 问题反馈：ddgksf2013@163.com
> 特别提醒：如需转载请注明出处，谢谢合作！
> 特别说明：⚠️⚠️⚠️
          本脚本仅供学习交流使用，禁止转载售卖
          ⚠️⚠️⚠️


[rewrite_local]
  
# ～ 克拉壁纸 解锁会员权限（2022-12-10）@ddgksf2013
^https:\/\/claritywallpaper\.com\/clarity\/api\/(userInfo|special\/queryByCatalogAll|picture\/search|catalog\/listAll|top\/list|picture\/date\?date) url script-response-body https://github.com/ddgksf2013/dev/raw/main/ClarityProCrack.js

[mitm] 

hostname=claritywallpaper.com

***********************************/




var body = $response.body;
var url = $request.url;
var obj = JSON.parse(body);

const userinfo = '/userInfo';
const setfree = '/special/queryByCatalogAll';

if (url.indexOf(setfree) != -1) {
   for (var i = 0; i < obj.data.length; i++) {
       obj.data[i].isFree = true;
       obj.data[i].random = "Kqp5/Z35ga5WBeNcLue+dBwZW4ZWRoDFMAqqU48d06Y=";
   }
   body = JSON.stringify(obj);
}
if (url.indexOf(userinfo) != -1) {
   obj.data.level = 5;
   obj.data.expireTime = 4070965662;
   body = JSON.stringify(obj);
}
$done({body});