/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

import io from '../libraries/iolib.js'

import User from './User.js'

import Hash from '../libraries/hash.js'

import formatDate from '../libraries/formatDate.js'

export default class UserAuth {
    /**
     * 检测访问令牌是否可用
     * @param { String } id 
     * @param { String } accessToken 
     * @returns { Boolean } isAccessTokenAvailable
     */
    static checkAvailable(id, accessToken) {
        return this.getAccessToken(id) === accessToken
    }
    /**
     * 获取一个用户的访问令牌
     * @param { String } id 
     * @returns { String } accessToken
     */
    static getAccessToken(id) {
        return this.makeAccessToken(id, new User(id).getPassword())
    }
    /**
     * 通过用户ID和密码 获取一个访问令牌
     * @param { String } id 
     * @param { String } password 
     * @param { Number } [time]
     * @returns { String } accessToken
     */
    static makeAccessToken(id, password, time = new Date().getTime()) {
        const d = formatDate(time, 'YYYY_MM')
        return Hash.sha256(password + id + d) + Hash.md5(id + d) + '_' + d
    }
    /**
     * 获取一个更新的令牌
     * @param { String } id 
     * @param { String } accessToken 
     * @returns { String } newerAccessToken
     */
    static makeNewerToken(id, accessToken) {
        let _ = accessToken.split('_')
        let year = parseInt(_[1])
        let month = parseInt(_[2]) + 1
        if (month > 12) {
            month = 1
            year++
        }

        let d = new Date()
        d.setFullYear(year)
        d.setMonth(month - 1) // 坑: Node的月份和实际差1
        return this.makeAccessToken(id, new User(id).getPassword(), d.getTime())
    }
}
