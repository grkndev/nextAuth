import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import connectDB from "@/database/conn";
import User from "@/database/models/User";
import bcrypt from "bcryptjs";
const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectDB().catch((err) =>
          res.status(500).json({ message: "Connection Error" })
        );

        const { email, password } = credentials;
        const result = await User.findOne({ email });
        if (!result) throw new Error("User not found");
        const passwordMatch = await bcrypt.compare(password, result.password);
        if (!passwordMatch || result.email !== email)
          throw new Error("Incorrect password or Email");
        return result;
      },
    }),
  ],
};
export default NextAuth(authOptions);
