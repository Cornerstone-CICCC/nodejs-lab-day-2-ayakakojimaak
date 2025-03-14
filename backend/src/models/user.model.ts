import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import type { User } from "../types/user";
import { log } from "console";

class UserModel {
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  createUser(user: Omit<User, "id">): User | false {
    const { username, password, firstname, lastname } = user;
    const isExist = this.users.find((user) => user.username === username);
    if (isExist) return false;
    const newUser: User = {
      id: uuidv4(),
      username,
      password: bcrypt.hashSync(password, 10),
      firstname,
      lastname,
    };
    this.users.push(newUser);
    log(this.users);
    return newUser;
  }

  searchUserByUsername(username: string): User[] | [] {
    return this.users.filter((user) => user.username.includes(username));
  }

  getUserByUsername(username: string): User | false {
    log(this.users);
    const user = this.users.find((user) => user.username === username);
    return user ? user : false;
  }

  login(username: string, password: string): User | false {
    const user = this.getUserByUsername(username);

    if (!user) return false;
    log(user.password);
    if (bcrypt.compareSync(password, user.password)) return user;
    return false;
  }
}

export default new UserModel();
