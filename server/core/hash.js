/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 哈希辅助类
 */

const crypto = require("node:crypto")

module.exports = {
    /**
     * 生成 SHA256 哈希值
     * @param { String } data 
     * @returns { String } HEX 格式的哈希值
     */
    sha256: (data) => crypto.createHash("sha256").update(data).digest("hex"),
    /**
     * 生成 MD5 哈希值
     * @param { String } data 
     * @returns { String } HEX 格式的哈希值
     */
    md5: (data) => crypto.createHash("md5").update(data).digest("hex"),
}
