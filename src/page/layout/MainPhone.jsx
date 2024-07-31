import ChatContainer from './ChatContainer.js'
import ListItem from './ListItem.js'
import BottomBar from './BottomBar.js'
import { handleRecentClick } from '../DrawerListApi.js'

function MainPhone() {
    React.useEffect(() => {
        $('#BottomBar').get(0).addEventListener("change", (event) => {
            alert(event.target.value)
        })
    })
    return (
        <div id="app-inner" style={{
            fontFamily: '-apple-system, system-ui, -webkit-system-font',
        }}>
            <mdui-top-app-bar variant="center-aligned">
                <mdui-button-icon icon="menu" onClick={function(){
                    
                }}></mdui-button-icon>
                <mdui-top-app-bar-title>铃之椅</mdui-top-app-bar-title>
                <div style={{
                    flexGrow: 1,
                }}></div>
                <mdui-button-icon icon="more_vert"></mdui-button-icon>
            </mdui-top-app-bar>
                
            <BottomBar id="BottomBar" value="recent" alignment="center" label-visibility="unlabeled">
                <BottomBar.Item icon="watch_later--outlined" value="recent"></BottomBar.Item>
                <BottomBar.Item icon="contacts" value="contects"></BottomBar.Item>
                <BottomBar.Item icon="group" value="groups"></BottomBar.Item>
            </BottomBar>
            
            <div id="Content"></div>
        </div>
    )
}

export default MainPhone
