import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/database/conn";
import User from "@/database/models/User";
import bcrypt from "bcryptjs";
/**
 *
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @returns
 */
const handler = async (req, res) => {
  connectDB().catch((err) => res.json({ message: "Connection Failed" }));
  if (req.method === "POST") {
    if (!req.body.email || !req.body.password)
      res.status(400).json({ message: "Invalid request method" });
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(422)
        .json({ message: "User already exists", success: false });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "User created", success: true });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create user", success: false });
    }
  } else {
    res.status(400).json({ message: "Invalid request method" });
  }
};
export default handler;
