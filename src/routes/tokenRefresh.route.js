const express = require("express");
const router = express.Router();
const { verifyRefreshToken, generateAccessToken } = require("../utils/jwt");

router.post("/refresh-token", (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = verifyRefreshToken(token);

    const newAccessToken = generateAccessToken({ id: decoded.id });

    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 15 * 60 * 1000, // 15 mins
      })
      .json({ success: true, message: "Access token refreshed" });
  } catch (err) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

module.exports = router;
