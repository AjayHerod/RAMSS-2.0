//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/RAMSS2'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/RAMSS2/index.html'));
});


app.post('/loadAccount', function (headers, res){
	console.log("balance found");
	res.send("1000");
});


// Start the app by listening on the default Heroku port
var server = app.listen(process.env.PORT || 8080, function () {
    console.log('Node server is running..');
});