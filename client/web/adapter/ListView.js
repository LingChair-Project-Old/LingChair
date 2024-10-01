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
 * 创建列表
 * @param { String } prop 属性 prop-a="value" prop-b="value"
 * @param { String } [header] 顶部信息
 * @returns { jQuery } 视图
 */
function ListView(prop, header) {
    return $($.parseHTML(`
        <mdui-list ${prop}>${header ? `<mdui-list-subheader>${header}</mdui-list-subheader>` : ''}</mdui-list>
    `))
}

/**
 * 列表子项目
 * @param { Object } arg 
 * @param { String } arg.description 内容
 * @param { String } arg.title 标题
 * @param { String } [arg.src] 图片链接
 * @param { String } [arg.icon] 图标ID
 * @returns { jQuery } 视图
 */
ListView.Item = function({ description, title, src, icon, prop }) {
    return $($.parseHTML(`
        <mdui-list-item rounded alignment="center" ${description ? `description="${description}"` : ''} ${prop}>
            ${title}
            <mdui-avatar slot="icon" ${src ? `src="${src}"` : (icon ? `icon="${icon}"` : '')}>${icon || src ? '' : title}</mdui-avatar>
        </mdui-list-item>
    `))
}

window.ListView = ListView
