const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");
const User = require("../models/user");
const { Joi } = require("../utils/joiWrapper");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { escapeRegex } = require("../utils/escapeRegex");

const multer = require("multer");
const { productImageStorage, cloudinary } = require("../Cloudinary/config");
const { isLoggedIn, isAdmin } = require("../middlewares");
const upload = multer({ storage: productImageStorage });



// products routes

router.get('/', catchAsync(async (req, res, next) => {
    const { category, type, search } = req.query;
    let title = "";
    let filters = [];
    let percentageOff = 0;

    if (type && type == "latest") {
        title = "Latest Products"
        const results = await Product.find({}).sort({ date: -1 }).limit(20);
        if (results.length == 0) {
            req.flash("warning", `No products were found with the keyword "${title}"`);
            return res.redirect("back");
        }
        percentageOff = (100 - Math.ceil((results[0].discountPrice / results[0].price) *
            100));
        return res.render("product/allProducts", { results, title, percentageOff, filters });
    }

    if (category) {
        if (category == "pattachitra") {
            title = "Pattachitra";
        } else if (category == "chandua") {
            title = "Chandua";
        } else if (category == "sculpture") {
            title = "Sculpture";
        } else if (category == "woodenIdol") {
            title = "Wooden Idol";
        } else if (category == "paperMache") {
            title = "Paper Mache";
        } else if (category == "painting") {
            title = "Painting";
        }

        const results = await Product.find({ category: category });
        if (results.length == 0) {
            req.flash("warning", `No products were found with the category "${title}"`);
            return res.redirect("back");
        }
        percentageOff = (100 - Math.ceil((results[0].discountPrice / results[0].price) *
            100));

        return res.render("product/allProducts", { results, title, percentageOff, filters });
    }

    if (search) {
        const regex = new RegExp(escapeRegex(search), "gi");
        const results = await Product.find({ productName: regex });
        title = search;
        if (results.length == 0) {
            req.flash("warning", `No products were found with the keyword "${title}"`);
            return res.redirect("back");
        }
        percentageOff = (100 - Math.ceil((results[0].discountPrice / results[0].price) *
            100))

        return res.render("product/allProducts", { results, title, percentageOff, filters });
    }
    title = "All Products";
    const results = await Product.find({});
    if (results.length == 0) {
        req.flash("warning", `No products were found with the keyword "${title}"`);
        return res.redirect("back");
    }
    percentageOff = (100 - Math.ceil((results[0].discountPrice / results[0].price) *
        100));
    return res.render("product/allProducts", { results, title, percentageOff, filters });
    // console.log(results);

}))

router.get('/filters', catchAsync(async (req, res, next) => {

    let { lowerLimit = "", upperLimit = "", size = [] } = req.query;
    let title = "Search Results";
    let percentageOff = 0;
    let filters = [];
    if (size.length == 0) {
        size = ['small', 'medium', 'large']
    }
    filters.push(...size);

    if (lowerLimit == "" || upperLimit == "") {
        const results = await Product.find({ size: { $in: size } });
        if (results.length == 0) {
            req.flash("warning", `No products were found with those filter options.`);
            return res.redirect("back");
        }
        percentageOff = (100 - Math.ceil((results[0].discountPrice / results[0].price) *
            100));

        return res.render("product/allProducts", { results, title, percentageOff, filters });
    }

    const results = await Product.find({ size: { $in: size }, $and: [{ price: { $gte: lowerLimit } }, { price: { $lte: upperLimit } }] });

    if (results.length == 0) {
        req.flash("warning", `No products were found with those filter options.`);
        return res.redirect("back");
    }
    percentageOff = (100 - Math.ceil((results[0].discountPrice / results[0].price) *
        100));
    filters.push(`Rs. ${lowerLimit} to Rs. ${upperLimit}`);
    res.render("product/allProducts", { results, title, percentageOff, filters });

}))

router.get('/:id', catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    });
    let percentageOff = 0;
    if (product.isOnSale) {
        percentageOff = (100 - Math.ceil((product.discountPrice / product.price) *
            100));
    }
    const relatedpdts = await Product.find({}).limit(6);

    let productPurchased = false;
    if (req.user != undefined) {
        for (let pdt in req.user.purchasedProducts) {
            if (product._id.equals(req.user.purchasedProducts[pdt]._id)) {
                productPurchased = true;
                break;
            }
        }
    }
    res.render("product/productShow", { product, ctr: 1, relatedpdts, percentageOff, productPurchased });
}))

