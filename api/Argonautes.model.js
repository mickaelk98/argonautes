const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const argonauteSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Vous devez ajoutez un nom"],
        unique: [true]
    }
},
    {
        timestamps: true,
    })

argonauteSchema.plugin(uniqueValidator, { message: "Cet argonaute est déja sur la list" });

module.exports = mongoose.model('Argonaute', argonauteSchema);