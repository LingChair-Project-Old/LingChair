/* 
 * Console ASCII Colors
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 */

function a(b) { return `\${033}${b}` }

export default {
    /**
     * 清空效果
     */
    none: a("[0m"),
    /**
     * 红色
     */
    red: a("[1;31m"),
    /**
     * 粉色
     */
    pink: a("[1;35m"),
    /**
     * 绿色
     */
    green: a("[1;32m"),
    /**
     * 黄色
     */
    yellow: a("[1;33m"),
    /**
     * 蓝色
     */
    blue: a("[1;34m"),
}
