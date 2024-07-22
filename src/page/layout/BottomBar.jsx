import { isMobile } from '../utils.js'

function BottomBar(prop = {}) {
    if (isMobile())
        return (
            <mdui-navigation-bar {...prop}>
                {prop.children}
            </mdui-navigation-bar>
        )
    else
        return (
            <mdui-navigation-rail {...prop}>
                {prop.children}
            </mdui-navigation-rail>
        )
}

BottomBar.Item = function(prop = {}) {
    if (isMobile())
        return (
            <mdui-navigation-bar-item {...prop}></mdui-navigation-bar-item>
        )
    else
        return (
            <mdui-navigation-rail-item {...prop}></mdui-navigation-rail-item>
        )
}

export default BottomBar
