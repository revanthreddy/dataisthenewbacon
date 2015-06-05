var express = require('express');
var app = express();
var server = require('http').createServer(app);
var http = require('http');
var path = require('path');
var async = require('async');
var cors = require('cors');
app.use(cors());
// Setup Port to Use for Server Communication
server.listen(3000);

var AWS = require('aws-sdk');
AWS.config.loadFromPath('/opt/apps/properties/awscred.json');


// App is tied to Express.  These are Express settings.

// Parses RESTful body content to determine XML/JSON/other formats
app.use(express.bodyParser());

// Not sure. Research
app.use(express.methodOverride());

// Establishes that this app will use a router (Express functionality).
app.use(app.router);


app.get('/', function (req, res) {
//    console.log(__dirname);
//    res.sendfile(__dirname + '/index.html');
    return res.send("DATA IS THE NEW BACON");
});


app.get('/data', function (req, res) {
//    console.log(__dirname);
//    res.sendfile(__dirname + '/index.html');

    var data = [];

    for (var i = 0; i < 10; i++) {

        data.push(Math.random());

    }
    return res.send(data);
});


app.get('/data', function (req, res) {
//    console.log(__dirname);
//    res.sendfile(__dirname + '/index.html');

    var data = [];

    for (var i = 0; i < 10; i++) {

        data.push(Math.random());

    }
    return res.send(data);
});

app.get('/sample', function (req, res) {
    var db = new AWS.DynamoDB();
    var data = [];
    db.scan({
        TableName : "tb_channel_data",
        Limit : 50
    }, function(err, data) {
        if (err) { console.log(err); return; }
        
        var items = data.Items;
        for (var i in items) {
            data.push();
            console.log(items[i].name.S);
            console.log(items[i].value.N);
            console.log(items[i].timestamp.N);
        }
        return res.send(data);
    });
    
});


