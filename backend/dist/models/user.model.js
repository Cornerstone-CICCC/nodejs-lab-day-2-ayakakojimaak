"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const console_1 = require("console");
class UserModel {
    constructor() {
        this.users = [];
    }
    getUsers() {
        return this.users;
    }
    createUser(user) {
        const { username, password, firstname, lastname } = user;
        const isExist = this.users.find((user) => user.username === username);
        if (isExist)
            return false;
        const newUser = {
            id: (0, uuid_1.v4)(),
            username,
            password: bcrypt_1.default.hashSync(password, 10),
            firstname,
            lastname,
        };
        this.users.push(newUser);
        (0, console_1.log)(this.users);
        return newUser;
    }
    searchUserByUsername(username) {
        return this.users.filter((user) => user.username.includes(username));
    }
    getUserByUsername(username) {
        (0, console_1.log)(this.users);
        const user = this.users.find((user) => user.username === username);
        return user ? user : false;
    }
    login(username, password) {
        const user = this.getUserByUsername(username);
        if (!user)
            return false;
        (0, console_1.log)(user.password);
        if (bcrypt_1.default.compareSync(password, user.password))
            return user;
        return false;
    }
}
exports.default = new UserModel();
