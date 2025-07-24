const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "defaultsecret";
const refreshSecret = process.env.JWT_REFRESH_SECRET || "refreshsecret";

exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION || "15m",
  });
};

exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, refreshSecret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION || "7d",
  });
};

exports.verifyAccessToken = (token) => {
  return jwt.verify(token, secret);
};

exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshSecret);
};
