import { AuthRepository } from "../repositories/auth.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export class AuthService {
  constructor() {
    this.repository = new AuthRepository();
  }

  async login(credentials) {
    const { username, email, password } = credentials;

    let user;
    if (email) {
      user = await this.repository.findUserByEmail(email);
    } else if (username) {
      user = await this.repository.findUserByUsername(username);
    } else {
      throw new Error("Email or username is required");
    }
    if (!email && !username) {
      throw new Error("Email or username is required");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET
    );

    delete user.password;

    return {
      user,
      token,
    };
  }
  async register(userData) {
    const requiredFields = ["username", "password"];
    for (const field of requiredFields) {
      if (!userData[field]) {
        throw new Error(`${field} is required`);
      }
    }
    const usernameRules = /^[a-zA-Z0-9]+$/;
    if (!usernameRules.test(userData.username)) {
      throw new Error("Username must contain only letters and numbers");
    }
    const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRules.test(userData.email)) {
      throw new Error("Email is not valid");
    }
    const passwordRules = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRules.test(userData.password)) {
      throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    }

    const existingUsername = await this.repository.findUserByUsername(
      userData.username
    );
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    if (userData.email) {
      const existingEmail = await this.repository.findUserByEmail(
        userData.email
      );
      if (existingEmail) {
        throw new Error("Email already exists");
      }
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUserData = {
      username: userData.username,
      password: hashedPassword,
      name: userData.name || userData.username,
      email: userData.email || null,
      phone: userData.phone || null,
      photo_url: userData.photo_url || null,
    };

    const newUser = await prisma.users.create({
      data: newUserData,
    });

    delete newUser.password;

    return newUser;
  }
}