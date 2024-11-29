/* 
 * ©2024 The LingChair Project
 * 
 * Make a more colorful world...
 * 
 * License - Apache License 2.0
 * Author - @MoonLeeeaf <https://github.com/MoonLeeeaf>
 * Organization - @LingChair <https://github.com/LingChair>
 */

customElements.define('list-view', class extends HTMLElement {
    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        const content = this.textContent || this.innerHTML

        this.shadow.innerHTML = (`<mdui-list>${this.hasAttribute("header") ? `<mdui-list-subheader>${this.getAttribute("header")}</mdui-list-subheader>` : ''}${content}</mdui-list>`)
    }
})

customElements.define('avatar-view', class extends HTMLElement {
    constructor() {
        super()
        
        this.shadow = this.attachShadow({ mode: "open" })
    }
    connectedCallback() {
        const content = this.textContent || this.innerHTML

        this.shadow.innerHTML = (`<mdui-avatar slot="icon" ${this.hasAttribute("src") ? `src="${this.getAttribute("src")}"` : (this.hasAttribute("icon") ? `icon="${this.getAttribute("icon")}"` : '')}>${this.hasAttribute("icon") || this.hasAttribute("src") ? '' : this.getAttribute("text")}</mdui-avatar>`)
    }
})

customElements.define('list-view-iconitem', class extends HTMLElement {
    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        const content = this.textContent || this.innerHTML

        this.shadow.innerHTML = (`<mdui-list-item rounded alignment="center" ${this.hasAttribute("content") ? `description="${this.getAttribute("content")}"` : ''}>
            ${this.getAttribute("title") +
            `<avatar-view ${this.hasAttribute("src") ? `src="${this.getAttribute("src")}"` : ''} ${this.hasAttribute("icon") ? `icon="${this.getAttribute("icon")}"` : ''} ${this.hasAttribute("title") ? `text="${this.getAttribute("title")}"` : ''}></avatar-view>`}
        </mdui-list-item>`)
    }
})
