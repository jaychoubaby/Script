const cookieName = '中国联通'
const tokenurlKey = 'chavy_tokenurl_10010'
const tokenheaderKey = 'chavy_tokenheader_10010'
const signurlKey = 'chavy_signurl_10010'
const signheaderKey = 'chavy_signheader_10010'
const loginlotteryurlKey = 'chavy_loginlotteryurl_10010'
const loginlotteryheaderKey = 'chavy_loginlotteryheader_10010'
const findlotteryurlKey = 'chavy_findlotteryurl_10010'
const findlotteryheaderKey = 'chavy_findlotteryheader_10010'
const yaya_cookie = '@YaYa_10010.cookie'
const chavy = init()
const APIKey = 'YaYa_10010';
YAYA = new API(APIKey, true);

if ($request && $request.method != 'OPTIONS' && $request.url.indexOf('querySigninActivity.htm') >= 0) {
    const tokenurlVal = $request.url
    const tokenheaderVal = JSON.stringify($request.headers)
    if (tokenurlVal) chavy.setdata(tokenurlVal, tokenurlKey)
    if (tokenheaderVal) chavy.setdata(tokenheaderVal, tokenheaderKey)
    chavy.msg(cookieName, `获取刷新链接: 成功`, ``)
} else if ($request && $request.method != 'OPTIONS' && $request.url.indexOf('daySign') >= 0) {
    const signurlVal = $request.url
    const signheaderVal = JSON.stringify($request.headers)
    if (signurlVal) chavy.setdata(signurlVal, signurlKey)
    if (signheaderVal) chavy.setdata(signheaderVal, signheaderKey)
    chavy.msg(cookieName, `获取Cookie: 成功 (每日签到)`, ``)
} else if ($request && $request.method != 'OPTIONS' && $request.url.indexOf('userLogin') >= 0) {
    const loginlotteryurlVal = $request.url
    const loginlotteryheaderVal = JSON.stringify($request.headers)
    if (loginlotteryurlVal) chavy.setdata(loginlotteryurlVal, loginlotteryurlKey)
    if (loginlotteryheaderVal) chavy.setdata(loginlotteryheaderVal, loginlotteryheaderKey)
        // chavy.msg(cookieName, `获取Cookie: 成功 (登录抽奖)`, ``)
} else if ($request && $request.method != 'OPTIONS' && $request.url.indexOf('findActivityInfo') >= 0) {
    const findlotteryurlVal = $request.url
    const findlotteryheaderVal = JSON.stringify($request.headers)
    if (findlotteryurlVal) chavy.setdata(findlotteryurlVal, findlotteryurlKey)
    if (findlotteryheaderVal) chavy.setdata(findlotteryheaderVal, findlotteryheaderKey)
    chavy.msg(cookieName, `获取Cookie: 成功 (抽奖次数)`, ``)
} else if ($request && $request.method != 'OPTIONS' && $request.url.indexOf('smartwisdomCommon') >= 0) {
    const logincookie = JSON.stringify($request.headers.Cookie)
    console.log(`yaya_cookie:` + logincookie)
    if (logincookie) YAYA.write(logincookie, 'cookie');
    chavy.msg(cookieName, `获取Cookie: 成功 (YAYA)`, ``)
}

function ENV() {
    const isQX = typeof $task !== 'undefined';
    const isLoon = typeof $loon !== 'undefined';
    const isSurge = typeof $httpClient !== 'undefined' && !isLoon;
    const isJSBox = typeof require == 'function' && typeof $jsbox != 'undefined';
    const isNode = typeof require == 'function' && !isJSBox;
    const isRequest = typeof $request !== 'undefined';
    const isScriptable = typeof importModule !== 'undefined';
    return {
        isQX,
        isLoon,
        isSurge,
        isNode,
        isJSBox,
        isRequest,
        isScriptable,
    };
}

