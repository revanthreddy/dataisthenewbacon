var express = require('express');
var app = express();
var server = require('http').createServer(app);
var http = require('http');
var path = require('path');
var async = require('async');

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


app.get('/', function(req, res) {
//    console.log(__dirname);
//    res.sendfile(__dirname + '/index.html');
    return res.send("DATA IS THE NEW BACON");
});


app.get('/data', function(req, res) {
//    console.log(__dirname);
//    res.sendfile(__dirname + '/index.html');
    
    var data = [];
    
    for(var i = 0 ; i < 10 ; i++){
        
            data.push([Math.random() , (new Date()).getTime()]);
            
    }
    return res.send(data);
});
