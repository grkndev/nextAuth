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
  if (req.method === "POST") {
    connectDB().catch((err) =>
      res.status(500).json({ message: "Internal Server Error" })
    );
    if (!req.body.email || !req.body.password)
      res.status(400).json({ message: "Invalid request method" });
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(200)
          .json({ message: "Incorrect password", success: false });
      }

      res.status(200).json({ message: "Login successful", success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to login", success: false });
    }
  } else {
    res.status(400).json({ message: "Invalid request method" });
  }
};
export default handler;
