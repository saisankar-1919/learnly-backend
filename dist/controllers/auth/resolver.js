"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signin_1 = __importDefault(require("./modules/signin"));
const signup_1 = __importDefault(require("./modules/signup"));
const resolver = {
    signin: signin_1.default,
    signup: signup_1.default,
};
exports.default = resolver;
//# sourceMappingURL=resolver.js.map