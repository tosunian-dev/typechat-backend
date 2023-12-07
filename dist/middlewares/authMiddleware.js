"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jwtGen_handle_1 = require("../utils/jwtGen.handle");
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqJwtBearer = req.headers.authorization || ' ';
        const reqJwt = reqJwtBearer.split(' ').pop();
        const tokenIsCorrect = (0, jwtGen_handle_1.verifyToken)(`${reqJwt}`);
        if (!tokenIsCorrect) {
            res.status(401).send("INVALID_SESSION");
        }
        else {
            req.user = tokenIsCorrect;
            next();
        }
    }
    catch (error) {
        res.status(400).send("NOT_VALID_AUTH");
    }
});
exports.checkAuth = checkAuth;
