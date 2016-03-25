//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var Sighting = require('./models/Sighting');


var app = express();
var uri = 'mongodb://localhost/27017';
mongoose.connect(uri);


app.use(bodyParser.json());
app.use(cors());

//Endpoints

app.post('/api/sighting', function(req, res, next){
    
    var birdSighting = new Sighting();
    
    birdSighting.name = req.body.name;
    birdSighting.order = req.body.order;
    birdSighting.status = req.body.status;
    birdSighting.confirmed = req.body.confirmed;
    birdSighting.numberSeen = req.body.numberSeen;
    
    birdSighting.save(function(err, result){
        if(err){
            res.send(err);
        }else {
            res.send(result);
        }
    });

    
});

app.get('/api/sighting', function(req, res, next){
    
    var query = {};
    
    if(req.query.name){
        query = { name: req.query.name };
    }
    
    if(req.query.order) {
        query = { order: req.query.order };
    }
    
    Sighting.find(query, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.send(result);
        }
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
           res.send(err);
       }else{
           res.send(result);
       }
   });
    
});



app.listen(8000, function(){
    console.log('Listening on port 8000');
});

