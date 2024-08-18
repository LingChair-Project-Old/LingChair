import { showErrorImage } from '../utils.js'

/**
 * 添加一个 MDUI List Item
 * @param { Object } prop 参数
 * @param { String } prop.title 标题
 * @param { String } prop.content 内容
 * @param { String } prop.image 图片链接
 * @param { String } prop.errorImage 错误时显示的图片链接
 * @param { String } prop.imageAlt 图片的文字提示
 * @param { Object } prop.extra 额外数据
 * @returns { React.Component } component React组件
 */
function ListItem(prop = {
    imageAlt: "未知图片",
    extra: {},
}) {
    return (
        <mdui-list-item alignment="center" description={prop.content} {...(prop.extra ? prop.extra : {})} rounded style={{
            width: '100%',
        }}>
            {prop.title}
            <mdui-avatar slot="icon" src={prop.image ? prop.image : prop.errorImage} onError={() => showErrorImage(prop.errorImage, prop.imageAlt)}></mdui-avatar>
        </mdui-list-item>
    )
}

export default ListItem
