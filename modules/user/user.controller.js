import { userModel } from "../../database/models/user.model.js";
import { orderModel } from "../../database/models/order.model.js";
const getUsers = async (req, res) => {
  const { page = 1, limit = 2 } = req.query; //donot forget to change the limit <==
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
        facebookId: 0,
        subscribed: 0,
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
  const { user = "", page = 1, limit = 2 } = req.query;

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
        facebookId: 0,
        subscribed: 0,
      })
      .sort("-created")
      .limit(limitNumber)
      .skip(skip)
      .exec();

    const totalUsers = await userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limitNumber);

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
  const userID = req.user?._id;
  console.log(userID);
  const user = await userModel.findById(userID, { password: 0 }).lean();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const userOrders = await orderModel.find({ user: userID });
  user.orders = userOrders;
  res.status(200).json({
    message: "user profile fetched successfully",
    user,
  });
};
const updateUser = async (req, res) => {
  const userID = req.user?._id;

  if (req.body.currentPassword && req.body.newPassword) {
    const user = await userModel.findById(userID);
    if (!user)
      return res.status(404).json({
        message: "user not found",
      });

    const isMatch = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    req.body.password = hashedPassword;
    delete req.body.currentPassword;
    delete req.body.newPassword;
  }
  if (req.body.eamil) {
    const existEamil = await userModel.findOne({ email: req.body.email });
    if (existEamil) {
      return res.status(400).json({ message: "Email already exist" });
    } else {
      req.body.isVerified = false;
    }
  }
  const updatedUser = await userModel
    .findByIdAndUpdate(userID, { $set: req.body }, { new: true })
    .select("-password");
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    message: "user updated successfully",
    updatedUser,
  });
};

export { getUsers, searchUsers, userPfoile, updateUser };
