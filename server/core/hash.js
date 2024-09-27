/* 
 * Simple Hash Library
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 */

import crypto from "node:crypto"

export default {
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
