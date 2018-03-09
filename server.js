var http = require('http');
var express = require('express');
var app = express();
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var fs2 = require('fs');
var Regex = require('regex');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var crypto = require('crypto');
var sql = require('mssql');

var config = {
    user: 'sa',
    password: 'toshibal300',
    server: 'localhost',
    database: 'jsproject',
 
    options: {
        encrypt: true
    }
}


var server = http.createServer(app);
app.use(cookieParser());      
app.get("/alive",function( request, response ){

	response.send("YES!");

});


app.get('/',function( request, response) {
	var username = request.cookies['user'];
	if(typeof username != 'undefined' && username != "") {
		response.redirect("/content");
	}else{
		response.redirect("/login");
	}
});
app.get('/content',function( request, response) {
		response.redirect("/html/content.html");
});

app.get('/login',function( request, response) {
		response.redirect("/html/login.html");
});

	
app.post('/login', function (request, response) {
	console.log(request.cookies['username']);
	var form = new formidable.IncomingForm();
	form.parse(request, function( err, fields, files ) {					
		var formData = util.inspect(fields);
		var datas = formData.substring(formData.indexOf("'")+1,formData.lastIndexOf("'"));;
		var formDataArray = datas.split("/");
			var username =formDataArray[0];
			console.log(formDataArray[0]);
			var password = formDataArray[1];
			password=crypto.createHash('md5').update(password).digest("hex");
			console.log(formDataArray[1]);
			sql.connect(config).then(function() {
				var sqlRequest = new sql.Request();
				sqlRequest.input('username', sql.VarChar(50), username);
				sqlRequest.input('password', sql.VarChar(50), password);
				sqlRequest.query('SELECT * FROM users WHERE username = @username AND password = @password').then(function(recordset) {
					if(recordset.length != 0) {
					console.log(recordset);
						// Sikeres bejelentkezés
						//response.setHeader('Set-Cookie','username=' + fields["username"]);
						
					response.cookie('user',username,{ path: '/' });
					response.send(username);
					}
					else {
						// Helytelen felhasználónév
						response.send("false");
					}
					sql.close();
				}).catch(function(err) {
					response.sendStatus(500);
					console.log(err);
				});
			}).catch(function(err) {
				response.sendStatus(500);
				console.log(err);
			});
		});
});




app.post('/addcomment', function( request, response ){
		var form = new formidable.IncomingForm();
		form.encoding = 'utf-8';
		form.parse(request, function (err, fields, files) {
            if (err) {
				console.error(err.message);
			}
			//response.redirect("/html/content.html");
			sql.connect(config).then(function() {
				console.log("ok comment")
				
				var username = request.cookies['user'];
				
				var table = new sql.Table('commentss');
				table.create = true;
				
				table.columns.add('CommentBy', sql.VarChar(30), {nullable:false});
				table.columns.add('comment', sql.VarChar(50), {nullable: false});
				
				
				table.rows.add(username,fields['ctitle']);
				
				var update = new sql.Request();
				update.bulk(table, function(err, rowCount) {	
					response.redirect("/");
				});
			}).catch(function(err) {
				console.log(err);
			});
        });
});

app.post('/addissue', function( request, response ){
		var form = new formidable.IncomingForm();
		form.encoding = 'utf-8';
		form.parse(request, function (err, fields, files) {
            if (err) {
				console.error(err.message);
			}
			//response.redirect("/html/content.html");
			sql.connect(config).then(function() {
				console.log("ok issue")
				
				var username = request.cookies['user'];
				var d = new Date();
				var n = d.getDate();

				var table = new sql.Table('issues');
				table.create = true;
				
				table.columns.add('issueType', sql.VarChar(30));
				table.columns.add('issueName', sql.VarChar(30));
				table.columns.add('issueSprint', sql.INT);
				table.columns.add('createdBy', sql.VarChar(30));
				table.columns.add('assignee', sql.VarChar(30));
				table.columns.add('description', sql.VarChar(50));
				table.columns.add('status', sql.VarChar(30));
				table.columns.add('tasks', sql.VarChar(30));
				table.columns.add('createdAt', sql.VarChar(30));
				
				
				table.rows.add(fields['type'],fields['iname'],fields['sprint'],username,fields['assignee'],fields['description'],'New',n);
				
				
				var update = new sql.Request();
				update.bulk(table, function(err, rowCount) {	
					response.redirect("/");
				});
			}).catch(function(err) {
				console.log(err);
			});
        });
});

app.post('/userdata_rec', function (request, response) {
	//console.log(request.cookies['username']);
	var form = new formidable.IncomingForm();
	form.parse(request, function( err, fields, files ) {					
		var formData = util.inspect(fields);
		var datas = formData.substring(formData.indexOf("'"),formData.lastIndexOf("'"));;
			
			var formDataArray = datas.split("/");
			
			sql.connect(config).then(function() {
				var sqlRequest = new sql.Request();
				
				sqlRequest.query('SELECT * FROM issues').then(function(recordset) {
						console.log(recordset);
						response.send(recordset);
						
						
				}).catch(function(err) {
					response.sendStatus(500);
					console.log(err);
				});
			}).catch(function(err) {
				response.sendStatus(500);
				console.log(err);
			});
		});
});

app.post('/commentdata_rec', function (request, response) {
	//console.log(request.cookies['username']);
	var form = new formidable.IncomingForm();
	form.parse(request, function( err, fields, files ) {					
		var formData = util.inspect(fields);
		var datas = formData.substring(formData.indexOf("'"),formData.lastIndexOf("'"));;
			
			var formDataArray = datas.split("/");
			
			sql.connect(config).then(function() {
				var sqlRequest = new sql.Request();
				
				sqlRequest.query('SELECT * FROM commentss').then(function(recordset) {
						console.log(recordset);
						response.send(recordset);
						
						
				}).catch(function(err) {
					response.sendStatus(500);
					console.log(err);
				});
			}).catch(function(err) {
				response.sendStatus(500);
				console.log(err);
			});
		});
});

app.post('/logout', function( request, response ){
	response.clearCookie('user',{ path: '/' } );
	response.clearCookie('user',{ path: '/html/register.html' } );
	response.clearCookie('user',{ path: '/html/content.html' } );
	response.clearCookie('user',{ path: '/html/login.html' } );
	console.log("logged out");
	response.redirect("/login");

});

app.use(express.static(__dirname));

server.listen(7890);