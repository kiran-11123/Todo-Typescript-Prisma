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
const prisma_1 = __importDefault(require("../prisma/prisma"));
const express_1 = __importDefault(require("express"));
const token_middleware_1 = require("../middlewares/token_middleware");
const todo_router = express_1.default.Router();
todo_router.get("/get_todos", token_middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user && typeof req.user === "object" && "id" in req.user) {
            const cur_user_id = req.user.id;
            const data = yield prisma_1.default.todo.findMany({
                where: {
                    user_id: cur_user_id
                }
            });
            res.status(200).json(data);
        }
        else {
            res.status(200).json({
                message: "Token Expired"
            });
        }
    }
    catch (er) {
        res.status(400).json({
            message: "Server Error"
        });
    }
}));
todo_router.put("/update_status/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cur_todo_id = req.params;
        const data = prisma_1.default.todo.update({
            where: {
                id: Number(cur_todo_id)
            }, data: {
                status: false
            }
        });
    }
    catch (er) {
        res.status(400).json("Server Error");
    }
}));
todo_router.delete("/delete_todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cur_todo_id = req.params;
        const data = prisma_1.default.todo.delete({
            where: {
                id: Number(cur_todo_id)
            }
        });
    }
    catch (er) {
        res.status(400).json("Server Error");
    }
}));
exports.default = todo_router;
