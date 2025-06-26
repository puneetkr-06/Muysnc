const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { firebaseUid, name, email, photoURL } = req.body;

    let existingUser = await User.findOne({ firebaseUid });
    if (existingUser) return res.status(200).json({ message: "User already exists", user: existingUser });

    const newUser = await User.create({
   firebaseUid,
   name,
   email,
   photoURL,
    });


    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Server Error", detail: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { firebaseUid } = req.body;
    const user = await User.findOne({ firebaseUid });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server Error", detail: err.message });
  }
};


module.exports = { registerUser, loginUser};
