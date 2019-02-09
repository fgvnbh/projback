var express = require('express');
var router = express.Router();
var util=require("util");
const Users=require("../models/Users");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = express.json();
const mongoose = require("mongoose");

router.post('/add', jsonParser, function(req, res) {
    try {
        let users=req.body.users;
        let user = new Users({
            name: users.name,
            age: users.birth,
            description: users.description,
            photoURL: users.photo
        });
        user.save(function (err) {
            res.json({error: err});
        });
    }
    catch (err) {
        res.send(err);
    }
});
router.get('/', function(req, res) {
    Users.find({}, function(err, users){
        if(err) {
            console.log(err);
            res.json({error:"Дані не завантажено"});
            return;
        }
        console.log(util.inspect(users));
        res.json(users);
    });
});

module.exports = router;