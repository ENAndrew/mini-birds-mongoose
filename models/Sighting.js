var mongoose = require('mongoose');

var User = require('./User');         //does not need to be .schema since we're just using the _id at this time
var Bird = require('./Bird').schema;  //otherwise it will get the model, since i exported it as a model

var SightingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    bird: [Bird],
    confirmed: { type: Boolean, default: false },
    numberSeen: { type: Number, min: 1 }
},
{
    timestamps: true
});

module.exports = mongoose.model('Sightings', SightingSchema);


