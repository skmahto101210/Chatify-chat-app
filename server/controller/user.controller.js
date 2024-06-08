import { User } from "../model/user.model.js";
import { generateToken } from "../config/genrateTokenFunction.js";

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(401).json({
        message: "All necessary input fields have not been filled",
        status: false,
      });
      return;
    }

    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        message: "User has been login successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res
        .status(401)
        .json({ message: "Invalid Username and Password", status: false });
      return;
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(401).json({
        message: "All necessary input fields have not been filled ",
        status: false,
      });
      return;
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(403).send({ message: "Email Already Exists", status: false });
      return;
    }

    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      res
        .status(403)
        .json({ message: "UserName Already Exists", status: false });
      return;
    }

    const user = await User.create({ username, email, password });
    if (user) {
      res.status(201).json({
        message: "User has been registered successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400).json({
        message:
          "User has not been registered successfully!! something went wrong",
        status: false,
      });
      return;
    }
  } catch (error) {
    res.status(401).json({ message: error.message });

    next();
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "1" } },
            { email: { $regex: req.query.search, $options: "1" } },
          ],
        }
      : {};
    const users = await User.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    res.send(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
    return;
  }
};

export { loginUser, registerUser, fetchAllUsers };
