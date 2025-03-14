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
const user_model_1 = __importDefault(require("../models/user.model"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.getUsers();
    res.status(200).json(users);
});
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_model_1.default.createUser(req.body);
    if (newUser) {
        req.session.user = newUser;
        res.status(200).json(newUser);
    }
    else {
        res.status(400).json({ message: "User already exists" });
    }
});
const searchUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body;
    const users = yield user_model_1.default.searchUserByUsername(username);
    if (users.length !== 0) {
        res.status(200).json(users);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_model_1.default.login(username, password);
    if (user) {
        req.session.user = user;
        res.status(200).json(user);
    }
    else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});
const logoutUser = (req, res) => {
    req.session = null;
    res.status(200).json({ message: "Logged out" });
};
const getUserByCookie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session && req.session.user) {
        const user = yield user_model_1.default.getUserByUsername(req.session.user.username);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
});
exports.default = { getUser, addUser, searchUserByUsername, loginUser, logoutUser, getUserByCookie };
