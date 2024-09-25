import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    username: String,
    password: String,
    role: {
      type: String,
      enum: ["superadmin", "admin", "baak"],
      default: "admin",
    },
    avatar: String,
    avatarPublicId: String,
    phone: { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
