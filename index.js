if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express"),
    app = express(),
    path = require("path"),
    mongoose = require("mongoose"),
    Product = require('./models/product'),
    Review = require("./models/review"),
    User = require("./models/user"),
    catchAsync = require("./utils/catchAsync"),
    ExpressError = require('./utils/ExpressError'),
    { Joi } = require("./utils/joiWrapper"),
    seed = require("./utils/seeds"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    session = require("express-session"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    { isLoggedIn, isAdmin, isUserPageOwner, hasOrderedYet } = require("./middlewares"),
    nodemailer = require("nodemailer"),
    mongoSanitize = require('express-mongo-sanitize'),
    MongoStore = require("connect-mongo")(session),
    Razorpay = require("razorpay");


const Address = require("./models/address");
const userRoutes = require("./routes/user"),
    reviewRoutes = require("./routes/review"),
    productRoutes = require("./routes/product"),
    addressRoutes = require("./routes/address");

// seed();
const dbUrl = process.env.DB_URL;
// "mongodb://localhost:27017/aviman"
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log("connected to the database");
    })
    .catch(e => {
        console.log("error to connect!");
        // console.log(e);
    })

const store = new MongoStore({
    url: dbUrl,
    secret: process.env.SESSION_SECRET,
    touchAfter: 24 * 60 * 60
})

store.on("error", function (e) {
    console.log("Session store error", e);
})

const sessionConfig = {
    store,
    name: "session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        // secure: true
    }
}

app.use(session(sessionConfig));
app.use(flash());


// passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize({
    replaceWith: '_',
}));

// including success and error messages in every request...
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.warning = req.flash("warning");
    res.locals.info = req.flash("info");
    res.locals.currUser = req.user;
    next();
})

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


app.get('/', catchAsync(async (req, res, next) => {
    const products = await Product.find({}).limit(6);
    let percentageOff = (100 - Math.ceil((products[0].discountPrice / products[0].price) *
        100));
    const latestPdts = await Product.find({}).sort({ date: -1 }).limit(4);
    res.render("home", { products, latestPdts, percentageOff });
}))
app.get('/admin-dashboard', isLoggedIn, isAdmin, catchAsync(async (req, res) => {
    const products = await Product.find({});
    const totalProducts = products.length;
    let onSale = false;
    if (products.length > 0) {
        onSale = products[0].isOnSale;
    }


    let totalSales = 0;
    for (let product of products) {
        totalSales += product.salesCompleted;
    }

    let totalUsers = await User.countDocuments();

    res.render("adminDashboard", { products, edit: false, totalProducts, totalUsers, totalSales, onSale });
}))

app.post('/contact', catchAsync(async (req, res) => {

    let { username, email, subject, query } = req.body;

    const contactUsShcema = Joi.object({
        username: Joi.string().required().escapeHTML(),
        email: Joi.string().email().required().escapeHTML(),
        subject: Joi.string().required().escapeHTML(),
        query: Joi.string().required().escapeHTML()
    })

    const { error } = contactUsShcema.validate({
        username,
        email,
        subject,
        query
    })
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        req.flash("error", msg);
        return res.redirect("back");
    }

    try {
        let transporter = nodemailer.createTransport({
            service: "hotmail.com",
            port: 587,
            secure: false,  // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_HOST,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let info = await transporter.sendMail({
            from: `"Ankit Biswal" <${process.env.EMAIL_HOST}>`, // sender address
            to: process.env.MAIL_RECEIVE, // list of receivers
            subject: "Testing nodemailer for contact us", // Subject line
            text: "Hello World!", // plain text body
            html: `<h1>Message from contact us form</h1><br><p>Message from <a href="mailto:${email}">${username}</a></p><p><b>${subject}</b></p><h2><b>${query}</b></h2>`, // html body
        });
    } catch (e) {
        req.flash("error", "Check your internet connectivity.");
        return res.redirect("back");
    }
    req.flash("success", "Your query has been successfully submitted. Thankyou for writing to us. This helps us to work more and more harder. Any suggestions are most welcome.")
    res.redirect('/');

}))


// razorpay starts

app.get('/users/:id/createOrder', isLoggedIn, isUserPageOwner, catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate({
        path: 'cart',
        populate: {
            path: 'productId'
        }
    });

    let totalPrice = 0;
    let totalQuantity = 0;
    let totalDiscountedPrice = 0;
    let onSale = false;

    let finalAmount = 0;

    for (let i = 0; i < user.cart.length; i++) {
        totalPrice += (user.cart[i].productId.price * user.cart[i].quantity);
        totalQuantity += user.cart[i].quantity;
        if (user.cart[i].productId.isOnSale) {
            onSale = true;
            totalDiscountedPrice += (user.cart[i].productId.discountPrice * user.cart[i].quantity);
        }
    }

    totalDiscountedPrice = totalDiscountedPrice.toFixed(2);
    if (totalDiscountedPrice == 0 && onSale) {
        totalDiscountedPrice = totalPrice;
    }


    if (onSale) {
        if (totalDiscountedPrice == totalPrice) {
            finalAmount = 0;
        } else {
            finalAmount = totalDiscountedPrice;
        }
    } else {
        finalAmount = totalPrice;
    }

    finalAmount = finalAmount * 100;

    let options = {
        amount: finalAmount,
        currency: "INR"
    }

    razorpay.orders.create(options)
        .then(async (result) => {
            user.order = {
                orderId: result.id,
                amount: result.amount
            }
            await user.save();
            return res.redirect(`/users/${req.params.id}/checkout`);
        })
        .catch((err) => {
            return next(err);
            return res.send("error");
        })


}))

