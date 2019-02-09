var express = require('express');
var router = express.Router();
const jsonParser = express.json();
var passport = require('passport');

router.post('/login', jsonParser, function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            console.log("---- login fail ----")
            console.dir(req);
            return res.status(403).send("Not authenticated"); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            console.log("---- login ok ----")
            return res.status(200).send("ok");
        });
    })(req, res, next);
});
router.get('/logout',  function(req, res){
    req.logout();
    res.status(200).send("Logged out");
});


module.exports = router;