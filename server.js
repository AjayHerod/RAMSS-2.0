//Install express server
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');

var date = new Date();
var lastYear = date.getFullYear() - 1;


//Database Connections
var con = mysql.createConnection({
  host: "db4free.net",
  user: "cps731db",
  password: "3982344734",
  database: "cps731db",
  port: "3306"
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.sendFile(path.join(__dirname+'/dist/RAMSS2/index.html'));
});

/*GET COURSE DATA*/
app.post('/loadCourses', function (headers, res){
	var query = "SELECT * FROM Courses, Enrolled WHERE (Courses.CourseCode = Enrolled.CourseCode AND StudentNo = '5001112222')";
	con.query(query, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			//console.log(result);
			res.send(result)
		}
	});
});

/*GET USER INFO*/
app.post('/loadUser', function (headers, res){
	var query = "SELECT * FROM Users WHERE StudentNo = '5001112222'";
	con.query(query, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			res.send(result);
		}
	});
});


/*GET ACCOUNT INFO*/
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

/*GET TUITION*/
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

/*GET ANCILLARY FEES*/
app.post('/loadAncFees', function (headers, res){
	var query = "SELECT * FROM AncFees WHERE StudentNo = '5001112222'";
	var query2 = "SELECT * FROM AncFeesDesc";
	con.query(query, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			//console.log(result);
			con.query(query2, function(err, result2){
				if (err){
					console.log(err);
				}
				else{
					//console.log(result2);
					res.send([result, result2]);
				}
			});
			
		}
	});
});

//Get Payments Made
app.post('/loadPaymentsMade', function (headers, res){
	var query = "SELECT * FROM PaymentsMade WHERE StudentNo = '5001112222'";
	con.query(query, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			res.send(result);
		}
	});
});

//Get Grades
app.post('/loadGrades', function (headers, res){
	var query = "SELECT * FROM Grades WHERE StudentNo = '5001112222' ORDER BY Year DESC";
	con.query(query, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			res.send(result);
		}
	});
});

//Get Requests
app.post('/loadRequests', function (headers, res){
	var query = "SELECT * FROM Requests WHERE StudentNo = '5001112222' ORDER BY Date DESC";
	con.query(query, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			//console.log(result);
			res.send(result);
		}
	});
});


/*ACCOUNT MANAGEMENT FUNCTIONS*/
app.post('/OptIn', function (req, res){
	var query = "UPDATE AncFees SET "+req.body.name+"= 1 WHERE StudentNo = '5001112222'";
	con.query(query, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			var query2 = "UPDATE Users SET Fees = Fees + (SELECT Cost from AncFeesDesc WHERE AncFee = '"+req.body.name+"') WHERE StudentNo = '5001112222'"; 
			con.query(query2, function(err, result){
				if (err){
					console.log(err);
				}
				else{
					res.send("done");
				}
			});
			
		}
	});
});


app.post('/OptOut', function (req, res){
	var query = "UPDATE AncFees SET "+req.body.name+"= 0 WHERE StudentNo = '5001112222'";
	con.query(query, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			var query2 = "UPDATE Users SET Fees = Fees - (SELECT Cost from AncFeesDesc WHERE AncFee = '"+req.body.name+"') WHERE StudentNo = '5001112222'"; 
			con.query(query2, function(err, result){
				if (err){
					console.log(err);
				}
				else{			
					res.send("done");
				}
			});

		}
	});
});

/*Requests*/
app.post('/Request', function (req, res){
	dateString = date.getFullYear() +"/"+(parseInt(date.getMonth())+1).toString()+"/"+date.getDate();
	var query = "INSERT INTO Requests (StudentNo, Type, Date, Status) VALUES('5001112222', '"+req.body.type+"','"+dateString+"','Pending')";
	con.query(query, function(err, result){
		if (err){
			//console.log(err);
			res.send("failure");
		}
		else{
			//console.log(result);
			res.send("succeed");
		}
	});
});



// Start the app by listening on the default Heroku port
var server = app.listen(process.env.PORT || 8080, function () {
    console.log('Node server is running at localhost:8080 (THIS IS NOT MYSQL, KEEP WAITING)');
	//console.log(lastYear);
});