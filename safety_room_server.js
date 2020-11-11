var express = require('express');
var app = express();
fs = require('fs');

mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'mypassword',
    database: 'mydb'
})
connection.connect();

app.get ('/safety_room/graph', function (req, res) {
	console.log ("got app.get('/graph')");
	
	var html = fs.readFile('./graph.html', function (err, html) {
		html = " "+ html
		console.log('read file');

		if (req.query.view == "distance") {
			console.log ("distance graph\n");

			var qstr = 'select time,distance from safety_room_1 where time >= NOW() - INTERVAL 24 HOUR';
			connection.query(qstr, function(err, rows, cols) {
				if (err) {
					console.error (err);
					processs.exit();
				}

				var data = "";
				var comma = "";
				var time;
				for (var i=0; i< rows.length ; i++) {
					r = rows[i];
					year = r.time.getYear() + 1900;
					hour = r.time.getHours() + 9;
					data += comma + "[new Date (" + year + "," + r.time.getMonth() + "," + r.time.getDate() + "," + hour + "," + r.time.getMinutes() + "," + r.time.getSeconds() + "),"+ r.distance + "]";
					comma = ",";
				}

				var header = "['Date/Time', 'Distance']";
				html = html.replace("<%HEADER%>", header);
				html = html.replace("<%DATA%>", data);

				res.writeHeader(200, {"Content-Type": "text/html"});
				res.write(html);
				res.end();
			});
		}
		else if (req.query.view == "motion") {
			console.log ("motion graph\n");

			var qstr = 'select time, motion from safety_room_1 where time >= NOW() - INTERVAL 24 HOUR';
			connection.query(qstr, function(err, rows, cols) {
				if (err) {
					console.error (err);
					processs.exit();
				}

				var data = "";
				var comma = "";
				var time;
				for (var i=0; i< rows.length ; i++) {
					r = rows[i];
					year = r.time.getYear() + 1900;
					hour = r.time.getHours() + 9;
					data += comma + "[new Date (" + year + "," + r.time.getMonth() + "," + r.time.getDate() + "," + hour + "," + r.time.getMinutes() + "," + r.time.getSeconds() + ")," + r.motion +"]";
					comma = ",";
				}

				var header = "['Date/Time', 'Motion']";
				html = html.replace("<%HEADER%>", header);
				html = html.replace("<%DATA%>", data);

				res.writeHeader(200, {"Content-Type": "text/html"});
				res.write(html);
				res.end();

			});

		}
		else { // default : distance&motion
			console.log ("distance & motion graph\n");

			var qstr = 'select * from safety_room_1 where time >= NOW() - INTERVAL 24 HOUR';
			connection.query(qstr, function(err, rows, cols) {
				if (err) {
					console.error (err);
					processs.exit();
				}

				var data = "";
				var comma = "";
				var time;
				for (var i=0; i< rows.length ; i++) {
					r = rows[i];
					year = r.time.getYear() + 1900;
					hour = r.time.getHours() + 9;
					data += comma + "[new Date (" + year + "," + r.time.getMonth() + "," + r.time.getDate() + "," + hour + "," + r.time.getMinutes() + "," + r.time.getSeconds() + "),"+ r.distance + "," + r.motion +"]";
					comma = ",";
				}

				var header = "['Date/Time', 'Distance', 'Motion']";
				html = html.replace("<%HEADER%>", header);
				html = html.replace("<%DATA%>", data);

				res.writeHeader(200, {"Content-Type": "text/html"});
				res.write(html);
				res.end();
			});
		}
	});
});

app.get ('/safety_room/update', function (req, res) {
	r = req.query;
	console.log (`update : ${JSON.stringify(r)}`);

	distance = r.distance;
	motion = r.motion;
//	temp = r.temp;
//	activity = r.activity;

	connection.query (`insert into safety_room_1 (distance, motion) values (${distance}, ${motion})`, function (err, rows, cols) {
		if (err) {
			console.error (err);
			process.exit();
		}
		else console.log (`current distance : ${distance} motion : ${motion}`);
	});
	
	now = new Date();
	time = now.getFullYear() + "-" + (1 + now.getMonth()) + "-" +  now.getDate() + " " + (9 + now.getHours()) + " : " + now.getMinutes();
	res.send (`distance = ${distance} motion = ${motion} at time = ${time}`);
});


app.get ('/safety_room/data', function (req, res) {
	var qstr = 'select * from safety_room_1 where time >= NOW() - INTERVAL 24 HOUR order by time desc';
	connection.query(qstr, function(err, rows, cols) {
		if (err) {
			console.error (err);
			process.exit();
		}

		console.log (rows.length + " records");
		html = "";

		for (var i=0; i< rows.length ; i++) {
			r = rows[i];
			r.time.setHours (r.time.getHours() + 9);
			html += JSON.stringify (r) + '<br>';
		}

		res.send (html);
	});
	
});

var server = app.listen (8000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('listening at http://%s:%s', host, port);
});
