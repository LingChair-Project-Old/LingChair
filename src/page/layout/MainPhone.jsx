import ChatContainer from './ChatContainer.js'
import ListItem from './ListItem.js'
import BottomBar from './BottomBar.js'
import { handleRecentClick } from '../DrawerListApi.js'

function MainPhone() {
    function setTitle(t) {
        $('#AppBarTitle').text(t)
    }
    function switchPage(c) {
        let AppBarLeftButton = $("#AppBarLeftButton").get(0)
        $('[page-bind]').hide()
        $(`[page-bind=${c}]`).show()
        if (c != 'chat') {
            setTitle('铃之椅')
            AppBarLeftButton.icon = 'menu'
            AppBarLeftButton.onclick = () => {
            
            }
        } else {
            AppBarLeftButton.icon = 'back'
            AppBarLeftButton.onclick = () => {
                switchPage(BottomNav.value)
            }
        }
    }

    React.useEffect(() => {
        let BottomNav = $("#BottomNav").get(0)
        let e = (event) => {
            let c = event.target.value
            $('[bottom-nav-bind]').hide()
            $(`[bottom-nav-bind=${c}]`).show()
        }
        BottomNav.addEventListener('change', e)
        
        e({target: BottomNav})
        switchPage(BottomNav.value)
        
        // 如果不返回一个注销函数，会直接报错
        // 这个问题很困扰人
        // 不 没有比使用非 React.createElement 更加烦人的事情
        return () => {
            BottomNav.removeEventListener('change', e)
        }
    })
    return (
        <div id="app-inner" style={{
            fontFamily: '-apple-system, system-ui, -webkit-system-font',
            display: 'flex',
        }}>
            <mdui-top-app-bar variant="center-aligned">
                <mdui-button-icon icon="back" id="AppBarLeftButton"></mdui-button-icon>
                <mdui-top-app-bar-title id="AppBarTitle"></mdui-top-app-bar-title>
                <div style={{
                    flexGrow: 1,
                }}></div>
                
                <mdui-dropdown>
                    <mdui-button-icon slot="trigger" icon="more_vert"></mdui-button-icon>
                
                    <mdui-menu>
                        <mdui-menu-item bottom-nav-bind='recent'>清空非置顶</mdui-menu-item>
                        <mdui-menu-item bottom-nav-bind='contacts'>添加新联系人</mdui-menu-item>
                        <mdui-menu-item bottom-nav-bind='groups'>加入群聊</mdui-menu-item>
                        <mdui-menu-item bottom-nav-bind='groups'>创建群聊</mdui-menu-item>
                        <mdui-menu-item onClick={() => mdui.alert({
                            headline: "关于",
                            description: "铃之椅 v0.0.0☘️GitHub @LingChair",
                            confirmText: "关闭",
                        })}>关于</mdui-menu-item>
                    </mdui-menu>
                </mdui-dropdown>
            </mdui-top-app-bar>
                
            <BottomBar id="BottomNav" value="recent" alignment="center" label-visibility="selected">
                <BottomBar.Item icon="watch_later--outlined" value="recent">最近</BottomBar.Item>
                <BottomBar.Item icon="contacts" value="contacts">联系人</BottomBar.Item>
                <BottomBar.Item icon="group" value="groups">群组</BottomBar.Item>
            </BottomBar>
            
            <div id="Content" style={{
                display: 'flex',
                width: '100%',
            }}>
                <div page-bind='recent' bottom-nav-bind='recent' style={{
                    width: '100%',
                }}>
                    <mdui-list style={{
                        width: '100%',
                    }}>
                        <ListItem
                            title="测试"
                            content="测试"
                            targetId="Test"
                            targetType="single"
                            errorImage="res/default_avatar.png"
                            imageAlt="测试的头像"
                            extra={{
                                onClick: handleRecentClick,
                                style: {
                                    width: '100%',
                                },
                            }} />
                    </mdui-list>
                </div>
                <div page-bind='contacts' bottom-nav-bind='contacts' style={{
                    width: '100%',
                }}>
                    <mdui-list style={{
                        width: '100%',
                    }}>
                        <ListItem
                            title="测试"
                            targetId="Test"
                            targetType="single"
                            errorImage="res/default_avatar.png"
                            imageAlt="测试的头像"
                            extra={{
                                onClick: (e) => {
                                    switchPage('chat')
                                    handleRecentClick(e)
                                },
                                style: {
                                    width: '100%',
                                },
                            }} />
                    </mdui-list>
                </div>
                <div page-bind='groups' bottom-nav-bind='groups'>
                    群组
                </div>
                <div page-bind="chat" bottom-nav-bind='29495905696'>
                    
                </div>
            </div>
        </div>
    )
}

export default MainPhone
