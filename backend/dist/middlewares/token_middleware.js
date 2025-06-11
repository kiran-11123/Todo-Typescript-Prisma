"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]; // Bearer <token>
        if (!token) {
            res.status(401).json({ message: 'Access token required' });
            return;
        }
        jsonwebtoken_1.default.verify(token, 'kiran', (err, decoded) => {
            if (err) {
                res.status(403).json({ message: 'Invalid token' });
                return;
            }
            req.user = decoded;
            next();
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Token validation failed' });
    }
}
