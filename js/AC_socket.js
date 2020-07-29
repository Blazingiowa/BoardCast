const socket = io.connect('http://153.122.64.7:3001');

// emailの正規表現
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

var email;
var emailP;
var pass;
var passP;
var resultP;
var emailflug = false;
var passflug = false;

var ACemail;
var ACemailP;
var ACpass;
var ACpassP;
var ACresultP;
var ACemailflug = false;
var ACpassflug = false;
var ACcodeflug = false;

var senddata;
var QRimg;

socket.on('connect', function () {

    $("#createbtn").click(function () {
        resultP = document.getElementById('helper-resulttext');
        
        if (emailflug == true && passflug == true) {
            email = $("#newuser").val();
            pass = $("#newpass").val();

            senddata = {
                mail: email,
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
    
    socket.on('ErrorCreate',function(getdata){
        console.log("msg:" + getdata.value);
        resultP.innerHTML = getdata.value;
        resultP.style.color = 'red';
    });
    
    $("#ACbtn").click(function(){
       ACresultP = document.getElementById('AC-resulttext');
        if((ACemailflug == true) && (ACpassflug == true) && (ACcodeflug == true)){
            ACemail = $("#ACuser").val();
            ACpass = $("#ACpass").val();
            ACcode = $("#ACcode").val();
            senddata = {
                mail:ACemail,
                pass:ACpass,
                code:ACcode,
            };
            socket.emit('Authentication',{value:senddata});
        }
        else{
            ACresultP.innerHTML = "Invalid Email or Password or Authentication Code";
            ACresultP.style.color = "red";
        }
    });
    
    socket.on('SuccessAC',function(getdata){
        
        console.log("msg:" + getdata.value);
        ACresultP.innerHTML = getdata.value;
        ACresultP.style.color = 'green';
        
    });
    
    socket.on('ErrorAC',function(getdata){
        
        console.log("msg:" + getdata.value);
        ACresultP.innerHTML = getdata.value;
        ACresultP.style.color = 'red';
    });
    
    
});



function checkmail() {
    email = $("#newuser").val();
    emailP = document.getElementById("helper-emailtext");

    if (emailRegex.test(email) && email != "") {
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

function ACcheckmail() {
    ACemail = $("#ACuser").val();
    ACemailP = document.getElementById("AC-emailtext");

    if (emailRegex.test(ACemail) && ACemail != "") {
        ACemailflug = true;
        ACemailP.innerHTML = "Correct!";
        ACemailP.style.color = "green";

    } else {
        ACemailflug = false;
        ACemailP.innerHTML = "Invalid Email format";
        ACemailP.style.color = "red";
    }

}

function ACcheckpass() {
    ACpass = $("#ACpass").val();
    ACpassP = document.getElementById("AC-passtext");

    if (ACpass != "") {
        ACpassflug = true;
        ACpassP.innerHTML = "Correct!";
        ACpassP.style.color = "green";

    } else {
        ACpassflug = false;
        ACpassP.innerHTML = "Enter Password";
        ACpassP.style.color = "red";
    }

}

function ACcheckcode() {
    ACcode = $("#ACcode").val();
    ACcodeP = document.getElementById("AC-codetext");
    console.log(ACcode.length);

    if ((ACcode.match(/[0-9]/g)) && (ACcode.length == 6) &&(ACcode != "")) {
        ACcodeflug = true;
        ACcodeP.innerHTML = "Correct!";
        ACcodeP.style.color = "green";

    } else {
        ACcodeflug = false;
        ACcodeP.innerHTML = "Enter the Correct Verification Code";
        ACcodeP.style.color = "red";
    }

}
