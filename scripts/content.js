var online=false;
function checkOnline(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=stateChanged;
	xmlhttp.onerror=requestError;
	xmlhttp.open("GET","http://localhost:7890/alive",true);
	xmlhttp.send(null);
	}


function nev(){
		var username =  getCookie("user");
		rang(username);
		
		if(typeof username != 'undefined' && username != "") {
			var element = document.getElementById("labelname");
			element.insertAdjacentHTML('afterend',username);
			return false;
		}else
		{
			window.location.href = "http://localhost:7890/html/login.html";	
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


function userdata(){
	if(online==true){
		var username = getCookie("user");
		var formData = new FormData();
		formData.append("datas", username);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=userdata_reciver;
		xmlhttp.open("POST","http://localhost:7890/userdata_rec",true);
		xmlhttp.send(formData);
	}
	else {
		userdata_reciver();
	}
}

function commentdata(){
	if(online==true){
		var username = getCookie("user");
		var formData = new FormData();
		formData.append("datas", username);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=userdata_reciver;
		xmlhttp.open("POST","http://localhost:7890/commentdata_rec",true);
		xmlhttp.send(formData);
	}
	else {
		commentdata_reciever();
	}
}

