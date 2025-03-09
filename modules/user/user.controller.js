import { userModel } from "../../database/models/user.model.js";
import { orderModel } from "../../database/models/order.model.js";
import mongoose from "mongoose";
import { sendEmail } from "../../services/email.js";
const getUsers = async (req, res) => {
  const { page = 1, limit = 20 } = req.query; //donot forget to change the limit <==
  const skip = (page - 1) * limit;
  const user = await userModel
    .find(
      {
        _id: { $ne: req?.user?._id },
      },
      {
        password: 0,
        provider: 0,
        isVerified: 0,
        googleId: 0,
      }
    )
    .sort("-created")
    .limit(limit * 1)
    .skip(skip)
    .exec();

  const numberOfUsers = await userModel.countDocuments();
  const totalPages = Math.ceil(numberOfUsers / limit);
  res.json({
    message: "user fetched successfully",
    totalUsers: numberOfUsers,
    totalPages: totalPages,
    page: Number(page),
    skip: Number(skip),
    data: user,
  });
};
const searchUsers = async (req, res) => {
  const { user = "", page = 1, limit = 20 } = req.query;

  const regex = new RegExp(user, "i");

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  let filter = {};
  if (user) {
    filter = {
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { email: { $regex: regex } },
      ],
    };
  }

  const skip = (pageNumber - 1) * limitNumber;

  try {
    const users = await userModel
      .find(filter, {
        password: 0,
        provider: 0,
        isVerified: 0,
        googleId: 0,
      })
      .sort("-created")
      .limit(limitNumber)
      .skip(skip)
      .exec();

    const totalUsers = await userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limitNumber);
    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found matching.",
        totalUsers,
        totalPages,
        page: pageNumber,
        data: [],
      });
    }
    res.json({
      message: "Users fetched successfully",
      totalUsers,
      totalPages,
      page: pageNumber,
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};
// same way we will handle the user reviews
const userPfoile = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID provided" });
    }

    const userID = new mongoose.Types.ObjectId(req.user._id);

    console.log("Fetching user profile for ID:", userID);

    const userProfileData = await userModel.aggregate([
      { $match: { _id: userID } },

      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "user",
          as: "orders",
        },
      },

      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "userID",
          as: "reviews",
        },
      },

      {
        $project: {
          password: 0,
          __v: 0,
        },
      },
    ]);

    if (!userProfileData || userProfileData.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user: userProfileData[0],
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const userID = req.user?._id;
    if (!userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No update data provided",
      });
    }
    const user = await userModel.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updates = { ...req.body };

    if (updates.currentPassword && updates.newPassword) {
      const isMatch = await bcrypt.compare(
        updates.currentPassword,
        user.password
      );

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect current password" });
      }

      updates.password = await bcrypt.hash(updates.newPassword, 10);

      delete updates.currentPassword;
      delete updates.newPassword;
    }

    if (updates.email && updates.email !== user.email) {
      const existingEmail = await userModel.findOne({
        email: updates.email,
        _id: { $ne: userID },
      });

      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      try {
        await sendEmail(updates.email);
        updates.isVerified = false;
      } catch (error) {
        return res.status(500).json({
          message: "Failed to send verification email",
          error: error.message,
        });
      }
    }

    if (updates.phoneNumber && updates.phoneNumber !== user.phoneNumber) {
      const existingPhone = await userModel.findOne({
        phoneNumber: updates.phoneNumber,
        _id: { $ne: userID },
      });

      if (existingPhone) {
        return res.status(400).json({ message: "Phone number already exists" });
      }
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(userID, { $set: updates }, { new: true })
      .select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Failed to update user" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while updating user",
      error: error.message,
    });
  }
};

const updateAdministrativeStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const validStatuses = ["approved", "restrict"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Must be either 'approved' or 'restrict'",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        { AdministrativeStatus: status },
        { new: true }
      )
      .select("-password");

    // todo: Add actions based on status change
    if (status === "approved") {
    } else if (status === "restrict") {
    }

    return res.status(200).json({
      message: `User administrative status updated to '${status}' successfully`,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while updating administrative status",
      error: error.message,
    });
  }
};

export {
  getUsers,
  searchUsers,
  userPfoile,
  updateUser,
  updateAdministrativeStatus,
};
