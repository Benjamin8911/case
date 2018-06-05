export const formatPhoneNumber = (n) => {
    if (!n) return n
    let number = new String(n).toString()
    if (number.length === 11) {
        return `${number.slice(0, 3)} **** ${number.slice(-4)}`
    }
    return number
}

export const formatDate = (date, format) => {
// 日期格式化函数
// yyyy/MM/dd hh:mm:ss SSS ⇒ "2017/05/16 09:24:20 850"
//"yyyy/M/d h:m:s SSS"⇒ "2017/5/16 9:24:35 723"
    var map = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr( - RegExp.$1.length));
    }
    for (var k in map) {
        if (new RegExp('(' + k + ')').test(format)) {
            var strValue = map[k] + '';
            var len = RegExp.$1.length < strValue.length ? strValue.length: RegExp.$1.length;
            if (strValue.length == 1) {
                strValue = '0' + strValue;
            }
            format = format.replace(RegExp.$1, strValue.substr( - len));
        }
    }
    if (/(S+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getMilliseconds() + '').substr(0, RegExp.$1.length));
    }
    return format;
}