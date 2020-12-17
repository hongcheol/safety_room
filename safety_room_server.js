
const accountSid = 'AC2148306eae0272b64613c60bd97886b8';
const authToken = 'bd2f1e16f503ab1bfc18736152b7c963';

var client = require('twilio')(accountSid,authToken);
var dateUtils = require('date-utils');
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

//sms 
function sms(){
	client.messages
	.create({
		body:'Emergency!!\nurl http://ec2-35-171-21-14.compute-1.amazonaws.com:8000/safety_room/graph?view=table2',
		from: '+18648062554',
		to: '+821062647397'
	}).then(message => console.log(message.sid));
}

//server data instruction
const accountSid = 'mySid';//private Sid from twilio
const authToken = 'myToken';//private authToken from twilio
var client = require('twilio')(accountSid,authToken);

client.messages
.create({
        body:'MESSAGE',
        from: 'MY phone',
        to: 'receiver'
})
.then(message => console.log(message.sid));



var express = require('express');
var app = express();
fs = require('fs');

mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'shc950217',
    password: ' ',
    database: 'safety_room'
})
connection.connect();

app.get ('/safety_room/graph', function (req, res) {
	console.log ("got app.get('/graph')");
	
	var html = fs.readFile('./graph.html', function (err, html) {
		html = " "+ html
		console.log('read file');

		if (req.query.view == "table1") {
			console.log ("table1 distance graph\n");
			var qstr = 'select * from safety_room_t1 where time >= now()-INTERVAL 10 MINUTE union select * from safety_room_t2 where time >= NOW()-INTERVAL 10 MINUTE union select * from safety_room_t3 where time >= now()-INTERVAL 10 MINUTE';

			//var qstr = 'select * from safety_room_t1';
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
					data += comma + "[new Date (" + year + "," + r.time.getMonth() + "," + r.time.getDate() + "," + hour + "," + r.time.getMinutes() + "," + r.time.getSeconds() + "),"+ r.action + ","+ r.distance1 + "," + r.distance2 + "," +r.distance3 +"]";
					comma = ",";
				}

				var header = "['Date/Time', 'Action','Distance1','Distance2','Distance3']";
				//var header = "['Date/Time', 'Action','Distance1', 'Distance2', 'Distance3']";
				html = html.replace("<%HEADER%>", header);
				html = html.replace("<%DATA%>", data);

				res.writeHeader(200, {"Content-Type": "text/html"});
				res.write(html);
				res.end();
			});
		} 
		else if (req.query.view == "table2") {
			console.log ("table2 distance graph\n");

			var qstr = 'select * from safety_room_t2';
			connection.query(qstr, function(err, rows, cols) {
				if (err) {
					console.error (err);
					processs.exit();
				}
				console.log('fine query');

				var data = "";
				var comma = "";
				var time;
				for (var i=0; i< rows.length ; i++) {
					r = rows[i];
					year = r.time.getYear() + 1900;
					hour = r.time.getHours() + 9;
					data += comma + "[new Date (" + year + "," + r.time.getMonth() + "," + r.time.getDate() + "," + hour + "," + r.time.getMinutes() + "," + r.time.getSeconds() + "),"+ r.action + ","+ r.distance1 + "," + r.distance2 + "," +r.distance3 +"]";
					comma = ",";
				}

				//var header = "['Date/Time', 'Action','Distance1','Distance2','Distance3']";
				var header = "['Date/Time', 'Action','Distance1', 'Distance2', 'Distance3']";
				html = html.replace("<%HEADER%>", header);
				html = html.replace("<%DATA%>", data);

				res.writeHeader(200, {"Content-Type": "text/html"});
				res.write(html);
				res.end();
			});
		} 
		else if (req.query.view == "table3") {
			console.log ("table3 distance graph\n");

			var qstr = 'select * from safety_room_t3';
			connection.query(qstr, function(err, rows, cols) {
				if (err) {
					console.error (err);
					processs.exit();
				}

			var qstr = 'select * from safety_room_t3';
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
					data += comma + "[new Date (" + year + "," + r.time.getMonth() + "," + r.time.getDate() + "," + hour + "," + r.time.getMinutes() + "," + r.time.getSeconds() + "),"+ r.action + ","+ r.distance1 + "," + r.distance2 + "," +r.distance3 +"]";
					comma = ",";
				}

				var header = "['Date/Time', 'Action','Distance1', 'Distance2', 'Distance3']";
				html = html.replace("<%HEADER%>", header);
				html = html.replace("<%DATA%>", data);

				res.writeHeader(200, {"Content-Type": "text/html"});
				res.write(html);
				res.end();
			});
		} 
		else if (req.query.view == "table4") {
			console.log ("table4 distance graph\n");

			var qstr = 'select * from safety_room_t4';
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
					data += comma + "[new Date (" + year + "," + r.time.getMonth() + "," + r.time.getDate() + "," + hour + "," + r.time.getMinutes() + "," + r.time.getSeconds() + "),"+ r.action + ","+ r.distance1 + "," + r.distance2 + "," +r.distance3 +"]";
					comma = ",";
				}


				var data = "";
				var comma = "";
				var time;
				for (var i=0; i< rows.length ; i++) {
					r = rows[i];
					year = r.time.getYear() + 1900;
					hour = r.time.getHours() + 9;
					data += comma + "[new Date (" + year + "," + r.time.getMonth() + "," + r.time.getDate() + "," + hour + "," + r.time.getMinutes() + "," + r.time.getSeconds() + "),"+ r.action + ","+ r.distance1 + "," + r.distance2 + "," +r.distance3 +"]";
					comma = ",";
				}

				var header = "['Date/Time', 'Action','Distance1', 'Distance2', 'Distance3']";
				html = html.replace("<%HEADER%>", header);
				html = html.replace("<%DATA%>", data);

				res.writeHeader(200, {"Content-Type": "text/html"});
				res.write(html);
				res.end();
			});
		} 
		else if (req.query.view == "table5") {
			console.log ("table5 distance graph\n");

			var qstr = 'select * from safety_room_t5';
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
					data += comma + "[new Date (" + year + "," + r.time.getMonth() + "," + r.time.getDate() + "," + hour + "," + r.time.getMinutes() + "," + r.time.getSeconds() + "),"+ r.action + ","+ r.distance1 + "," + r.distance2 + "," +r.distance3 +"]";
					comma = ",";
				}

				var header = "['Date/Time', 'Action','Distance1', 'Distance2', 'Distance3']";
				html = html.replace("<%HEADER%>", header);
				html = html.replace("<%DATA%>", data);

				res.writeHeader(200, {"Content-Type": "text/html"});
				res.write(html);
				res.end();
			});
		}
	});
});

