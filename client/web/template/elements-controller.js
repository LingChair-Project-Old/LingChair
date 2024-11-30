class Message {
    constructor(arg) {
        const { senderId = '', senderName = '', msg = '' } = arg || {}
        this.senderId = senderId
        this.senderName = senderName
        this.msg = msg
        this.avatar = avatar
    }
    setSenderId(senderId) {
        this.senderId = senderId
        return this
    }
    setSenderName(senderName) {
        this.senderName = senderName
        return this
    }
    setMsg(msg) {
        this.msg = msg
        return this
    }
    setAvatar(avatar) {
        this.avatar = avatar
        return this
    }
}

class MessageNormal extends HTMLElement {
    static observedAttributes = ['avatar', 'sender-name', 'sender-id', 'msg', 'direction']
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })

        shadow.appendChild($('#message-normal-template').get(0).content.cloneNode(true))

        $(shadow).find('#sender-name-left').hide()
    }
    connectedCallback() {
        this.update()
    }
    attributeChangedCallback(_name, _oldValue, _newValue) {
        this.update()
    }
    update() {
        const shadow = this.shadowRoot

        // 消息视图的的左右方向
        let isRightDirection = this.getAttribute('direction') == 'right'
        $(shadow).find('#_direction_1').css('justify-content', isRightDirection ? 'flex-end' : 'flex-start')
        $(shadow).find('#_direction_2').css('justify-content', isRightDirection ? 'flex-end' : 'flex-start')

        $(shadow).find('#_direction_3').css('align-self', isRightDirection ? 'flex-end' : 'flex-start')
        $(shadow).find('#_direction_3').css('margin-left', isRightDirection ? '' : '55px')
        $(shadow).find('#_direction_3').css('margin-right', isRightDirection ? '55px' : '')

        $(shadow).find('#sender-name-left')[isRightDirection ? 'show' : 'hide']()
        $(shadow).find('#sender-name-right')[isRightDirection ? 'hide' : 'show']()

        // 头像
        let avatar = $(shadow).find('#avatar')
        this.hasAttribute('avatar') ? avatar.attr('src', this.getAttribute('avatar')) : avatar.text((this.getAttribute('sender-name') || '').substring(0, 1))

        // 发送者
        $(shadow).find('#sender-name-left').text(this.getAttribute('sender-name'))
        $(shadow).find('#sender-name-right').text(this.getAttribute('sender-name'))
        $(shadow).find('#sender-id').text(this.getAttribute('sender-id'))

        // 消息
        this.hasAttribute('msg') && $(shadow).find('#msg').text(this.getAttribute('msg'))
    }
}

class MessageSystem extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })

        shadow.appendChild($('#message-system-template').get(0).content.cloneNode(true))
    }
}

class MessageHolder extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })

        shadow.appendChild($('#message-holder-template').get(0).content.cloneNode(true))
    }
    addMessage({ senderId = '', senderName = '', msg = '', avatar, direction = 'left' }, atStart) {
        const v = new MessageNormal()
        $(v).attr('sender-id', senderId).attr('sender-name', senderName).attr('avatar', avatar).attr('direction', direction).text(msg)
        $(this)[atStart ? 'prepend' : 'append'](v)
    }
}

customElements.define('message-normal', MessageNormal)
customElements.define('message-system', MessageSystem)
customElements.define('message-holder', MessageHolder)

customElements.define('main-navigation', class extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })

        shadow.appendChild($('#main-navigation-template').get(0).content.cloneNode(true))
    }
})

customElements.define('main-navigation-item', class extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })

        shadow.appendChild($('#main-navigation-item-template').get(0).content.cloneNode(true))
    }
    connectedCallback() {
        this.update()
    }
    attributeChangedCallback(_name, _oldValue, _newValue) {
        this.update()
    }
    update() {
        const shadow = this.shadowRoot

        this.hasAttribute('icon') ? $(shadow).find('#avatar').attr('src', this.getAttribute('icon')) : $(shadow).find('#avatar').text((this.getAttribute('text') || '').substring(0, 1))
        $(shadow).find('#tip').attr('content', this.getAttribute('text'))
    }
})