app.get('/users/:id/checkout', isLoggedIn, isUserPageOwner, catchAsync(async (req, res, next) => {

    const user = await User.findById(req.params.id).populate({
        path: 'cart',
        populate: {
            path: 'productId'
        }
    }).populate({
        path: 'addresses'
    });

    let totalPrice = 0;
    let totalQuantity = 0;
    let totalDiscountedPrice = 0;
    let onSale = false;

    let finalAmount = 0;

    for (let i = 0; i < user.cart.length; i++) {
        totalPrice += (user.cart[i].productId.price * user.cart[i].quantity);
        totalQuantity += user.cart[i].quantity;
        if (user.cart[i].productId.isOnSale) {
            onSale = true;
            totalDiscountedPrice += (user.cart[i].productId.discountPrice * user.cart[i].quantity);
        }
    }

    totalDiscountedPrice = totalDiscountedPrice.toFixed(2);
    if (totalDiscountedPrice == 0 && onSale) {
        totalDiscountedPrice = totalPrice;
    }


    if (onSale) {
        if (totalDiscountedPrice == totalPrice) {
            finalAmount = 0;
        } else {
            finalAmount = totalDiscountedPrice;
        }
    } else {
        finalAmount = totalPrice;
    }

    finalAmount = finalAmount * 100;

    if (!user.order.orderAddress) {
        return res.render("user/checkout", { user, finalAmount, totalPrice, totalDiscountedPrice, totalQuantity, onSale, keyId: process.env.RAZORPAY_KEY_ID, addressAdded: false })
    } else {
        return res.render("user/checkout", { user, finalAmount, totalPrice, totalDiscountedPrice, totalQuantity, onSale, keyId: process.env.RAZORPAY_KEY_ID, addressAdded: true })
    }
}))

app.get('/user/:id/orderconfirm', isLoggedIn, isUserPageOwner, (req, res, next) => {
    res.render('user/orderconfirm');
})

app.post('/checkout', isLoggedIn, hasOrderedYet, catchAsync(async (req, res, next) => {

    razorpay.payments.fetch(req.body.razorpay_payment_id).then(async (doc) => {
        const purchase = {
            paymentId: doc.id,
            amount: doc.amount,
            status: doc.status
        }
        req.user.purchases.push(purchase);
        for (let product of req.user.cart) {
            const eachproduct = await Product.findById(product.productId);
            eachproduct.salesCompleted += product.quantity;
            await eachproduct.save();
            req.user.purchasedProducts.push(product.productId);
        }
        req.user.cart = [];
        req.user.order = {
            orderId: "",
            amount: 0,
            orderAddress: null
        }
        await req.user.save();
        return res.redirect(`/user/${req.user._id}/orderconfirm`);

    })
        .catch((Err) => {
            return res.send("error");
        })
}))

app.post('/user/:id/saveaddress/:addId', isLoggedIn, isUserPageOwner, catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate({
        path: 'cart',
        populate: {
            path: 'productId'
        }
    }).populate({
        path: 'addresses'
    });

    const address = await Address.findById(req.params.addId);

    user.order.orderAddress = address._id;
    await user.save();
    // console.log(user);

    return res.redirect(`/users/${req.params.id}/checkout`);

}))

app.post('/user/:id/addaddress', isLoggedIn, isUserPageOwner, catchAsync(async (req, res, next) => {
    // console.log("Post request!!!");
    const addressSchemaJoi = Joi.object({
        country: Joi.string().required().escapeHTML(),
        fullname: Joi.string().required().escapeHTML(),
        mobileNumber: Joi.number().required().min(0),
        pincode: Joi.number().required().min(0),
        addressLineOne: Joi.string().required().escapeHTML(),
        addressLineTwo: Joi.string().required().escapeHTML(),
        city: Joi.string().required().escapeHTML(),
        state: Joi.string().required().escapeHTML(),
        addresstype: Joi.string().valid("Home", "Office").required().escapeHTML()
    })

    const { country = "India", fullname, mobileNumber, pincode, addressLineOne, addressLineTwo, landmark = "", city, state, addresstype = "Home" } = req.body;
    const newAddress = {
        country,
        fullname,
        mobileNumber,
        pincode,
        addressLineOne,
        addressLineTwo,
        city,
        state,
        addresstype
    }


    const { error } = addressSchemaJoi.validate(newAddress);

    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        req.flash("error", msg);
        return res.redirect("back");
    }
    newAddress.landmark = landmark;
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ExpressError("User Not Found", 404));
    }

    const address = await Address.create(newAddress);
    user.addresses.push(address);
    user.order.orderAddress = address._id;
    await user.save();
    return res.redirect(`/users/${req.params.id}/checkout`);
}))

// razorpay ends

app.use('/products', productRoutes);
app.use('/', reviewRoutes);
app.use('/', userRoutes);
app.use('/', addressRoutes)



app.use('*', (req, res) => {
    res.render("pagenotfound");
})

app.use((err, req, res, next) => {
    if (err.name == "CastError") {
        err.message = "Not Found";
        req.flash("error", "Not Found");
        return res.redirect("/");
    }
    if (!err.message) err.message = "Oh No! Something went wrong."
    // res.render("errorTemplate", { err });
    req.flash("error", "Error!!! This could be because of accessing something which you are not supposed to.");
    res.redirect("/");
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started at ${port}!!`));