const express = require("express");

const { graphqlHTTP } = require("express-graphql");

const router = express.Router();
import schema from "../controllers/auth/schema";
import resolver from "../controllers/auth/resolver";

router.use(
  "/admin",
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
    //customFormatErrorFn: errorHandling,
  })
);

module.exports = router;
