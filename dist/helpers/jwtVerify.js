"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerifyAsync = void 0;
const jwt = require("jsonwebtoken");
const jwtVerifyAsync = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(new Error(JSON.stringify({ custom_error: "Invalid authentication token" })));
            }
            else {
                resolve(decoded);
            }
        });
    });
};
exports.jwtVerifyAsync = jwtVerifyAsync;
//# sourceMappingURL=jwtVerify.js.map