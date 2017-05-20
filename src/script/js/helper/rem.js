(function() {
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
}());

setRootFontSize();

function setRootFontSize() {
    var html = document.documentElement;
    var fontSize = html.clientWidth / 7.5;
    html.style.fontSize = fontSize + 'px';
}

// 测试时使用，上线可删除，非自适应(只支持手机端)
window.addEventListener('resize', function() {
    setTimeout(function() {
        setRootFontSize();
    }, 1000);
}, false);

