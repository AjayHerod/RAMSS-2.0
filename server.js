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
	console.log("Connecting to MySQL.. Please wait for connection response..");
	con.connect(function(err) {
	if (err) {
		console.log(err);
		setTimeout(handleConnection,10000);
	}
	else{
		console.log("Connected to MySQL!");
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
	var query = "SELECT Balance, Fees FROM Users WHERE StudentNo = '5001112222'";
	con.query(query, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			//console.log(result);
			var balance = result[0].Balance;
			var fees = result[0].Fees;
			var owing = parseInt(balance) - parseInt(fees);
			res.send([result, owing]);
		}
	});
});

app.post('/loadTuition', function (headers, res){
	var query = "Select Grants, RSU, RAC, Printing, Health from Tuition WHERE StudentNo = '5001112222'";
	con.query(query, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			//console.log(result);
			var rsu = result[0].RSU;
			var rac = result[0].RAC;
			var printing = result[0].Printing;
			var health = result[0].Health;
			var comFees = rsu + rac + printing + health;
			res.send([result, comFees]);
		}
	});
});

app.post('/loadAncFees', function (headers, res){
	var query = "SELECT * FROM AncFees WHERE StudentNo = '5001112222'";
	var query2 = "SELECT * FROM AncFeesDesc";
	con.query(query, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			console.log(result);
			con.query(query2, function(err, result2){
				if (err){
					console.log(err);
				}
				else{
					console.log(result2);
					res.send([result, result2]);
				}
			});
			
		}
	});
});



// Start the app by listening on the default Heroku port
var server = app.listen(process.env.PORT || 8080, function () {
    console.log('Node server is running at localhost:8080');
});