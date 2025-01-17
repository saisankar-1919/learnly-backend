import { buildSchema } from "graphql";

const schema = buildSchema(`
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

export default schema;
