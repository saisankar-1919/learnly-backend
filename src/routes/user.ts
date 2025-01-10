import { Router, Request, Response } from "express";
import prisma from "../helpers/prismaClient";
const { graphqlHTTP } = require("express-graphql");

const router = Router();

router.use(
  "/auth",
  graphqlHTTP({
    schema: require("../controllers/auth/schema"),
    rootValue: require("../controllers/auth/resolver"),
    graphiql: true,
    //customFormatErrorFn: errorHandling,
  })
);

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const newUser = await prisma.users.create({
      data: { name, email },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
