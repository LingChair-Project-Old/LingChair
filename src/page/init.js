;(function () {
    if (!/dev/.test(window.location) && localStorage.getItem('dev') != 'true') {
        document.write('<script crossorigin src="' + 'https://unpkg.com/react@18/umd/react.production.min.js"></script>')
        document.write('<script crossorigin src="' + 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>')
        return
    }
    document.write('<scr' + 'ipt src="' + './static/eruda.min.js' + '"></scr' + 'ipt>');
    document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
    document.write('<scr' + 'ipt crossorigin src="' + 'https://unpkg.com/react@18/umd/react.development.js"></script>')
    document.write('<scr' + 'ipt crossorigin src="' + 'https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>')
})();