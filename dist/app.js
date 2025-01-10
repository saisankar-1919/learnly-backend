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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prismaClient_1 = __importDefault(require("./helpers/prismaClient"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3001;
// Example route: Create a user
app.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const newUser = yield prismaClient_1.default.users.create({
            data: { name, email },
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const users = yield prismaClient_1.default.users.findMany();
        res.status(201).json(users);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
const server = app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});
server.on("error", (err) => {
    console.error(`Failed to start the server: ${err.message}`);
});
//# sourceMappingURL=app.js.map