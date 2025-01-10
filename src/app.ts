import express, { Request, Response } from "express";
import prisma from "./helpers/prismaClient";
const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const tutorRoutes = require("./routes/tutor");

app.use("/api", userRoutes);
app.use("/admin/api", adminRoutes);
app.use("/tutor/api", tutorRoutes);

// Example route: Create a user
app.post("/create-user", async (req: Request, res: Response) => {
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

app.get("/users", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const users = await prisma.users.findMany();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const server = app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

server.on("error", (err) => {
  console.error(`Failed to start the server: ${err.message}`);
});
