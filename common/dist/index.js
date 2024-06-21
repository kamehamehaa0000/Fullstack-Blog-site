"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateBody = exports.blogCreateBody = exports.signinBody = exports.signupBody = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupBody = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional(),
});
exports.signinBody = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.blogCreateBody = zod_1.default.object({
    title: zod_1.default.string().min(3),
    content: zod_1.default.string(),
});
exports.blogUpdateBody = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string().min(3).optional(),
    content: zod_1.default.string().optional(),
});
