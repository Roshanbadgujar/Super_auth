const express = require('express');
const userRoutes = require('./routes/user.route');
const gmailRoutes = require('./routes/gmail.route')
const googleRoutes = require('./routes/google.routes')
const cookieParser = require('cookie-parser');
const passport = require("passport");
const app = express();

require("./config/passport");
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());


app.use('/api/auth', userRoutes);
app.use('/gmail', gmailRoutes)
app.use('/auth', googleRoutes)


module.exports = app;