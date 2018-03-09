var xmlhttp;
var valtozott=false;
var messageoff=false;
function stateChanged()
	{
		if ((xmlhttp.readyState==4)&&(xmlhttp.status==200))
		{	
			online = true;
			switchStates( online );
			if(valtozott==true){
				update_modify();
			}
			if(messageoff==true){
				kuldes1();
			}
			
		}
	}

function requestError()
    {
		online = false;
		switchStates( online );
		
		
	}
function switchStates( state ){
		if(state==true){
			document.getElementById("messageon").innerHTML='<p id="zold">Online</p>';
			//rang(state);
		}
		else if(state==false){
			document.getElementById("messageon").innerHTML='<p id="piros">Offline</p>';
			document.getElementById("login").innerHTML='<h1>Acces denied ,you are  in offline mod !</h1';
			
		}
	}	

function userdata_reciver(){
	if(online==true){
		if(xmlhttp.readyState==4){
			var formData = xmlhttp.responseText;
			var datas = formData.substring(formData.indexOf("'")+1,formData.lastIndexOf("'"));;
			var datas = formData.split("\"");
			
			var temp=datas[11];
			//alert(temp);
			var element = document.getElementById("login");
			element.innerHTML='	<table  align="center" width="70%">'+
					 ' <tr>'+
						 ' <td><label for="issuetype">Issue Type:</label> <br><br></td>'+
							 ' <td><input type="text" id="username" name="username" disabled><br><br></td>'+
					  '  </tr>'+
					  '  <tr>'+
						 ' 	<td><label for="issuename">Issue Name: </label> <br><br></td>'+
						 ' 	<td><input type="text" id="firstname" name="firstname" value="" odisabled><br><br></td>'+
					  '  </tr>'+
					  '  <tr>'+
							 ' <td><label for="sprint">Sprint: </label> <br><br></td>'+
							 ' <td><input type="text" id="lastname" name="lastname" disabled><br><br></td>'+
					   ' </tr>'+
					  '  <tr>'+
							 ' <td><label for="createdby">Created By: </label><br><br></td>'+
							 ' <td><input type="text" id="password" name="password" disabled><br><br></td>'+
					  '  </tr>'+
					  '  <tr>'+
							 ' <td><label for="assignee">Assignee: </label><br><br></td>'+
							 ' <td><input type="text" id="password" name="password" disabled><br><br></td>'+
					  '  </tr>'+
					  '  <tr>'+
							 ' <td><label for="description">Description: </label><br><br></td>'+
							 ' <td><input type="text" id="password" name="password" disabled><br><br></td>'+
					  '  </tr>'+
					  '  <tr>'+
							 ' <td><label for="status">Status: </label><br><br></td>'+
							 ' <td><input type="text" id="password" name="password" disabled><br><br></td>'+
					  '  </tr>'+
					  '  <tr>'+
							 ' <td><label for="tasks">Tasks: </label><br><br></td>'+
							 ' <td><input type="text" id="password" name="password" disabled><br><br></td>'+
					  '  </tr>'
				 ' </table>'
			var username =  getCookie("user");
			document.getElementById("issuetype").value=username;
			
			
		}
	}
}



