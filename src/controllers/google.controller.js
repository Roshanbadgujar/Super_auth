const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt");

exports.sendToken = (req, res) => {
  const user = req.user;
  const payload = { id: user._id };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .redirect(process.env.CLIENT_URL);
};
