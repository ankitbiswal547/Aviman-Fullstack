const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middlewares");
const ExpressError = require("../utils/ExpressError");
const sanitizeHtml = require('sanitize-html');

const isReviewOwner = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "No review was found.");
        return res.redirect(`/products/${id}`);
    }
    if (review.author.equals(req.user._id)) {
        return next();
    }
    req.flash("error", "You do not have permissions to delete that review.");
    res.redirect(`/products/${req.params.id}`);
}

// reviews routes

router.post('/products/:id/review', isLoggedIn, catchAsync(async (req, res, next) => {
    let { rating, reviewComment } = req.body;
    reviewComment = sanitizeHtml(reviewComment, {
        allowedTags: [],
        allowedAttributes: {}
    })
    // console.log(rating, reviewComment);

    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user._id);
    const review = await Review.create({
        text: reviewComment,
        rating,
        author: req.user._id,
        authorname: req.user.fullName,
        productId: req.params.id,
        // authorImage: req.user.profileImage.url
    });

    user.reviews.push(review);
    product.reviews.push(review);
    product.totalReviews += 1;
    product.totalRating += parseInt(rating);
    product.averageRating = (product.totalRating / product.totalReviews).toFixed(1);

    if (rating == 5) {
        product.eachRating.fiveStar += 1;
    } else if (rating == 4) {
        product.eachRating.fourStar += 1;
    } else if (rating == 3) {
        product.eachRating.threeStar += 1;
    } else if (rating == 2) {
        product.eachRating.twoStar += 1;
    } else {
        product.eachRating.oneStar += 1;
    }

    const result = await product.save();
    const userres = await user.save();
    // console.log(result);
    res.redirect(`/products/${req.params.id}`);
}))

router.delete('/products/:id/review/:reviewId', isLoggedIn, isReviewOwner, catchAsync(async (req, res, next) => {
    // res.send("delete request recieved!!!");
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    const review = await Review.findById(reviewId);
    await User.findByIdAndUpdate(review.author._id, { $pull: { reviews: reviewId } });
    const product = await Product.findById(id);

    const rating = review.rating;
    product.totalReviews -= 1;
    product.totalRating -= rating;
    if (product.totalReviews == 0) {
        product.averageRating = 0;
    } else {
        product.averageRating = (product.totalRating / product.totalReviews).toFixed(1);
    }

    if (rating == 5) {
        product.eachRating.fiveStar -= 1;
    } else if (rating == 4) {
        product.eachRating.fourStar -= 1;
    } else if (rating == 3) {
        product.eachRating.threeStar -= 1;
    } else if (rating == 2) {
        product.eachRating.twoStar -= 1;
    } else {
        product.eachRating.oneStar -= 1;
    }
    await product.save()
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/products/${id}`);
}))

module.exports = router;