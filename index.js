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
    { isLoggedIn, isAdmin } = require("./middlewares"),
    nodemailer = require("nodemailer"),
    mongoSanitize = require('express-mongo-sanitize'),
    MongoStore = require("connect-mongo")(session);


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
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true
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

// including success and error messages in every request.
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.warning = req.flash("warning");
    res.locals.info = req.flash("info");
    res.locals.currUser = req.user;
    next();
})


app.get('/', catchAsync(async (req, res, next) => {
    const products = await Product.find({}).limit(6);
    // console.log(products.length);
    let percentageOff = (100 - Math.ceil((products[0].discountPrice / products[0].price) *
        100));
    const latestPdts = await Product.find({}).sort({ date: -1 }).limit(4);
    // console.log(latestPdts);
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

    // console.log(totalProducts, totalSales, totalUsers);
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
        // throw new ExpressError(msg, 400);
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

        // console.log("Message sent: %s", info.messageId);
    } catch (e) {
        req.flash("error", "Check your internet connectivity.");
        return res.redirect("back");
    }
    req.flash("success", "Your query has been successfully submitted. Thankyou for writing to us. This helps us to work more and more harder. Any suggestions are most welcome.")
    res.redirect('/');

}))

app.use('/products', productRoutes);
app.use('/', reviewRoutes);
app.use('/', userRoutes);
app.use('/', addressRoutes)



app.use('*', (req, res) => {
    res.render("pagenotfound");
})

app.use((err, req, res, next) => {
    // console.log(err.name);
    if (err.name == "CastError") {
        err.message = "Not Found";
        return res.render("errorTemplate", { err });
    }
    if (!err.message) err.message = "Oh No! Something went wrong."
    res.render("errorTemplate", { err });
})

const port = process.env.PORT;
app.listen(port || 3000, () => console.log(`Server started at ${port}!!`));