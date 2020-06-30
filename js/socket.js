const socket = io.connect('http://192.168.3.18:3000');
const nowDate = new Date();

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
    
    socket.emit('startup',{value:"が接続しました。"})
    socket.on('startupchat',function(getmsg){

        for(var i = 0;i < getmsg.value.length;i++){
            card = $('.chat_card');
            card_mok = $('#chat_card');
            cards_length = card.length;
            card_mok.clone().removeAttr('id').insertAfter($('.chat_card').eq(cards_length - 1));

            $('.user_name').last().text(getmsg.value[i].username);
            $('.text_area').last().text(getmsg.value[i].message);
            $('.chat_time').last().text(getmsg.value[i].dates); 
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
        $('.text_area').last().text(getmsg.value['msg']);
        $('.chat_time').last().text(getmsg.value['dates']);
    });
    
});
