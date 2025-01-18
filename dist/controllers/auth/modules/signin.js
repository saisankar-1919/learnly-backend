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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../../../helpers/customError");
const prismaClient_1 = __importDefault(require("../../../helpers/prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signin = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!args.email || !args.password) {
            throw new customError_1.CustomError("Email and password must be provided", "BAD_REQUEST");
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(args.email)) {
            throw new customError_1.CustomError("Invalid email format", "BAD_REQUEST");
        }
        const user = yield prismaClient_1.default.users.findUnique({
            where: { email: args.email },
        });
        if (!user) {
            throw new customError_1.CustomError("User does not exist with this email address", "NOT_FOUND");
        }
        const isPasswordCorrect = yield bcrypt_1.default.compare(args.password, user.password);
        if (isPasswordCorrect) {
            return {
                is_user_exist: true,
                auth_token: user.auth_token,
            };
        }
        else {
            throw new customError_1.CustomError("Password is incorrect", "UNAUTHORIZED");
        }
    }
    catch (error) {
        console.error(error);
        const errorMessage = process.env.NODE_ENV === "production"
            ? "Something went wrong"
            : error.message;
        throw new customError_1.CustomError(errorMessage, error.code || "INTERNAL_SERVER_ERROR");
    }
    finally {
        prismaClient_1.default.$disconnect();
    }
});
exports.default = signin;
//# sourceMappingURL=signin.js.map