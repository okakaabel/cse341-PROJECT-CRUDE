const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const app = express();
const cors = require('cors');

const port = 3005

// Environment variable check for robustness
if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET || !process.env.CALLBACK_URL) {
  console.error("❌ Missing GitHub OAuth environment variables.");
  process.exit(1);
}

app.use (bodyParser.json());
app
   .use( session({ 
    secret: "secret",
    resave: false,
    saveUninitialized: true
   }))
   // This is the basic express session({..}) initialization
   .use(passport.initialize())
   // init passport on every route call.
   .use(passport.session())
   // allow passport to use "express-session".
    .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    next();
});

app.use(cors({methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
app.use(cors({orgin: '*'}));
app.use ('/', require('./routes'));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
 //User, findOrCreate((githubId: profile.id), function (err, user) {
   return done(null,profile)
  //}); 
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
 done(null, user);
});

app.get('/', (req, res) => {
    res.send(
        req.session.user !== undefined
            ? `logged in as ${req.session.user.displayName}`
            : 'logged out'
    );
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack || err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});    
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else{
        app.listen(port, () =>  {console.log(`Database is listening and node Running on port ${port}`)});
    }
});
 


