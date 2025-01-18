"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.code = code;
        this.name = this.constructor.name; // Set the error name to CustomError
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=customError.js.map