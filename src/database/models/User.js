import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
});
const Users = models.User || model("User", UserSchema);
export default Users;