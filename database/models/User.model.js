import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: () => {
        return this.provider !== "email" ? false : true;
      },
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      reuied: true,
      minlength: 6,
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
  },
  { timestamps: true, versionKey: false }
);

export const userModel = mongoose.model("User", userSchema);
