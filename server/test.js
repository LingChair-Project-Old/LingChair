// ==================================================
//                      注册
// ==================================================

const User = require("./api/User")

let a = new User('满月')
let b = new User('满月叶')

a.register({
    nickName: 'demo1',
    passwd: 'demo1',
})

b.register({
    nickName: 'demo2',
    passwd: 'demo2',
})

console.log(a.getNickName())
console.log(b.getNickName())

// ==================================================
//                      联系人
// ==================================================

console.log(a.getContacts())
console.log(b.getContacts())

// ==================================================
//                    消息相关
// ==================================================

a.sendToUser(b, {
    msg: '测试',
})
console.log(a.getMessageHistroyOfUser(b))
b.sendToUser(a, {
    msg: '测试',
})
console.log(b.getMessageHistroyOfUser(a))
