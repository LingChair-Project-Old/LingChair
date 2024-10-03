/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

export default class IUser {
    constructor(id) {
        this.id = id
    }
    static asAPI(id) {
        return new IUser(id)
    }
    register({nickName, password}) {

    }
}
