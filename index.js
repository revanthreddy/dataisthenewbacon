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


app.get('/sample', function (req, res) {
    var db = new AWS.DynamoDB();
    var streamdata = [];
    var start = req.query.start;
    var end   = req.query.end;
    
    db.scan({
        TableName: "tb_channel_data",
        Limit: 50,
        "ScanFilter": {
            "name": {
                "AttributeValueList": [
                    {
                        "S": "stream"
                    }
                ],
                "ComparisonOperator": "EQ"
            },
            "timestamp": {
                "AttributeValueList": [
                    {
                        "N": ""+1433520591010
                    }
                ],
                "ComparisonOperator": "LT"
            }
        }
    }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
        var items = data.Items;
        for (var i in items) {
            streamdata.push([items[i].value.N, items[i].timestamp.N]);
        }
        return res.send(streamdata);
    });

});




/*
 * sample time stamps
 * 1433520591011
 */
app.get('/stream', function (req, res) {
    var db = new AWS.DynamoDB();
    var streamdata = [];
    var start = req.query.start;
    var end   = req.query.end;
    var channel = req.query.channel;
    if(!start || !end)
        return res.status(400).send("need to have 'start' and 'end parameters.");
    if(!channel)
        channel = "stream";
    console.log(channel);
    console.log(end);
    console.log(start);
    db.scan({
        TableName: "tb_channel_data",
        
        "ScanFilter": {
            "name": {
                "AttributeValueList": [
                    {
                        "S": channel
                    }
                ],
                "ComparisonOperator": "EQ"
            },
            "timestamp": {
                "AttributeValueList": [
                    {
                        "N": ""+start
                    }
                ],
                "ComparisonOperator": "GT"
            },
            "timestamp": {
                "AttributeValueList": [
                    {
                        "N": ""+end
                    }
                ],
                "ComparisonOperator": "LT"
            }
        }
    }, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
        var items = data.Items;
        for (var i in items) {
            streamdata.push(items[i].value.N);
        }
        return res.send(streamdata);
    });

});





//app.get('/put', function (req, res) {
//    var db = new AWS.DynamoDB();
//
//    db.putItem({
//        "TableName": "tb_channel_data",
//        "Item": {
//            "name": {"S": "kinesis-stream"},
//            "timestamp": {"N": "12345"},
//            "value": {"N": "1234"}
//        }
//
//    }, function (err, data) {
//        console.log('error');
//        console.log(data);
//    });
//});


