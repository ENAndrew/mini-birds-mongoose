var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    member: { type: String, lowercase: true },
    username: { type: String },
    level: { type: String, 
        enum: ['beginner', 
            'experienced', 
            'master', 
            'bird whisperer']},
    location: { type: String },
    email: { type: String }
},
{
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);




