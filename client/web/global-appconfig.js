/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

fetch('client_config.json').then((re) => re.json()).then((config) => {
    window.globalConfig = config
    Vue.createApp({
        data() {
            return {
                title: config.title,
            }
        }
    }).mount('html')
})
