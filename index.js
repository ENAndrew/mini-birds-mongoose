//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var Sighting = require('./models/Sighting');
var User = require('./models/User');
var Bird = require('./models/Bird');


var app = express();
var uri = 'mongodb://localhost/27017';
mongoose.connect(uri);


app.use(bodyParser.json());
app.use(cors());

//Endpoints

app.post('/api/bird', function(req, res, next){  //functional
    
    var newBird = new Bird();
   
    newBird.name = req.body.name;
    newBird.order = req.body.order;
    newBird.status = req.body.status;
    
    newBird.save(function(err, result){
        if(err){
            return res.status(500).send(err);
        } else {
            return res.status(200).send(result);
        }
    });
    
});

app.post('/api/user', function(req, res, next){  //functional
    
    var newUser = new User();
    
    newUser.member = req.body.member;
    newUser.username = req.body.username;
    newUser.level = req.body.level;
    newUser.location = req.body.location;
    newUser.email = req.body.email;
    
    newUser.save(function(err, result) {
        if(err){
            return res.status(500).send(err);
        } else {
            return res.status(200).send(result);
        }
    });
    
});

app.post('/api/sighting', function(req, res, next){
    
//    var birdSighting = new Sighting();
    
    var query = { name: req.body.name };
    
    var myBird = Bird.find(query, 'name order status')
            .then(function(result){
                console.log('then result is ', result[0]);  //this is returning the correct object, but myBird != the object ????
                return result[0];
            });

    console.log('myBird is ' + myBird);  //object object
    
 
//    birdSighting.user = req.body.user_id;
//    birdSighting.confirmed = req.body.confirmed;
//    birdSighting.numberSeen = req.body.numberSeen;
//    birdSighting.bird = myBird;
//    
//    birdSighting.save(function(err, result){
//        if(err){
//            return res.status(500).send(err);
//        }else {
//            return res.status(200).send(result);
//        }
//    });

    
});

app.get('/api/sighting', function(req, res, next){
    
    var query = {};
    
    if(req.query.name){
        query = { name: req.query.name };
    };
    
    if(req.query.order) {
        query = { order: req.query.order };
    };
    
    Sighting.find(query, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.send(result);
        };
    });
    
});

app.put('/api/sighting', function(req, res){
    
    if(!req.query.id){
        res.send('An id is required');
    } 
    
    var id = req.query.id;
    var update = {};
    
    if(req.body.name){
        update = {name: req.body.name};
    }
    if(req.body.numberSeen){
        update = {numberSeen: req.body.numberSeen};
    }

    Sighting.findByIdAndUpdate(id, { $set: update}, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.send(result);
        }
    });
    
});

app.delete('/api/sighting/:id', function(req, res){
   
   if(!req.params.id){
       res.send('An id is required');
   }
   
   var id = req.params.id;
   
   Sighting.findOneAndRemove(id, function(err, result){
       if(err){
           return res.status(500).send(err);
       }else{
           return res.status(200).send(result);
       }
   });
    
});



app.listen(8000, function(){
    console.log('Listening on port 8000');
});

