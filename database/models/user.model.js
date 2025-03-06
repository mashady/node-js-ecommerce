import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: function () {
        return this.provider === "email";
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
      default: null,
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
      default: "email",
    },
    address: {
      type: String,
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
    AdministrativeStatus: {
      type: String,
      default: "pendding",
      enum: ["pendding", "approved", "restrict"],
    },
    subscribed: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    //resetPasswordToken: {}, => TODO
    //resetPasswordExpires: {}, => TODO
  },
  { timestamps: true, versionKey: false }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

export const userModel = mongoose.model("User", userSchema);
