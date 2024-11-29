; (() => {
    let dataIsEmpty = !localStorage.lingchair_data || localStorage.lingchair_data == ''

    const aes = {
        enc: (m, k) => CryptoJS.AES.encrypt(m, k).toString(),
        dec: (m, k) => CryptoJS.AES.decrypt(m, k).toString(CryptoJS.enc.Utf8),
    }

    let key = location.href + '_LingChair_满月姐姐'

    if (dataIsEmpty) localStorage.lingchair_data = aes.enc('{}', key)

    let _dec = aes.dec(localStorage.lingchair_data, key)
    if (_dec == '') _dec = '{}'

    const _data_cached = JSON.parse(_dec)

    /**
     * @type { { server_list: [], current_server: "", close_guide: false, current_user: '', current_token: '', newer_token: '' } }
     */
    window.data = new Proxy({}, {
        get: (obj, k) => {
            return _data_cached[k]
        },
        set: (obj, k, v) => {
            _data_cached[k] = v
            localStorage.lingchair_data = aes.enc(JSON.stringify(_data_cached), key)
        },
    })
})()


