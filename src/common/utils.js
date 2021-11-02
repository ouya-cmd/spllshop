// 防抖函数
export function debounce(func, delay) {
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

// 时间戳

// 正则表达式：字符串匹配 利器  （但是很难，规则很多）
export function formatDate(date, fmt) {
    // y y+ y*  y?
    // +表示一个或者多个/ *表示0个或者多个 /   ？表示0个或者一个
    // test() 方法用于检测一个字符串是否匹配某个模式.
    if (/(y+)/.test(fmt)) {
        // RegExp.$1=/(y+)/.test(fmt=yyyy
        // replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
        // getFullYear() 方法返回指定日期的年份（1000 年到 9999 年之间的日期的四位数字）
        // substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            // padLeftZero 4/4/4 .replace 04/04/04
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};