function loginMessage(){
    window.alert("You need be logged in to view this product!");
}

function getEmailAddress(){
    var mail = document.getElementById("text").value;
    var gmail = "@gmail.com";
    var outlook = "@outlook.com";
    var yahoo = "@yahoo.com";
    if(mail === ""){
        window.alert("Please provide an email address!");
    }else{
        if(mail.includes(gmail) || mail.includes(outlook) || mail.includes(yahoo)){
            window.alert("You have successfully subscribed to ShutterNG's newsletter. You will receive an email soon.");
        }else{
            window.alert("Please provide a valid email address!");
        }
    }
    document.getElementById("text").value = "";
}