//update Sensor Data
app.get ('/safety_room/update', function (req, res) {
	r = req.query;
	console.log (`update : ${JSON.stringify(r)}`);

	table = r.table;
	action = r.action;
	distance1 = r.distance1;
	distance2 = r.distance2;
	distance3 = r.distance3;

	num = 0;
	if (table == "table1") {
		num = 1;
		connection.query (`insert into safety_room_t1 (action, distance1, distance2, distance3, tablenum) values (${action}, ${distance1}, ${distance2}, ${distance3},${num})`, function (err, rows, cols) {
			if (err) {
				console.error (err);
				process.exit();
			}
		});;



	if (table == "table1") {
		connection.query (`insert into safety_room_t1 (action, distance1, distance2, distance3) values (${action}, ${distance1}, ${distance2}, ${distance3})`, function (err, rows, cols) {
			if (err) {
				console.error (err);
				process.exit();
			}
			//else console.log (`current distance1 : ${distance1}`);
		});
		now = new Date();
		time = now.getFullYear() + "-" + (1 + now.getMonth()) + "-" +  now.getDate() + " " + (9 + now.getHours()) + " : " + now.getMinutes();
		res.send (`action = ${action} distance1 = ${distance1} distance2=${distance2} distance3 = ${distance3} at time = ${time}`);
	}
	else if (table == "table2") {

		num = 2;
		connection.query (`insert into safety_room_t2 (action, distance1, distance2, distance3, tablenum) values (${action}, ${distance1}, ${distance2}, ${distance3}, ${num})`, function (err, rows, cols) {

		connection.query (`insert into safety_room_t2 (action, distance1, distance2, distance3) values (${action}, ${distance1}, ${distance2}, ${distance3})`, function (err, rows, cols) {

			if (err) {
				console.error (err);
				process.exit();
			}

			//else console.log (`current distance1 : ${distance1}`);

		});
		
		now = new Date();
		time = now.getFullYear() + "-" + (1 + now.getMonth()) + "-" +  now.getDate() + " " + (9 + now.getHours()) + " : " + now.getMinutes();
		res.send (`action = ${action} distance1 = ${distance1} distance2=${distance2} distance3 = ${distance3} at time = ${time}`);
	}
	else if (table == "table3") {	

		num = 3;
		connection.query (`insert into safety_room_t3 (action, distance1, distance2, distance3, tablenum) values (${action}, ${distance1}, ${distance2}, ${distance3}, ${num})`, function (err, rows, cols) {

		connection.query (`insert into safety_room_t3 (action, distance1, distance2, distance3) values (${action}, ${distance1}, ${distance2}, ${distance3})`, function (err, rows, cols) {

			if (err) {
				console.error (err);
				process.exit();
			}

			//else console.log (`current distance1 : ${distance1}`);

		});
		
		now = new Date();
		time = now.getFullYear() + "-" + (1 + now.getMonth()) + "-" +  now.getDate() + " " + (9 + now.getHours()) + " : " + now.getMinutes();
		res.send (`action = ${action} distance1 = ${distance1} distance2=${distance2} distance3 = ${distance3} at time = ${time}`);
	}
	else if (table == "table4") {
		connection.query (`insert into safety_room_t4 (action, distance1, distance2, distance3) values (${action}, ${distance1}, ${distance2}, ${distance3})`, function (err, rows, cols) {
			if (err) {
				console.error (err);
				process.exit();
			}

			//else console.log (`current distance1 : ${distance1}`);
		});
		
		now = new Date();
		time = now.getFullYear() + "-" + (1 + now.getMonth()) + "-" +  now.getDate() + " " + (9 + now.getHours()) + " : " + now.getMinutes();
		res.send (`action = ${action} distance1 = ${distance1} distance2=${distance2} distance3 = ${distance3} at time = ${time}`);
	}
	else if (table == "table5") {
		connection.query (`insert into safety_room_t5 (action, distance1, distance2, distance3) values (${action}, ${distance1}, ${distance2}, ${distance3})`, function (err, rows, cols) {
			if (err) {
				console.error (err);
				process.exit();
			}

			//else console.log (`current distance1 : ${distance1}`);

		});
		
		now = new Date();
		time = now.getFullYear() + "-" + (1 + now.getMonth()) + "-" +  now.getDate() + " " + (9 + now.getHours()) + " : " + now.getMinutes();
		res.send (`action = ${action} distance1 = ${distance1} distance2=${distance2} distance3 = ${distance3} at time = ${time}`);
	}
	report();
});


app.get ('/safety_room/data', function (req, res) {
	r = req.query;
	table = r.table;
	
	if (table == "table1") {
		var qstr = 'select * from safety_room_t1 order by time desc';
	//	where time >= NOW() - INTERVAL 24 HOUR order by time desc';
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
	}
	else if (table == "table2") {
		var qstr = 'select * from safety_room_t2 order by time desc';
	//	where time >= NOW() - INTERVAL 24 HOUR order by time desc';
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
	}
	else if (table == "table3") {
		var qstr = 'select * from safety_room_t3 order by time desc';
	//	where time >= NOW() - INTERVAL 24 HOUR order by time desc';
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
	}
	else if (table == "table4") {
		var qstr = 'select * from safety_room_t4 order by time desc';
	//	where time >= NOW() - INTERVAL 24 HOUR order by time desc';
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
	}
	else if (table == "table5") {
		var qstr = 'select * from safety_room_t5 order by time desc';
	//	where time >= NOW() - INTERVAL 24 HOUR order by time desc';
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
	}
});



function report(){
	var time = moment().format('YYYY-MM-DDTHH:MM:SS.000Z');
	console.log(time);
	var numLayer = 3;
	let qstr = new Array(numLayer);
	qstr[0] = 'select * from safety_room_t1 order by time desc limit 1';
    	qstr[1] = 'select * from safety_room_t2 order by time desc limit 1';
	qstr[2] = 'select * from safety_room_t3 order by time desc limit 1';
	var down = 0;
	for(var t = 0;t<numLayer;t++){
		connection.query(qstr[t],function(err,rows,fields){
			if(err){
				console.log(err);
			}else{
				for(var i = 0;i<rows.length;i++){
					console.log(rows[i].tablenum + ":" + rows[i].time + ":" + rows[i].action);
					if(rows[i].action == 1){
			       			console.log("detect human");
						down++;
						console.log(down);
						if(down == numLayer) sms();
					}
				}
			}
		})
	}
}

var server = app.listen (8000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('listening at http://%s:%s', host, port);
});
