var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const User=require("../../models/User")

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ 'email':username })
            .then((user) => {
                if(!user || !user.validatePassword(password)) {
                    return done(null, false, { errors: { 'email or password': 'is invalid' } });
                }
                return done(null, user);
            }).catch(done);
    }));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
