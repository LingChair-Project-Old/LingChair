/**
 * Date Formater
 * Author @侠名<https://zhuanlan.zhihu.com/p/162910462>
 */

/**
 * 格式化日期
 * @param {int} 时间戳
 * @param {String} 欲格式化的文本
 * @returns {String} 格式后的文本
 */
export default function formatDate(tms, format) {
    let tmd = new Date(tms)
    /*
     * 例子: format="YYYY-MM-dd hh:mm:ss";
     */
    var o = {
        "Y+": tmd.getFullYear(), // year
        "M+": tmd.getMonth() + 1, // month 坑: Node的月份和实际差1
        "d+": tmd.getDate(), // day
        "h+": tmd.getHours(), // hour
        "m+": tmd.getMinutes(), // minute
        "s+": tmd.getSeconds(), // second
        "q+": Math.floor((tmd.getMonth() + 3) / 3), // quarter
        "S": tmd.getMilliseconds(), // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (tmd.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}