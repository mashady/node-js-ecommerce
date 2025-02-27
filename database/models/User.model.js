import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: () => {
      return this.provider !== "email" ? false : true;
    },
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
  },
  /*seller:{
      type: Schema.Types.ObjectId,
      ref: 'Seller',
      default: null
  },*/
  provider: {
    type: String,
    required: true,
    default: "email",
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "seller"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  //resetPasswordToken: {}, => TODO
  //resetPasswordExpires: {}, => TODO
  createdAt: Date,
});

export const userModel = mongoose.model("User", userSchema);
