const mongoose = require("mongoose");
const express = require("express");
const path=require("path");
const app = express();
const  cors=require('cors');
const userAuth=require('./routes/userAuth');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const usersRouter=require("./routes/usersRouter");
const userRouter=require("./routes/userRouter");
const index=require('./routes/index');
app.use(express.static(__dirname + "/public"));

require("./config/Auth");
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var session = require("express-session"),
    bodyParser = require("body-parser");
app.use(session({ secret: 'passport-secrets', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


//---------------------
app.get('/login',function (req,res) {
    res.redirect("loginForm.html")
});


const urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/loginn1',urlencodedParser ,function (req,res) {
    User.findOne({ email:req.body.email })
        .then((user) => {
            console.log("Email1 : "+ user.email);
            if(!user || !user.validatePassword(req.body.password)) {
                console.log("bad");
            }
            else
                console.log("ok");
        });
});

app.post('/loginn',  passport.authenticate('local', { successRedirect:'/', //'AddProductForm.html',
    failureRedirect: '/login' }));

app.get("/secret",function (req,res) {
    if(req.user)
        res.send("Okkkk");
    else
        res.send("No");
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.use('/api/users', usersRouter);
app.use('/api/auth', userAuth);
app.use('/user', userRouter);
app.use('/', index);

// app.get("/",function (req,res) {
//     //res.sendFile('index.html')
//     //res.render("index",{user:req.user});
//     res.send("Mainnnnn ")
// })
mongoose.connect("mongodb://localhost:27017/NormalUserDB", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(5000, function(){
        console.log("Сервер ожидает подключения...");
    });
});




