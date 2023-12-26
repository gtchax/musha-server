import { Model, Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";

export type TUser = {
  _id: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
};

interface Methods {
    comparePassword(password: string): Promise<boolean>;
  }
  

  const userSchema = new Schema<TUser, {}, Methods>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
      this.password = await hash(this.password, 10)
    }
    done();
  });
  
  userSchema.methods.comparePassword = async function (password) {
    const result = await compare(password, this.password);
    return result;
  };
  
  
  const User = model("User", userSchema) as Model<TUser, {}, Methods>;
  
  export default User;
  