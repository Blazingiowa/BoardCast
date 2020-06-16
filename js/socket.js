const socket = io.connect('http://192.168.3.18:3000');
const nowDate = new Date();

var inputMsg;
var year;
var month;
var day;
var dates;

var SendMsg;


socket.on('connect', function () {

    $('#btn').click(function () {
        inputMsg = $('#textchat').val();
        $('#textchat').val("");

        year = nowDate.getFullYear();
        month = nowDate.getMonth() + 1;
        day = nowDate.getDate();
        dates = year + "/" + month + "/" + day;

        SendMsg = {
            msg: inputMsg,
            dates: dates
        };

        socket.emit('c2s_msg', {
            value: SendMsg
        });

    });

    socket.on('s2c_msg', function (GetMsg) {
        //$('#msgView').prepend('<div>' + GetMsg.value['msg'] + "｜" + GetMsg.value['dates'] + '</div>');

        $('.message').append('<div class="chat_card"><img src="ico/inoshishi.png" alt="アイコン" class="user_icon"><div class="chat_area"><div class="user_date"><span class="user_name"></span><span class="chat_time"></span></div><div class="text_area"></div></div></div>');

        $('.user_name').last().text(GetMsg.value['ip']);
        $('.text_area').last().text(GetMsg.value['msg']);
        $('.chat_time').last().text(GetMsg.value['dates']);


    });
});
