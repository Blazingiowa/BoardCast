const socket = io.connect('http://153.122.64.7:3001');

// emailの正規表現
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

var Email;
var emailP
var pass;
var passP
var resultP
var emailflug = false;
var passflug = false;

var senddata;
var QRimg;

socket.on('connect', function () {


    $("#createbtn").click(function () {
        resultP = document.getElementById('helper-resulttext');
        
        if (emailflug == true && passflug == true) {
            Email = $("#newuser").val();
            pass = $("#newpass").val();

            senddata = {
                mail: Email,
                pass: pass,
            };
            socket.emit('SendCreateData', {
                value: senddata
            });

        } else {
            resultP.innerHTML = "Invalid Email or Password";
            resultP.style.color = "red";
        }
    });
    
    socket.on('CreateData',function(getdata){
        QRimg = document.getElementById('QRurl');
        resultP.innerHTML = getdata.value['msg'];
        resultP.style.color = "green";
        
        console.log("QRCODE:" + getdata.value['qrcode']);
        QRimg.innerHTML = '<img src = "' + getdata.value['qrcode'] + '">'; 
        
    });
});

function checkmail() {
    Email = $("#newuser").val();
    emailP = document.getElementById("helper-emailtext");

    if (emailRegex.test(Email) && Email != "") {
        emailflug = true;
        emailP.innerHTML = "Correct!";
        emailP.style.color = "green";

    } else {
        emailflug = false;
        emailP.innerHTML = "Invalid Email format";
        emailP.style.color = "red";
    }

}

function checkpass() {
    pass = $("#newpass").val();
    passP = document.getElementById("helper-passtext");

    if (pass != "") {
        passflug = true;
        passP.innerHTML = "Correct!";
        passP.style.color = "green";

    } else {
        passflug = false;
        passP.innerHTML = "Enter Password";
        passP.style.color = "red";
    }

}
