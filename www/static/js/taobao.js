var buy = document.getElementById("J_LinkBuy");
setInterval(function() {
    var time = new Date();
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();
    if (m == 0) {
        buy.click();
    }
    console.log(s);
}, 10);