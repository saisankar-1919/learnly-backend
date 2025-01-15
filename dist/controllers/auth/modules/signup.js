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
const prismaClient_1 = __importDefault(require("../../../helpers/prismaClient"));
const signup = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone } = args;
        //check for existing user
        const existingUser = yield prismaClient_1.default.users.findFirst({
            where: { email: email },
        });
        if (existingUser) {
            throw new Error(JSON.stringify({ custom_error: "User already exist on this email" }));
        }
        else {
            const newUser = yield prismaClient_1.default.users.create({
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                },
            });
            return newUser;
        }
    }
    catch (error) {
        console.log("error:", error);
        // Check if the error has a `custom_error` property
        const parsedError = JSON.parse(error.message || "{}");
        if (parsedError.custom_error) {
            // Re-throw the same error to the caller
            throw error;
        }
        // For all other errors, use the default fallback message
        const errorMessage = (req === null || req === void 0 ? void 0 : req.t)
            ? req.t("something_went_wrong")
            : "User does not exist or an error occurred.";
        throw new Error(JSON.stringify({ custom_error: errorMessage }));
    }
});
exports.default = signup;
//# sourceMappingURL=signup.js.map