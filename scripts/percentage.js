document.addEventListener("DOMContentLoaded",
    function discount(){
        var p = document.getElementById("price").textContent;
        var p1 = document.getElementById("price1").textContent;
        var p2 = document.getElementById("price2").textContent;
        var p3 = document.getElementById("price3").textContent;
        var p4 = document.getElementById("price4").textContent;
                                    
        p = p.replace(/₦|\u20A6|\s|,/g,"");
        p1 = p1.replace(/₦|\u20A6|\s|,/g,"");
        p2 = p2.replace(/₦|\u20A6|\s|,/g,"");
        p3 = p3.replace(/₦|\u20A6|\s|,/g,"");
        p4 = p4.replace(/₦|\u20A6|\s|,/g,"");
            
        p = parseFloat(p);
        p1 = parseFloat(p1);
        p2 = parseFloat(p2);
        p3 = parseFloat(p3);
        p4 = parseFloat(p4);


        let price = 0.9 * p;
        let price1 = 0.9 * p1;
        let price2 = 0.9 * p2;
        let price3 = 0.9 * p3;
        let price4 = 0.9 * p4;     
           
        document.getElementById("new_price").textContent = document.getElementById("new_price").textContent + price.toLocaleString() + ".00";
        document.getElementById("new_price1").textContent = document.getElementById("new_price1").textContent + price1.toLocaleString() + ".00";
        document.getElementById("new_price2").textContent = document.getElementById("new_price2").textContent + price2.toLocaleString() + ".00";
        document.getElementById("new_price3").textContent = document.getElementById("new_price3").textContent + price3.toLocaleString() + ".00";
        document.getElementById("new_price4").textContent = document.getElementById("new_price4").textContent + price4.toLocaleString() + ".00";
    });