//最初のページ読み込み処理
$(function () {

    $('.user_name').last().text('waitexi');
    $('.text_area').last().text('メンタルブレイク');

    var dash = $('.dashboard');
    var sideMenubtn = $('#side-menu-btn');
    //body.hide();

    //console.log(body);

    imagesProgress();

    function imagesProgress() {

        var $container = $('#progress'),
            $progressBar = $container.find('.progress-bar'),
            $progressText = $container.find('.progress-text'),

            imgLoad = imagesLoaded('body'),
            imgTotal = imgLoad.images.length,

            imageLoaded = 0,
            current = 0,

            progressTimer = setInterval(updateProgress, 1000 / 60);
        imgLoad.on('progress', function () {
            imageLoaded++;
        });

        function updateProgress() {
            var target = (imageLoaded / imgTotal) * 100;
            current += (target - current) * 0.1;

            $progressBar.css({
                width: current + '%'
            });
            $progressText.text(Math.floor(current) + '%');

            //終了処理
            if (current >= 100) {
                clearInterval(progressTimer);
                $container.addClass('progress-complete');
                $progressBar.add($progressText)
                    .delay(500)
                    .animate({
                        opacity: 0
                    }, 250, function () {
                        $container.animate({
                            top: '-100%'
                        }, 1000);
                    });

                dash.delay(780).queue(function () {
                    dash.css({
                        display: 'flex'
                    });


                });

                sideMenubtn.delay(780).queue(function () {
                    sideMenubtn.css({
                        display: 'flex'
                    });
                });
            }

            if (current > 99.9) {
                current = 100;


            }
        }
    }
});
//メインページのイベントハンドラ
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

    //モーダルウィンドウ
    $('.compose').click(function () {
        $('.js-modal').fadeIn();
        return false;
    });

    $('.js-modal-close').click(function () {
        $('.js-modal').fadeOut();
        return false;
    });
});

//サイドメニュー

$(document).ready(function () {
    $('.drawer').drawer();
});
