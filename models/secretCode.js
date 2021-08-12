const mongoose = require("mongoose");
const { Schema } = mongoose;


const SecretCodeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    code: {
        type: String
    },
    expiresAt: {
        type: Date,
        default: Date.now(),
        expires: 1800
    }
})

module.exports = mongoose.model('Secretcode', SecretCodeSchema);