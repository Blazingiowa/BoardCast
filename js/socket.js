const socket = io.connect('http://153.122.64.7:3000');
const nowDate = new Date();

var message;
var inputmsg;
var year;
var month;
var day;
var dates;
var sendmsg;
var card;
var card_mok;
var cards_length;

socket.on('connect', function () {

    socket.emit('startup', {
        value: "が接続しました。"
    })
    socket.on('startupchat', function (getmsg) {

        if (getmsg.value.length > 0) {
            for (var i = 0; i < getmsg.value.length; i++) {
                card = $('.chat_card');
                card_mok = $('#chat_card');
                cards_length = card.length;
                card_mok.clone().removeAttr('id').insertAfter($('.chat_card').eq(cards_length - 1));

                $('.user_name').last().text(getmsg.value[i].username);

                message = sanitaize.decode(getmsg.value[i].message);

                $('.text_area').last().text(message);
                $('.chat_time').last().text(getmsg.value[i].dates);
            }
        }
    });

    $('#btn').click(function () {
        inputmsg = $('#textchat').val();
        $('#textchat').val("");

        year = nowDate.getFullYear();
        month = nowDate.getMonth() + 1;
        day = nowDate.getDate();
        dates = year + "/" + month + "/" + day;

        sendmsg = {
            msg: inputmsg,
            dates: dates
        };

        socket.emit('c2s_msg', {
            value: sendmsg
        });

    });

    socket.on('s2c_msg', function (getmsg) {

        card = $('.chat_card');
        card_mok = $('#chat_card');
        cards_length = card.length;
        card_mok.clone().removeAttr('id').insertAfter($('.chat_card').eq(cards_length - 1));


        $('.user_name').last().text(getmsg.value['username']);

        message = sanitaize.decode(getmsg.value['msg']);

        $('.text_area').last().text(message);
        $('.chat_time').last().text(getmsg.value['dates']);
    });

    // Canvas描画に必要な変数を定義する
    var canvas = document.getElementById("wb-myCanvas");
    var c = canvas.getContext("2d");
    var w = 1490;
    var h = 815;
    var drawing = false;
    var oldPos;

    // Canvasを初期化する
    canvas.width = w;
    canvas.height = h;
    c.strokeStyle = "#000000";
    c.lineWidth = 5;
    c.lineJoin = "round";
    c.lineCap = "round";

    // Canvas上の座標を計算する為の関数たち
    function scrollX() {
        return document.documentElement.scrollLeft || document.body.scrollLeft;
    }

    function scrollY() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }

    function getPos(event) {
        var mouseX = event.clientX - $(canvas).position().left + scrollX();
        var mouseY = event.clientY - $(canvas).position().top + scrollY();
        return {
            x: mouseX,
            y: mouseY
        };
    }

    function getPosT(event) {
        var mouseX = event.touches[0].clientX - $(canvas).position().left + scrollX();
        var mouseY = event.touches[0].clientY - $(canvas).position().top + scrollY();
        return {
            x: mouseX,
            y: mouseY
        };
    }

    // ここからは、Canvasに描画する為の処理                             
    canvas.addEventListener("mousedown", function (event) {
        drawing = true;
        oldPos = getPos(event);
    }, false);
    canvas.addEventListener("mouseup", function () {
        drawing = false;
    }, false);
    canvas.addEventListener("mousemove", function (event) {
        var pos = getPos(event);
        if (drawing) {
            c.beginPath();
            c.moveTo(oldPos.x, oldPos.y);
            c.lineTo(pos.x, pos.y);
            c.stroke();
            c.closePath();

            // socket.IOサーバーに、
            // どの点からどの点までを描画するかをの情報を送付する
            socket.emit("draw", {
                before: oldPos,
                after: pos
            });
            oldPos = pos;
        }
    }, false);
    canvas.addEventListener("mouseout", function () {
        drawing = false;
    }, false);

    // 色や太さを選択した場合の処理
    // 選択した結果を、Canvasに設定して、socket.IOサーバーにも送付している 
    $("#wb-allclear").click(function () {
        c.clearRect(0,0,w,h);
        socket.emit("clear", "");
    });
    $("#wb-clear").click(function () {
        c.strokeStyle = "white";
        socket.emit("color", "white");
    });
    $("#wb-black").click(function () {
        c.strokeStyle = "black";
        socket.emit("color", "black");
    });
    $("#wb-blue").click(function () {
        c.strokeStyle = "blue";
        socket.emit("color", "blue");
    });
    $("#wb-red").click(function () {
        c.strokeStyle = "red";
        socket.emit("color", "red");
    });
    $("#wb-green").click(function () {
        c.strokeStyle = "green";
        socket.emit("color", "green");
    });
    $("#wb-small").click(function () {
        c.lineWidth = 5;
        socket.emit("lineWidth", 5);
    });
    $("#wb-middle").click(function () {
        c.lineWidth = 10;
        socket.emit("lineWidth", 10);
    });
    $("#wb-large").click(function () {
        c.lineWidth = 20;
        socket.emit("lineWidth", 20);
    });

    // socket.IOサーバーから描画情報を受け取った場合の処理
    // 受け取った情報を元に、Canvasに描画を行う
    socket.on("draw", function (data) {
        c.beginPath();
        c.moveTo(data.before.x, data.before.y);
        c.lineTo(data.after.x, data.after.y);
        c.stroke();
        c.closePath();
    });

    // socket.IOサーバーから色情報を受け取った場合の処理
    // Canvasに色を設定している
    socket.on("color", function (data) {
        c.strokeStyle = data;
    });


    // socket.IOサーバーから線の太さ情報を受け取った場合の処理
    // Canvasに線の太さを設定している
    socket.on("lineWidth", function (data) {
        c.lineWidth = data;
    });
    
    socket.on("allclear",function(clear){
        c.clearRect(0,0,w,h); 
    });
});

//サニタイジングされた文字列をデコードするためのメソッド
sanitaize = {

    decode: function (str) {
        return str.replace(/&lt;/g, '<').replace(/gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&amp;/g, '&');
    }
}
