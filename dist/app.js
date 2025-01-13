"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3001;
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const tutorRoutes = require("./routes/tutor");
// Middleware
app.use(express_1.default.json());
app.use("/api", userRoutes);
app.use("/admin/api", adminRoutes);
app.use("/tutor/api", tutorRoutes);
const server = app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});
server.on("error", (err) => {
    console.error(`Failed to start the server: ${err.message}`);
});
//# sourceMappingURL=app.js.map