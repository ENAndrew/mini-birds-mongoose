var mongoose = require('mongoose');

var SightingSchema = new mongoose.Schema({
    name: { type: String, lowercase: true }, 
    order: { type: String, maxlength: 20 }, 
    status: { type: String, enum: ['least concern', 'extinct', 'threatened', 'near threatened'] },
    confirmed: { type: Boolean, default: false },
    numberSeen: { type: Number, min: 1 }
},
{
    timestamps: true
});

module.exports = mongoose.model('Sightings', SightingSchema);


