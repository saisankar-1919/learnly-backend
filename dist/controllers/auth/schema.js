"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = (0, graphql_1.buildSchema)(`
type User {
    id: ID
    name: String
    email: String
    phone: String
    password: String
    auth_token: String
}

type Query {
    signin(auth_token: String!): User!
}

type Mutation {
    signup(name: String!, email: String!, phone: String!, password: String!): User!
}

schema {
    query: Query
    mutation: Mutation
}
`);
exports.default = schema;
//# sourceMappingURL=schema.js.map