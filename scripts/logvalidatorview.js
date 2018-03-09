 function login_reciver() {
	if(xmlhttp.readyState==4){
		var succes = xmlhttp.responseText;
		//alert(succes);
		if(succes != "false") {
			//document.cookie = "username=" + succes;
			window.location.href = "/content";
		}
		else {
			var element = document.getElementById("error");
			if (typeof(errorM0) != 'undefined' && errorM0 != null)
				{
				  errorM0.remove();
				}
			element.insertAdjacentHTML('afterend','<span id="errorM0" style="color:red"> "Invalid Username or Password!"</span>');
		}
	}
}
function toreg(){
	window.location.href = "http://localhost:7890/toRegister";
}

function log(){
	var username = document.cookie;
	//alert(username);
	username = getCookie("user");
	//alert(username);
	if(typeof username != 'undefined' && username != "") {
		window.location.href = "http://localhost:7890/content";
	}
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}