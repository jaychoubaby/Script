/*
360去开屏广告
***************************
Quantumult X:
[rewrite_local]
^https:\//ad.life.360.cn url script-response-body https://raw.githubusercontent.com/jaychoubaby/Script/main/quantumultX/adBlock/360/360.js
[mitm]
hostname = ad.life.360.cn
**************************/
var body = $response.body
    .replace(/\"times\":[3|1]/, "\"times\":0" );
$done({ body });
