const mongoose = require("mongoose");
const Review = require('./review');
const User = require("./user");
const { Schema } = mongoose;

const productSchema = new Schema({
    productCode: {
        type: String,
        required: [true, "Product Code is required"]
    },
    productName: {
        type: String,
        required: [true, "Product name is required."]
    },
    category: {
        type: String,
        required: [true, "Category is required."]
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
        min: [0, "price cannot be negative."]
    },
    discountPrice: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: [true, "Description is required."]
    },
    productImages: [
        {
            url: String,
            filename: String
        }
    ],
    length: {
        type: Number,
        required: [true, "Product Length is required."],
        min: [0, "Length cannot be negative."]
    },
    breadth: {
        type: Number,
        required: [true, "Product Breadth is required."],
        min: [0, "Breadth cannot be negative."]
    },
    height: {
        type: Number,
        required: [true, "Product LenHeightgth is required."],
        min: [0, "Height cannot be negative."]
    },
    color: {
        type: String,
        required: [true, "Product color is required."]
    },
    material: {
        type: String,
        required: [true, "Product material is required."]
    },
    weight: {
        type: Number,
        required: [true, "Product Weight is required."],
        min: [0, "Weight cannot be negative."]
    },
    suitableFor: {
        type: String,
    },
    idealFor: {
        type: String
    },
    careInstructions: {
        type: String
    },
    productStory: {
        type: String
    },

    // schema updates
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"]
    },
    salesCompleted: {
        type: Number,
        default: 0
    },
    isOnSale: {
        type: Boolean,
        default: false
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    averageRating: {
        type: Number,
        min: 0,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    eachRating: {
        fiveStar: {
            type: Number,
            default: 0
        },
        fourStar: {
            type: Number,
            default: 0
        },
        threeStar: {
            type: Number,
            default: 0
        },
        twoStar: {
            type: Number,
            default: 0
        },
        oneStar: {
            type: Number,
            default: 0
        },
    },
    date: {
        type: Date,
        default: Date.now()
    },
    size: {
        type: String
    }
    // region: {
    //     type: String,
    //     required: [true, "Region associated with a product is required!"]
    // }
})

productSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })

        // await User.find
    }
})

module.exports = mongoose.model("Product", productSchema);