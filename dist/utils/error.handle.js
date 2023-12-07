"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (res, error) => {
    res.status(500).send({ error });
};
exports.handleError = handleError;
