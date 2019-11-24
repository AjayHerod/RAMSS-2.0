//Install express server
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();

//Database Connections
var con = mysql.createConnection({
  host: "db4free.net",
  user: "cps731db",
  password: "3982344734",
  database: "cps731db",
  port: "3306"
});

//Handles MySQL connections and timeout which cant reconnect cause fatal error.
function handleConnection(){
	console.log("Connecting to MySQL..");
	con.connect(function(err) {
	if (err) {
		console.log(err);
		setTimeout(handleConnection,10000);
	}
	else{
		console.log("Connected!");
	}
	});
	
	con.on('error', function onError(err){
	   if (err.code == 'PROTOCOL_CONNECTION_LOST') {  
            handleConnection();                     
	   } else {                                       
			console.log(err);
	   }
	});
}

handleConnection();


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/RAMSS2'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/RAMSS2/index.html'));
});


app.post('/loadAccount', function (headers, res){
	console.log("balance found");
	var getAccQuery = "SELECT Balance FROM Users WHERE StudentNo = '5001112222'";
	con.query(getAccQuery, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			console.log(result[0]);
			res.send((result[0].Balance).toString());
		}
	});
});


// Start the app by listening on the default Heroku port
var server = app.listen(process.env.PORT || 8080, function () {
    console.log('Node server is running..');
});