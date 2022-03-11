const localStrategy = require('passport-local').Strategy
const argon2 = require('argon2')
const Account = require('../models/accounts')

// module.exports = (passport) => {
//     console.log('HELLO?!')
//     passport.use(new localStrategy({ emailField: 'email' }, (email, password, done) => {
//         console.log('ANYONE THERE?!')
//         Account.findOne({ email: email })
//             .then(account => {
//                 if (!account) {
//                     console.log('email not found')
//                     return done(null, false, { message: 'This email is not registered' })
//                 }
//                 const match = argon2.verify(password, account.password)
//                 if (match) {
//                     return done(null, account)
//                 } else {
//                     console.log('password incorrect')
//                     return done(null, false, { message: 'Password is incorrect' })
//                 }
//                 // try {
//                 //   if (await argon2.verify(account.password, password)) {
//                 //     // password match
//                 //   } else {
//                 //     // password did not match
//                 //   }
//                 // } catch (err) {
//                 //   // internal failure
//                 // }
//             })
//             .catch(err => console.log(err))
//     }))

//     passport.serializeUser((account, done) => {
//         done(null, account.id);
//     })

//     passport.deserializeUser((id, done) => {
//         Account.findById(id, (err, account) => {
//             done(err, account);
//         })
//     })
// }

module.exports = function (passport) {
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            console.log('ANYONE THERE?!')
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

    passport.serializeUser(function (account, done) {
        done(null, account.id);
    });

    passport.deserializeUser(function (id, done) {
        Account.findById(id, function (err, account) {
            done(err, account);
        });
    });
};