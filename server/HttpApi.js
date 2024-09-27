/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

import express from 'express'

import User from './api/User.js'

const app = express()

app.put('/lingchair/user/:userId/username', (req, res) => {
    req.params.userId - req.headers['LingChair-Auth']
})

export default app
