var xmlhttp;
function login_click() {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var st=username+"/"+password+"/";
	var formData = new FormData();
	formData.append("datas", st);
	//alert(username);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=login_reciver;
	xmlhttp.open("POST","http://localhost:7890/login",true);
	xmlhttp.send(formData);
	//alert(useername);
}

