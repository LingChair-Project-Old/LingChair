/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

import process from 'node:process'

import * as HttpApi from './HttpApi.js'

import vals from './vals.js'

if (process.argv.includes('--start-server')) {
    HttpApi.httpServer.listen(vals.LINGCHAIR_SERVER_CONFIG.port, vals.LINGCHAIR_SERVER_CONFIG.bindAddress)
}

export default HttpApi
