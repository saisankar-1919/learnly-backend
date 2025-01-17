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
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("args: ", args);
    try {
        const { name, email, phone, password } = args;
        // Check for existing user
        const existingUser = yield prismaClient_1.default.users.findFirst({
            where: { email },
        });
        if (existingUser) {
            throw new Error(JSON.stringify({ custom_error: "User already exists with this email" }));
        }
        // Create a new user
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
        console.error("Error during signup:", error);
        let errorMessage = "Something went wrong"; // Default error message
        // Check if the error has a `custom_error` property
        try {
            const parsedError = JSON.parse(error.message || "{}");
            if (parsedError.custom_error) {
                errorMessage = parsedError.custom_error;
            }
        }
        catch (parseError) {
            console.error("Error parsing error message:", parseError);
        }
        // Use a localized error message if available
        if (req === null || req === void 0 ? void 0 : req.t) {
            errorMessage = req.t("something_went_wrong");
        }
        throw new Error(JSON.stringify({ custom_error: errorMessage }));
    }
});
exports.default = signup;
//# sourceMappingURL=signup.js.map