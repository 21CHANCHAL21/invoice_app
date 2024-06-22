// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: '7bbda3738891f798712a96741a6f6adf2cfb716663b6984bea34dbd9240850342645890debd938f3ab49331e142ff0988657facf9633f0baa6c81a238c138bbb', resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// Passport Config
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect('http://localhost:3000'); // Adjust this URL as necessary
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:3000'); // Adjust this URL as necessary
  });
});

app.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});

// Your existing endpoints here
const invoices = [
  { id: 1, details: 'Invoice 1 - $100 due' },
  { id: 2, details: 'Invoice 2 - $200 due' },
];

app.get('/api/invoices', (req, res) => {
  res.json(invoices);
});

app.post('/api/trigger-automation', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const payload = await verifyToken(token);
    // Call Zapier webhook
    await axios.post(process.env.ZAPIER_WEBHOOK_URL, {
      user: payload,
      invoices,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
