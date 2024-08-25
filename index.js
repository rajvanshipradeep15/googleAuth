const passport = require('passport');
const express = require('express');
const session = require('express-session');

require('./auth');

const app = express();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);

}
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
}));

/*app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});*/

app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        //req.session.destroy();
        res.send('Goodbye!');
  });

});



app.get('/auth/failure', (req, res) => {
    res.send('something went wrong....');
});


app.get('/protected', isLoggedIn, (req, res) =>{
    res.send(`Hello! ${req.user.displayName}`);
})

app.listen(8000, () => console.log('Listening on: 6000'));
