var express = require('express');
var router = express.Router();
const User=require("../models/User");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});


router.post('/add',urlencodedParser , function(req, res) {
    console.dir(req);
    let user=new User({
        email:req.body.email,
    });
    user.setPassword(req.body.password);
    user.save();
    res.redirect('/');
});

router.get('/', function(req, res) {
    User.find({}, function(err, users){
        if(err) return console.log(err);
        console.log(util.inspect(users));
        res.render('users',{'users':users});
    });
});

module.exports = router;
