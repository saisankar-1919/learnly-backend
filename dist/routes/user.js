"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const router = express.Router();
const schema_1 = __importDefault(require("../controllers/auth/schema"));
const resolver_1 = __importDefault(require("../controllers/auth/resolver"));
router.use("/signup", graphqlHTTP({
    schema: schema_1.default,
    rootValue: resolver_1.default,
    graphiql: true,
    //customFormatErrorFn: errorHandling,
}));
//# sourceMappingURL=user.js.map