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
});


let button = document.getElementsByClassName('compose');

document.addEventListener('click', function() {
    console.log("yaa");
    const mysql = require('mysql');
        const con = mysql.createConnection({
            host: '192.168.10.7',
            user: 'root',
            password: 'ncc_NCC2020',
            database: 'testu22'
            
        });
    
        con.connect();
        let sql1= "insert into memberinfo values('masuda','ohayou2@gmail.com',3345);";
        
        con.query(sql1,(err,rows,fields)=>{
        
            if(err) throw err;
            console.log('userテーブル：',rows);
        
        });
        con.end();
        
});
