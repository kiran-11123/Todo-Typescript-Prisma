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
const router = express_1.default.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, mobile, password } = req.body;
        const check = yield prisma_1.default.user.findUnique({
            where: {
                email: email
            }
        });
        if (mobile.length != 10) {
            res.json({
                message: "Please Enter 10 digit mobile number"
            });
        }
        if (check) {
            res.status(200).json({
                message: "User already Registered Please Login"
            });
        }
        const hashedpassword = yield bcrypt.hash(password, 10);
        const data = yield prisma_1.default.user.create({
            data: {
                email,
                mobile,
                password: hashedpassword
            }
        });
        if (data) {
            res.status(200).json({
                message: "User Registered successfully"
            });
        }
        else {
            res.json({
                message: "Server Error"
            });
        }
    }
    catch (er) {
        res.status(400).json(er);
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const email_check = yield prisma_1.default.user.findUnique({
            where: {
                email: email
            }
        });
        if (!email) {
            res.status(400).json({
                message: "You dont have account please create "
            });
        }
        const get_password = yield prisma_1.default.user.findUnique({
            where: {
                email: email
            },
            select: {
                password: true
            }
        });
        const comparing_password = yield bcrypt.compare(password, get_password);
        if (!comparing_password) {
            res.json({
                message: "Password is Wrong "
            });
        }
        if (email_check !== null) {
            const auth_token_credentials = { email: email_check.email, id: email_check.id, mobile: email_check.mobile };
            const token = jwt.sign(auth_token_credentials, "kiran", {
                expiresIn: "1h"
            });
            res.status(200).json({ message: "Login Successful", token: token });
        }
        else {
            res.status(400).json({
                message: "Something went wrong...."
            });
        }
    }
    catch (er) {
        res.status(400).json({
            message: "Server Error"
        });
    }
}));
exports.default = router;
