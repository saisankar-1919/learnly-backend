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
const signup = (args, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("args:", args);
        console.log("req:", req);
    }
    catch (error) {
        throw new Error(JSON.stringify({ custom_error: req.t("user_not_exist") }));
    }
});
exports.default = signup;
//# sourceMappingURL=signup.js.map