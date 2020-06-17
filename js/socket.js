const socket = io.connect('http://192.168.11.39:3000');
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
        var card=$('.chat_card');
        var card_mok=$('#chat_card');
        
        var cards_length=card.length;
        
        card_mok.clone().removeAttr('id').insertAfter($('.chat_card').eq(cards_length-1));


        $('.user_name').last().text(GetMsg.value['ip']);
        $('.text_area').last().text(GetMsg.value['msg']);
        $('.chat_time').last().text(GetMsg.value['dates']);


    });
});
