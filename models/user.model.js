import { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
    fullName: {
      type: String,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    userPassword: {
      type: String,
      required: true,
      unique: false,
      min: 5,
    },
    verify: {
        type: Boolean,
        default: false
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.fullName = this.firstName + " " + this.lastName;
  next();
});

userSchema.pre("save", async function (next) {
  this.userPassword = await hash(this.userPassword, 10);
  next();
});

const User = model("User", userSchema);
export default User;
