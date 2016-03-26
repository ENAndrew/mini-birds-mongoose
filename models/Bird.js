var mongoose = require('mongoose');

var BirdSchema = new mongoose.Schema({
    name: { type: String, lowercase: true },
    order: { type: String, maxlength: 20 },
    status: { type: String, 
        enum: ['least concern',
        'extinct',
        'threatened',
        'near threatened'] }
}, {
    timestamps: true
});

module.exports = mongoose.model('Birds', BirdSchema);


