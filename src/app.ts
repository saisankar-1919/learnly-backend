import express, { Request, Response } from "express";
import prisma from "./helpers/prismaClient";
const app = express();
app.use(express.json());
const port = process.env.PORT || 3001;

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const tutorRoutes = require("./routes/tutor");

// Middleware
app.use(express.json());

app.use("/api", userRoutes);
app.use("/admin/api", adminRoutes);
app.use("/tutor/api", tutorRoutes);

const server = app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

server.on("error", (err) => {
  console.error(`Failed to start the server: ${err.message}`);
});
