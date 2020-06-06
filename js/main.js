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

    var anitime = 500;

    $('.names').mouseover(function () {
        $(this).stop(true).animate({
            fontSize: '17px'
        }, anitime);
    });

    $('.names').mouseout(function () {
        $(this).stop(true).animate({
            fontSize: '15px'
        }, anitime);
    });

    $('.icon-name').mouseover(function () {

        //console.log($(this).prev());

        var images_ico = $(this).prev();
        var texts = $(this).children();

        $(this).stop(true).animate({
            backgroundColor: '#ae5e9b',
            color: '#ffffff'
        }, anitime);

        images_ico.rotate({
            animateTo: 360
        });
    });

    $('.icon-name').mouseout(function () {

        var images_ico = $(this).prev();

        $(this).stop(true).animate({
            backgroundColor: '#ffffff',
            color: '#333631'
        }, anitime);

        images_ico.rotate({
            animateTo: 0
        });
    });
});