function HTTP(
    defaultOptions = {
        baseURL: '',
    },
) {
    const { isQX, isLoon, isSurge, isScriptable, isNode } = ENV();
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'];
    const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    function send(method, options) {
        options =
            typeof options === 'string' ? {
                url: options,
            } :
            options;
        const baseURL = defaultOptions.baseURL;
        if (baseURL && !URL_REGEX.test(options.url || '')) {
            options.url = baseURL ? baseURL + options.url : options.url;
        }
        if (options.body && options.headers && !options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        options = {
            ...defaultOptions,
            ...options,
        };
        const timeout = options.timeout;
        const events = {
            ... {
                onRequest: () => {},
                onResponse: (resp) => resp,
                onTimeout: () => {},
            },
            ...options.events,
        };

        events.onRequest(method, options);

        let worker;
        if (isQX) {
            worker = $task.fetch({
                method,
                ...options,
            });
        } else if (isLoon || isSurge || isNode) {
            worker = new Promise((resolve, reject) => {
                const request = isNode ? require('request') : $httpClient;
                request[method.toLowerCase()](options, (err, response, body) => {
                    if (err) reject(err);
                    else
                        resolve({
                            statusCode: response.status || response.statusCode,
                            headers: response.headers,
                            body,
                        });
                });
            });
        } else if (isScriptable) {
            const request = new Request(options.url);
            request.method = method;
            request.headers = options.headers;
            request.body = options.body;
            worker = new Promise((resolve, reject) => {
                request
                    .loadString()
                    .then((body) => {
                        resolve({
                            statusCode: request.response.statusCode,
                            headers: request.response.headers,
                            body,
                        });
                    })
                    .catch((err) => reject(err));
            });
        }

        let timeoutid;
        const timer = timeout ?
            new Promise((_, reject) => {
                timeoutid = setTimeout(() => {
                    events.onTimeout();
                    return reject(
                        `${method} URL: ${options.url} exceeds the timeout ${timeout} ms`,
                    );
                }, timeout);
            }) :
            null;

        return (timer ?
            Promise.race([timer, worker]).then((res) => {
                clearTimeout(timeoutid);
                return res;
            }) :
            worker
        ).then((resp) => events.onResponse(resp));
    }

    const http = {};
    methods.forEach(
        (method) =>
        (http[method.toLowerCase()] = (options) => send(method, options)),
    );
    return http;
}

function API(name = 'untitled', debug = false) {
    const { isQX, isLoon, isSurge, isNode, isJSBox, isScriptable } = ENV();
    return new(class {
        constructor(name, debug) {
            this.name = name;
            this.debug = debug;

            this.http = HTTP();
            this.env = ENV();

            this.node = (() => {
                if (isNode) {
                    const fs = require('fs');

                    return {
                        fs,
                    };
                } else {
                    return null;
                }
            })();
            this.initCache();

            const delay = (t, v) =>
                new Promise(function(resolve) {
                    setTimeout(resolve.bind(null, v), t);
                });

            Promise.prototype.delay = function(t) {
                return this.then(function(v) {
                    return delay(t, v);
                });
            };
        }

        // persistence
        // initialize cache
        initCache() {
            if (isQX) this.cache = JSON.parse($prefs.valueForKey(this.name) || '{}');
            if (isLoon || isSurge)
                this.cache = JSON.parse($persistentStore.read(this.name) || '{}');

            if (isNode) {
                // create a json for root cache
                let fpath = 'root.json';
                if (!this.node.fs.existsSync(fpath)) {
                    this.node.fs.writeFileSync(
                        fpath,
                        JSON.stringify({}), {
                            flag: 'wx',
                        },
                        (err) => console.log(err),
                    );
                }
                this.root = {};

                // create a json file with the given name if not exists
                fpath = `${this.name}.json`;
                if (!this.node.fs.existsSync(fpath)) {
                    this.node.fs.writeFileSync(
                        fpath,
                        JSON.stringify({}), {
                            flag: 'wx',
                        },
                        (err) => console.log(err),
                    );
                    this.cache = {};
                } else {
                    this.cache = JSON.parse(
                        this.node.fs.readFileSync(`${this.name}.json`),
                    );
                }
            }
        }

        // store cache
        persistCache() {
            const data = JSON.stringify(this.cache, null, 2);
            if (isQX) $prefs.setValueForKey(data, this.name);
            if (isLoon || isSurge) $persistentStore.write(data, this.name);
            if (isNode) {
                this.node.fs.writeFileSync(
                    `${this.name}.json`,
                    data, {
                        flag: 'w',
                    },
                    (err) => console.log(err),
                );
                this.node.fs.writeFileSync(
                    'root.json',
                    JSON.stringify(this.root, null, 2), {
                        flag: 'w',
                    },
                    (err) => console.log(err),
                );
            }
        }

        write(data, key) {
            this.log(`SET ${key}`);
            if (key.indexOf('#') !== -1) {
                key = key.substr(1);
                if (isSurge || isLoon) {
                    return $persistentStore.write(data, key);
                }
                if (isQX) {
                    return $prefs.setValueForKey(data, key);
                }
                if (isNode) {
                    this.root[key] = data;
                }
            } else {
                this.cache[key] = data;
            }
            this.persistCache();
        }

        read(key) {
            this.log(`READ ${key}`);
            if (key.indexOf('#') !== -1) {
                key = key.substr(1);
                if (isSurge || isLoon) {
                    return $persistentStore.read(key);
                }
                if (isQX) {
                    return $prefs.valueForKey(key);
                }
                if (isNode) {
                    return this.root[key];
                }
            } else {
                return this.cache[key];
            }
        }

        delete(key) {
            this.log(`DELETE ${key}`);
            if (key.indexOf('#') !== -1) {
                key = key.substr(1);
                if (isSurge || isLoon) {
                    return $persistentStore.write(null, key);
                }
                if (isQX) {
                    return $prefs.removeValueForKey(key);
                }
                if (isNode) {
                    delete this.root[key];
                }
            } else {
                delete this.cache[key];
            }
            this.persistCache();
        }

        // notification
        notify(title, subtitle = '', content = '', options = {}) {
            const openURL = options['open-url'];
            const mediaURL = options['media-url'];

            if (isQX) $notify(title, subtitle, content, options);
            if (isSurge) {
                $notification.post(
                    title,
                    subtitle,
                    content + `${mediaURL ? '\n多媒体:' + mediaURL : ''}`, {
                        url: openURL,
                    },
                );
            }
            if (isLoon) {
                let opts = {};
                if (openURL) opts['openUrl'] = openURL;
                if (mediaURL) opts['mediaUrl'] = mediaURL;
                if (JSON.stringify(opts) === '{}') {
                    $notification.post(title, subtitle, content);
                } else {
                    $notification.post(title, subtitle, content, opts);
                }
            }
            if (isNode || isScriptable) {
                const content_ =
                    content +
                    (openURL ? `\n点击跳转: ${openURL}` : '') +
                    (mediaURL ? `\n多媒体: ${mediaURL}` : '');
                if (isJSBox) {
                    const push = require('push');
                    push.schedule({
                        title: title,
                        body: (subtitle ? subtitle + '\n' : '') + content_,
                    });
                } else {
                    console.log(`${title}\n${subtitle}\n${content_}\n\n`);
                }
            }
        }

        // other helper functions
        log(msg) {
            if (this.debug) console.log(`[${this.name}] LOG: ${this.stringify(msg)}`);
        }

        info(msg) {
            console.log(`[${this.name}] INFO: ${this.stringify(msg)}`);
        }

        error(msg) {
            console.log(`[${this.name}] ERROR: ${this.stringify(msg)}`);
        }

        wait(millisec) {
            return new Promise((resolve) => setTimeout(resolve, millisec));
        }

        done(value = {}) {
            if (isQX || isLoon || isSurge) {
                $done(value);
            } else if (isNode && !isJSBox) {
                if (typeof $context !== 'undefined') {
                    $context.headers = value.headers;
                    $context.statusCode = value.statusCode;
                    $context.body = value.body;
                }
            }
        }

        stringify(obj_or_str) {
            if (typeof obj_or_str === 'string' || obj_or_str instanceof String)
                return obj_or_str;
            else
                try {
                    return JSON.stringify(obj_or_str, null, 2);
                } catch (err) {
                    return '[object Object]';
                }
        }
    })(name, debug);
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
chavy.done()