router.post('/', isLoggedIn, isAdmin, upload.array("productImages"), catchAsync(async (req, res, next) => {
    const productSchemaJoi = Joi.object({
        productName: Joi.string().required().escapeHTML(),
        productCode: Joi.string().required().escapeHTML(),
        category: Joi.string().valid('pattachitra', 'chandua', 'sculpture', 'woodenIdol', 'paperMache', 'painting').required().escapeHTML(),
        size: Joi.string().valid('small', 'medium', 'large').required().escapeHTML(),
        price: Joi.number().required().min(0),
        description: Joi.string().required().escapeHTML(),
        length: Joi.number().required().min(0),
        breadth: Joi.number().required().min(0),
        height: Joi.number().required().min(0),
        color: Joi.string().required().escapeHTML(),
        material: Joi.string().required().escapeHTML(),
        weight: Joi.number().required().min(0),
        quantity: Joi.number().required().min(0),
        suitableFor: Joi.string().escapeHTML(),
        idealFor: Joi.string().escapeHTML(),
        careInstructions: Joi.string().escapeHTML(),
        productStory: Joi.string().escapeHTML(),
    })

    const { productName, productCode, category, size, price, description, productImages, length, breadth, height, color, material, weight, quantity, suitableFor, idealFor, careInstructions, productStory } = req.body;
    const newProduct = {
        productName,
        productCode,
        category,
        size,
        price,
        description,
        length,
        breadth,
        height,
        color,
        material,
        weight,
        quantity,
        suitableFor,
        idealFor,
        careInstructions,
        productStory
    }

    const { error } = productSchemaJoi.validate(newProduct);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }

    const pdt = await Product.create(newProduct);
    pdt.productImages = req.files.map(f => ({ url: f.path.replace(/(jpg|jpeg|png|webp)/g, "webp"), filename: f.filename }));

    await pdt.save();
    res.redirect('/admin-dashboard#allProducts');
}))


// edit product

router.get('/:id/edit', isLoggedIn, isAdmin, catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        req.flash("error", "Product Not found.");
        return res.redirect("/");
    }
    res.render("product/productEdit", { product });
}))

router.patch('/:id', isLoggedIn, isAdmin, upload.array("productImages"), catchAsync(async (req, res, next) => {
    const productSchemaJoi = Joi.object({
        productName: Joi.string().required().escapeHTML(),
        productCode: Joi.string().required().escapeHTML(),
        category: Joi.string().valid('pattachitra', 'chandua', 'sculpture', 'woodenIdol', 'paperMache', 'painting').required().escapeHTML(),
        size: Joi.string().valid('small', 'medium', 'large').required().escapeHTML(),
        price: Joi.number().required().min(0),
        description: Joi.string().required().escapeHTML(),
        length: Joi.number().required().min(0),
        breadth: Joi.number().required().min(0),
        height: Joi.number().required().min(0),
        color: Joi.string().required().escapeHTML(),
        material: Joi.string().required().escapeHTML(),
        weight: Joi.number().required().min(0),
        quantity: Joi.number().required().min(0),
        suitableFor: Joi.string().escapeHTML(),
        idealFor: Joi.string().escapeHTML(),
        careInstructions: Joi.string().escapeHTML(),
        productStory: Joi.string().escapeHTML(),
    })
    const { productName, productCode, category, size, price, description, productImages, length, breadth, height, color, material, weight, quantity, suitableFor, idealFor, careInstructions, productStory } = req.body;
    const newProduct = {
        productName,
        productCode,
        category,
        size,
        price,
        description,
        length,
        breadth,
        height,
        color,
        material,
        weight,
        quantity,
        suitableFor,
        idealFor,
        careInstructions,
        productStory
    }

    const { error } = productSchemaJoi.validate(newProduct);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }

    const pdt = await Product.findByIdAndUpdate(req.params.id, newProduct);
    const imgs = req.files.map(f => ({ url: f.path.replace(/(jpg|jpeg|png|webp)/g, "webp"), filename: f.filename }));
    pdt.productImages.push(...imgs);
    if (req.body.deleteImages) {

        try {
            for (let filename of req.body.deleteImages) {
                await cloudinary.uploader.destroy(filename);
            }
        } catch (e) {
            req.flash("error", "Check your internet connectivity.");
            return res.redirect("back");
        }

        await pdt.updateOne({ $pull: { productImages: { filename: { $in: req.body.deleteImages } } } })
    }
    await pdt.save();

    res.redirect("/admin-dashboard#allProducts");
}))



// firesale activation

router.post('/fireSaleActivation', isLoggedIn, isAdmin, catchAsync(async (req, res, next) => {
    const { salePercentage } = req.body;
    // console.log(salePercentage);

    const products = await Product.find({});

    // console.log(products);
    for (let product of products) {
        product.isOnSale = true;
        product.discountPrice = (product.price - (product.price * (salePercentage / 100))).toFixed(2);

        await product.save();
    }

    res.redirect("/admin-dashboard#allProducts");
}))

router.post('/fireSaleDeactivation', isLoggedIn, isAdmin, catchAsync(async (req, res, next) => {
    const products = await Product.find({});
    for (let product of products) {
        product.isOnSale = false;
        product.discountPrice = 0;

        await product.save();
    }

    res.redirect("/admin-dashboard#allProducts");
}))

module.exports = router;