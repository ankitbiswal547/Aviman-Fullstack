const mongoose = require("mongoose");
const Review = require('./review');
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: [true, "Email is required."]
    },
    // phoneNumber: {
    //     type: Number,
    //     required: [true, "Phone Number is required."]
    // },
    fullName: {
        type: String,
        required: [true, "Full Name is required."]
    },
    description: {
        type: String
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    addresses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Address"
        }
    ],
    profileImage: {
        url: {
            type: String,
            default: ""
        },
        filename: {
            type: String,
            default: ""
        }
    },
    verified: {
        type: String,
        default: "pending"
    },
    cart: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);