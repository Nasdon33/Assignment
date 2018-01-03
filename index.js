var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');
var fs = require('fs');
var mime = require('mime');
var multer = require('multer');
var path = require('path');
var engines = require('consolidate');

// Inizializzo db da json
var JsonDB = require('node-json-db');
var db = new JsonDB("./database/assignments.json", true, false);


//instantiate express
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// Mandare il proprio assignment
app.post('/assignment', function(req,res){
    db.reload;
    data = req.body;
    console.log(data);
    assignmentID = data.assignmentID;
    taskID = data.taskID;
    workerID = data.workerID;
    assignmentResult = data.assignmentResult;
    console.log("TASK ID: " + taskID + ". \n "
            + "ASSIGNMENT ID: " + assignmentID + ". \n "
            + "WORKER ID: " + workerID + ". \n "
            + "ASSIGNMENT RESULT: " + assignmentResult + ".");
    db.push("/deliveries[]", {taskID: taskID, assignmentID: assignmentID, workerID: workerID, assignmentResult: assignmentResult}, true);
    console.log("Risultati pushati?");
});


app.route('/assignment/:id')
    .get(function(req, res) {
        db.reload;
        id = req.params.id;
        // Visualizzare il proprio assignment
        database = db.getData("/");
        
        res.send();
    })
    .put(function(req, res) {
        db.reload;
        id = req.params.id;
        // Modificare il proprio assignment
    })
    .delete(function(req, res) {
        db.reload;
        id = req.params.id;
        // Cancellare il proprio assignment   
    });


app.get('/',function (req,res){
   res.render('index.jade');
});

// Handle 404 
app.use(function(req, res) { 
    res.status(404); 
   res.render('404.jade', {title: '404: File Not Found'}); 
}); 

// Handle 500 
app.use(function(error, req, res, next) { 
    res.status(500); 
   res.render('500.jade', {title:'500: Internal Server Error', error: error}); 
}); 

//listen in a specific port
app.listen((process.env.PORT || 8088));

//check status
console.log('Server running at http://localhost:8088/');