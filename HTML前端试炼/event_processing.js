function ticket_buy_page(){
    console.log("点击购票");
    window.location.href="ticketbuypage.html";
}

function log_in(){
    var usr_name=document.getElementById("usrname").value;
    var usr_pswd=document.getElementById("usrpswd").value;
    console.log("点击登录");
    console.log(usr_name,usr_pswd);
}

function register(){
    var usr_name=document.getElementById("usrname").value;
    var usr_pswd=document.getElementById("usrpswd1").value;
    console.log("注册");
    console.log(usr_name,usr_pswd);
    window.location.href="login.html";
}

