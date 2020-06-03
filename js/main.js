$(function () {
    $('#title').textillate({
        loop: true,
        minDisplayTime: 3000,
        initialDelay: 1000,
        autoStart: true,

        in: {
            effect: 'rotateInDownLeft',
            delayScale: 1.5,
            delay: 50,
            sync: false,
            shuffle: false
        },

        out: {
            effect: 'rollOut',
            delayScale: 1.5,
            delay: 50,
            sync: false,
            shuffle: false
        }
    });
    
    var anitime=500;

    $('.names').mouseover(function () {
        $(this).stop(true).animate({
            fontSize: '17px'
        }, anitime);
    });

    $('.names').mouseout(function () {
        $(this).stop(true).animate({
            fontSize:'15px'
        },anitime);
    });
    
    $('.icon-name').mouseover(function(){
        $(this).stop(true).animate({
            
        },anitime);
        });
    });
