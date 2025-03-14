import { Response, Request } from "express";
import type { User } from "../types/user";
import UserModel from "../models/user.model";

const getUser = async (req: Request, res: Response) => {
  const users = await UserModel.getUsers();
  res.status(200).json(users);
};

const addUser = async (req: Request<{}, {}, Omit<User, "id">>, res: Response) => {
  const newUser = await UserModel.createUser(req.body);
  if (newUser) {
    req.session!.user = newUser;
    res.status(200).json(newUser);
  } else {
    res.status(400).json({ message: "User already exists" });
  }
};

const searchUserByUsername = async (req: Request<{}, {}, string>, res: Response) => {
  const username = req.body;
  const users = await UserModel.searchUserByUsername(username);
  if (users.length !== 0) {
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const loginUser = async (req: Request<{}, {}, { username: string; password: string }>, res: Response) => {
  const { username, password } = req.body;
  const user = await UserModel.login(username, password);
  if (user) {
    req.session!.user = user;
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
};

const logoutUser = (req: Request, res: Response) => {
  req.session = null;
  res.status(200).json({ message: "Logged out" });
};

const getUserByCookie = async (req: Request, res: Response) => {
  if (req.session && req.session.user) {
    const user = await UserModel.getUserByUsername(req.session.user.username);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default { getUser, addUser, searchUserByUsername, loginUser, logoutUser, getUserByCookie };
