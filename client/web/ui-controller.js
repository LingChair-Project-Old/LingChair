/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

/**
 * ========================================================
 *                     侧边导航栏列表
 * ========================================================
 */

// 按钮:查看详细列表
$('#switch-navigation-list-info-menuicon').parent().click(() => {

})

// 切换列表选项
let lastValue = $('#switch-navigation-list-menu').get(0).value
$('#switch-navigation-list-menu').on('change', (e) => {
    // 当前选择的值
    let value = e.target.value

    // 特殊:详细列表
    console.log(value, lastValue)
    if (value == 0) {
        e.target.value = lastValue
        value = lastValue
        $('#switch-navigation-list-menu > mdui-menu-item[value=' + value + ']').get(0).selected = true
        $('#switch-navigation-list-menu > mdui-menu-item[value=0]').get(0).selected = false
        // 错误示范: 在这里写点击事件
    }

    // 禁止空选择
    if (value == null) {
        e.target.value = lastValue
        value = lastValue
        $('#switch-navigation-list-menu > mdui-menu-item[value=' + value + ']').get(0).selected = true
    }

    // 显示指定的列表
    $('#main-navigation-list-1').hide()
    $('#main-navigation-list-2').hide()
    $('#main-navigation-list-3').hide()
    $('#main-navigation-list-' + value).show()

    // 修改图标
    let icon = (function () {
        let ico
        switch (value + '') {
            case "1":
                ico = 'watch_later--outlined'
                break;
            case "2":
                ico = 'contacts--outlined'
                break;
            case "3":
                ico = 'group--outlined'
                break;
        }
        return ico
    })()
    $('#switch-navigation-list-button').attr('icon', icon)
    $('#switch-navigation-list-info-menuicon').attr('name', icon)

    // 更新最后的值用以防止空选择
    lastValue = value
})

// 最开始只选择 最近, 隐藏其他列表
$('#main-navigation-list-2').hide()
$('#main-navigation-list-3').hide()

// 子项目被点击时
$('mdui-navigation-rail').on('click', (event) => {
    let e = event.target
    let tagName = e.tagName.toLowerCase()
    while (tagName != 'main-navigation-item') {
        e = e.parentNode
        tagName = (e.tagName || 'mdui-navigation-rail').toLowerCase()
        if (tagName == 'mdui-navigation-rail') return
    }
    // 获取到Item

})

/**
 * ========================================================
 *                    输入框与消息编辑
 * ========================================================
 */

windowOnResizingCallbacks.push((w, h) => {
    $('#input_message').css('max-width', `${w - ($('mdui-navigation-rail').get(0).getWidth() + $('#send_message').get(0).getWidth() * 2 + 34)}px`)
})


/**
 * ========================================================
 *                         窗口大小
 * ========================================================
 */

function updateWindowSize() {
    document.body.style.setProperty('--window-width', `${window.innerWidth}px`)
    document.body.style.setProperty('--window-height', `${window.innerHeight}px`)
    windowOnResizingCallbacks.forEach((v) => v(window.innerWidth, window.innerHeight))
}
$(() => updateWindowSize())
window.addEventListener('resize', updateWindowSize)

/**
 * ========================================================
 *                  Shadow 元素辅助代码
 * ========================================================
 */

// 将组件添加到影子DOM中
$(() => $('* > shadow-inner').each((_i, v) => {
    $(v.parentElement.shadowRoot).append(v.children)
    v.parentNode.removeChild(v)
}))

/**
 * ========================================================
 *                           杂项
 * ========================================================
 */

// mdui.setColorScheme("#FFB4AA")
