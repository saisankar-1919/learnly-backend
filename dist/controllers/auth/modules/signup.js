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
const passwordProtection_1 = require("../../../helpers/passwordProtection");
const prismaClient_1 = __importDefault(require("../../../helpers/prismaClient"));
const customError_1 = require("../../../helpers/customError"); // Importing CustomError
const jwt = require("jsonwebtoken");
const signup = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password } = args;
        const isValidEmail = (email) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        };
        if (!isValidEmail(email)) {
            throw new customError_1.CustomError("Invalid email format", "INVALID_EMAIL_FORMAT");
        }
        const existingUser = yield prismaClient_1.default.users.findFirst({
            where: { email },
        });
        if (existingUser) {
            throw new customError_1.CustomError("User already exists with this email", "USER_EXISTS");
        }
        const newUser = yield prismaClient_1.default.users.create({
            data: {
                name,
                phone,
                email,
                password: yield (0, passwordProtection_1.encryptPassword)(password),
            },
        });
        const userId = newUser.id;
        const authToken = jwt.sign({ user_id: userId, email: newUser.email }, process.env.JWT_SECRET);
        yield prismaClient_1.default.users.update({
            where: { id: userId },
            data: { auth_token: authToken },
        });
        return newUser;
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
exports.default = signup;
//# sourceMappingURL=signup.js.map