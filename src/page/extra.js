/**
 * 引入一个ES6模块
 * @param { String } path ES6模块文件路径
 * @returns { Object } module 导入的模块
 */
window.requireES6 = function (path) {
    return new Promise((res) => import(path).then((m) => {
        res(m.default ? m.default : m)
    }))
}
