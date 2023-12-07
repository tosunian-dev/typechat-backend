"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.jwtGen = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET || 'A';
const jwtGen = (userId) => {
    const jwt = (0, jsonwebtoken_1.sign)({ userId }, jwt_secret, {
        expiresIn: "99999999d"
    });
    return jwt;
};
exports.jwtGen = jwtGen;
const verifyToken = (token) => {
    const isValid = (0, jsonwebtoken_1.verify)(token, jwt_secret);
    return isValid;
};
exports.verifyToken = verifyToken;
