/**
 * 当图片加载错误时(onerror), 加载一张报错图片
 * @param { String } src 图片链接
 * @param { String } alt 文本提示
 */
function showErrorImage(src, alt) {
    if (!this.loadFailed) {
        this.loadFailed = true
        this.src = src
    } else {
        this.alt = alt
    }
}

/**
 * 通过 UA 来侦测是否为移动端
 * @returns { Boolean } bool 是否为移动端
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
}

/**
 * 格式化时间文本
 * @param { String } format 欲格式化文本
 * @param { Date } date 日期对象
 * @returns { String } formatedTime 格式化后的时间
 */
function formatDateTime(format, date) {
    // 来自 https://www.cnblogs.com/yuzhihui/p/17131754.html
    const o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
        "H+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
        a: date.getHours() < 12 ? "上午" : "下午", // 上午/下午
        A: date.getHours() < 12 ? "AM" : "PM", // AM/PM
    };
    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return format;
}

export {
    showErrorImage,
    formatDateTime,
    isMobile,
}