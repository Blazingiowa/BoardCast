//最初のページ読み込み処理
$(function () {

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

<<<<<<< HEAD
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
=======
  
    $('.card').click(function() {
        var id = $(this).attr('id');
        var str = $('#' + id).find('.channel_name').text();
        $('.big-inbox').text('#' + str);
    });

    //
    $('#create_chat').click(function() {
        
        $(this).blur() ;	//ボタンからフォーカスを外す
        //if($('#modal-overlay')[0]) return false ;		//新しくモーダルウィンドウを起動しない [下とどちらか選択]
        //if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する [上とどちらか選択]

        //オーバーレイ用のHTMLコードを、[body]内の最後に生成する
        //$('body').append('<div id="modal-overlay"></div>');


        //$('#modal-overlay').show();
        //[$modal-overlay]をフェードインさせる
        $('#modal-overlay').fadeIn('fast');
        $("#modal-overlay").css('display', 'flex');
        
    });
    
    $('#modal-overlay').click(function()
    {
        console.log(event.target.className);

        if(event.target.id == 'modal-overlay' || event.target.id == 'bt_cancel')
        {
            //フェードアウト
            $('#modal-overlay').fadeOut('fast',function() {
                $('#required_name').css('visibility','hidden');
            });
        }

    });

   $('#bt_create').click(function() {
       //チャンネル名を取得
       var channel_name = $('#channel_name').val();
       //チャンネル名が空だったら警告を表示
       if(channel_name == '' || channel_name == null)
       {
            $('#required_name').css('visibility','visible');
            return false;
       }
       
       //最後の要素を取得
       const lastRoom = $('.last_room');
       //htmlを挿入
       var newCard = '<div class="card last_room"><div class="mails"><span class="person border2">W</span><div class="mail-names">テスト</div></div><div class="mail-info" ><span class="channel_name">わいてぃのチャットルーム</span></div><div></div><div class="bottom-info"><div class="check1"><label class="checkbox"><input type="checkbox" /></label><div class="star"><img src="https://i.ibb.co/SN5SJ8x/star.png" /></div><div class="star"><img src="https://i.ibb.co/FW9tsHK/attachment.png" /></div></div><div class="date">8:30 AM</div></div></div>';
       $('.last_room').after(newCard);

       //もとのラストルームclassを削除
       lastRoom.removeClass('last_room');

       //部屋名を変更
       $('.last_room').find('.channel_name').text(channel_name);

       //フェードアウト
       $('#modal-overlay').fadeOut('fast',function()
       {
           $('#required_name').css('visibility','hidden');
           //テキストエリアを空に
           $('#channel_name').val('');
       });
   });

    
 

    //自分の音声
    const localAudio = $('#local_audio');

    //ボイスチャットルームを押したとき
    $('#v_room').click(async function (){

        

        //自分の音声のみをlocalStreamに代入
        const localStream = await navigator.mediaDevices
        .getUserMedia({
        audio: true,
        video: false,
        })
        .catch(console.error);

        

        //
        localAudio.muted = true;
        localAudio.srcObject = localStream;
        localAudio.playsInline = true;
        //await
        localAudio.get(0).play().catch(console.error); 

        

        //Peer作成
        //シグナリンサーバへ接続
        const peer = new Peer
        ({
            key: '66b26037-ac91-4937-b106-1c25749dfc74',
            debug: 3
        });

        //PeerID取得
        peer.on('open', () =>
        {
            //ルーム接続
            //部屋に接続するメソッド（joinRoom）
            const room = peer.joinRoom('waithi', 
                {
                    mode: 'sfu',
                    stream: localStream,
                    //音声だけ受信
                    audioReceiveEnabled: true
                });

            //部屋に接続できた時コンソールに表示
            room.once('open', () => 
            {
                console.log('入室した');
            });

            const remoteAudio = $('#remote_audio');
            
             //streamの内容に変更があった時audioタグを作って流す
            room.on('stream', async stream => {
                const newAudio = document.createElement('audio');
                newAudio.srcObject = stream;
                newAudio.playsInline = true;
                //誰かが退出した時どの人が退出したかわかるように、data-peer-idを付与
                newAudio.setAttribute('data_peerId', stream.peerId);
                remoteAudio.append(newAudio);
                await newAudio.play().catch(console.error);
            });
        });
    });

    

    
>>>>>>> 374821c1fc9a70c3abca1dd7952a7aa109da1029
});
