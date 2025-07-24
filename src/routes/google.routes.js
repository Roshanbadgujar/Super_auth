const express = require('express');
const passport = require("passport");
const router = express.Router()
const { sendToken } = require("../controllers/google.controller");


router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { session: false }), sendToken);

module.exports = router