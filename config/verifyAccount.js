const localStrategy = require('passport-local').Strategy
const argon2 = require('argon2')
const Account = require('../models/accounts')


module.exports = function (passport) {

    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            Account.findOne({
                email: email
            }).then(async account => {
                if (!account) {
                    console.log('email not found')
                    return done(null, false, { message: 'That email is not registered' });
                }

                const match = await argon2.verify(account.password, password)
                if (match) {
                    return done(null, account)
                } else {
                    console.log('password incorrect')
                    return done(null, false, { message: 'Password is incorrect' })
                }
            });
        })
    );

    passport.serializeUser((account, done) =>{
        done(null, account.id);
    });

    passport.deserializeUser((id, done) =>{
        Account.findById(id,  (err, account) =>{
            done(err, account);
        });
    });
};