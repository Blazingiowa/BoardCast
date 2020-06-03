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

    $('.names').mouseover(function () {
        $(this).animate({
            fontSize: '22px'
        }, 500);
    });

    $('.names').mouseout(function () {
        console.log("kkkkk");
    });
});
