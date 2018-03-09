var xmlhttp;
function addcomment(){
		checkOnline();
		document.getElementById("login").innerHTML='<div id="addcommentdiv"><form id="addbook" name="urlap" action="/addcomment" method="post">'+
				'<table id="addcommenttable">'+
				 ' <tr>'+
						'<td><label for="ctitle">Comment:</label> <br><br></td>'+
						'<td><input type="text" id="ctitle" name="ctitle" onchange="fill()"><br><br></td>'+
				'  </tr>'+
				 
				 
				'  <tr>'+
						'<td><input type="submit" id="submitcomment" value="Add" disabled></td>'+
   				'  </tr>'+
			'</table>'+	
			'</div>'+
			'</form>';
}
function fill(){
	document.getElementById("submitcomment").disabled=false;
	if(document.getElementById("ctitle").value==''){
		document.getElementById("submitcomment").disabled=false;
	}
}

function addissue(){
	checkOnline();
		document.getElementById("login").innerHTML='<div id="addissuediv"><form id="addissue" name="urlap2" action="/addissue" method="post">'+
				'<table id="addissuetable">'+
				 ' <tr>'+
						'<td><label for="type">Issue Type:</label> <br><br></td>'+
						'<td><input type="radio" id="issuetype" name="type" value="bug" onchange="fill2()" selected>Bug<br><br></td>'+
						'<td><input type="radio" id="issuetype" name="type" value="feature" onchange="fill2()">Feature<br><br></td>'+
						'<td><input type="radio" id="issuetype" name="type" value="task" onchange="fill2()">Task<br><br></td>'+
				'  </tr>'+
				'  <tr>'+
						'<td><label for="iname">Issue Name: </label> <br><br></td>'+
						'<td><input type="text" id="iname" name="iname" onchange="fill2()"><br><br></td>'+
				 ' </tr>'+
				 '  <tr>'+
						'<td><label for="sprint">SprintID: </label> <br><br></td>'+
						'<td><input type="number" id="sprint" name="sprint" onchange="fill2()"><br><br></td>'+
				 ' </tr>'+
				 '  <tr>'+
						'<td><label for="assignee">Assignee: </label> <br><br></td>'+
						'<td><input type="text" id="assignee" name="assignee" onchange="fill2()"><br><br></td>'+
				 ' </tr>'+
				 '  <tr>'+
						'<td><label for="description">Issue Description: </label> <br><br></td>'+
						'<td><input type="text" id="description" name="description" onchange="fill2()"><br><br></td>'+
				 ' </tr>'+
				 '  <tr>'+
						'<td><label for="status">Status: </label> <br><br></td>'+
						'<td><input type="text" id="status" name="status" value="New" disabled><br><br></td>'+
				 ' </tr>'+
				 
				 
				'  <tr>'+
						'<td><input type="submit" id="submitissue" value="AddIssue" disabled></td>'+
   				'  </tr>'+
			'</table>'+	
			'</div>'+
			'</form>';
	
}

function fill2(){
	document.getElementById("submitissue").disabled=false;
	if(document.getElementById("type").value==''){
		document.getElementById("submitissue").disabled=true;
	}
	if(document.getElementById("iname").value==''){
		document.getElementById("submitissue").disabled=true;
	}
	if(document.getElementById("sprint").value==''){
		document.getElementById("submitissue").disabled=true;
	}
	if(document.getElementById("assignee").value==''){
		document.getElementById("submitissue").disabled=true;
	}
	if(document.getElementById("description").value==''){
		document.getElementById("submitissue").disabled=true;
	}
}

