//Install express server
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
//Body Parser required for Angular when sending info w/POST requests.
var bodyParser = require('body-parser');

//ALTER TABLE Enrolled ADD PRIMARY KEY(CourseCode, StudentNo)

var date = new Date();
var lastYear = date.getFullYear() - 1;
var allowedTerms = "W20, S20";

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

//Handles MySQL connections and timeout when it cannot reconnect because of fatal errors.
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

//Makes the MySQL connection.
handleConnection();


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/RAMSS2'));

app.get('/*', function(req,res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.sendFile(path.join(__dirname+'/dist/RAMSS2/index.html'));
});

/*Checks client's LOGIN info to match user and pass on db. Returns info for a cookie.*/
app.post('/loadLogin', function (req, res){
	var query = "SELECT StudentNo from Logins where Username = '"+req.body.username +"' AND Password = '"+req.body.password+"'";
	con.query(query, function(err, result){
		if (err){
			console.log(err);
		}
		else{
			res.send(result)
		}
	});
});

/*GET client's COURSE DATA*/
app.post('/loadCourses', function (headers, res){
	var query = "SELECT * FROM Courses, Enrolled WHERE (Courses.CourseCode = Enrolled.CourseCode AND StudentNo = '5001112222') ORDER BY Term";
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


/*GET USER INFO for client*/
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


/*GET client's ACCOUNT INFO*/
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




/*GET client's TUITION*/
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

/*GET client's ANCILLARY FEES*/
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

//Get client's Payments Made
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

//Get client's Grades
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

//Get client's ongoing document requests from db.
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

//Opts into an ancillary fee, provided the name.
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

//Opts out of an ancillary fee, provided the name.
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

/*Inserts a document request to the db.*/
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

/*Query the db for courses that meet the criteria*/
app.post('/queryCourses', function (req, res){	
	var query = makeQuery(req.body.openyn, req.body.courseNum, req.body.term, req.body.faculty);
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

app.post('/addCourses', function (req, res){
	var cc = req.body.coursecode;
	console.log(cc);
	
	var query = "INSERT INTO Enrolled(CourseCode, StudentNo) VALUES('"+cc+"','5001112222'"+")";
	var query2 = "UPDATE Users SET Fees = Fees + (SELECT Cost FROM Courses WHERE CourseCode = '"+cc+"') WHERE StudentNo = '5001112222'";

	console.log(query);

	con.beginTransaction(function(err) {
		con.query(query, function(err, result){
			if (err){
				console.log(err);
				con.rollback(function() {
					//throw err;
				});
			}			
			con.query(query2, function(err, result){
				if (err){
					console.log(err);
					con.rollback(function() {
						//throw err;
					});
				}
				con.commit(function(err) {
					if (err) { 
					  console.log(err);
					  con.rollback(function() {
						//throw err;
					  });
					}
					console.log('success!');
					res.send("success");
				});
			});
		});
	});
});

app.post('/dropCourses', function (req, res){
	var cc = req.body.coursecode;
	console.log(cc);
	
	var query = "DELETE FROM Enrolled WHERE CourseCode = '"+cc+"' AND StudentNo = '5001112222'";
	var query2 = "UPDATE Users SET Fees = Fees - (SELECT Cost FROM Courses WHERE CourseCode = '"+cc+"') WHERE StudentNo = '5001112222'";

	console.log(query);

	con.beginTransaction(function(err) {
		con.query(query, function(err, result){
			if (err || result.affectedRows == 0){
				console.log(err);
				con.rollback(function() {
					//throw err;
				});
			}
			else{
			console.log(result.affectedRows);
			con.query(query2, function(err, result){
				if (err){
					console.log(err);
					con.rollback(function() {
						//throw err;
					});
				}
				con.commit(function(err) {
					if (err) { 
					  console.log(err);
					  con.rollback(function() {
						//throw err;
					  });
					}
					console.log('success!');
					res.send("success");
				});
			});
			}
		});
	});
});




//Make the query with client selected options.
function makeQuery(openyn, courseNum, term, faculty){
	if (openyn == true && courseNum != ""){
		var query = "SELECT * FROM Courses, CourseAvailability WHERE Courses.CourseCode = CourseAvailability.CourseCode\
		AND Courses.CourseCode = '"+faculty+courseNum+"' AND CourseAvailability.SeatsOpen > SeatsTaken\
		AND Term = '"+term+"'";
		return query;
	}
	else if(openyn == false && courseNum != ""){
		var query = "SELECT * FROM Courses, CourseAvailability WHERE Courses.CourseCode = CourseAvailability.CourseCode\
		AND Courses.CourseCode = '"+faculty+courseNum+"' AND Term = '"+term+"'";
		return query;
	}
	else if(openyn == true && courseNum == ""){
		var query = "SELECT * FROM Courses, CourseAvailability WHERE Courses.CourseCode = CourseAvailability.CourseCode\
		AND Courses.Faculty ='"+faculty+"' AND CourseAvailability.SeatsOpen > SeatsTaken\
		AND Term = '"+term+"'";
		return query;
	}
	else{
		var query = "SELECT * FROM Courses, CourseAvailability WHERE Courses.CourseCode = CourseAvailability.CourseCode\
		AND Courses.Faculty = '"+faculty+"' AND Term = '"+term+"'";
		return query;
	}
}


app.post('/getTerms', function (req, res){
	res.send(allowedTerms);
});


// Start the app by listening on the default Heroku port
var server = app.listen(process.env.PORT || 8080, function () {
    console.log('Node server is running at localhost:8080 (THIS IS NOT MYSQL, KEEP WAITING)');
});