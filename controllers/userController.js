  const bcrypt = require("bcryptjs/dist/bcrypt");

const User = require("../models/user");

module.exports = {
  register: async (req, res) => {
    try {
      const { email } = req.body;

      let user = await User.findOne({ email });
      if (user) return res.status(400).send({ err: "User already exists" });

      user = new User(req.body);
      await user.save();

      res.send(user);
    } catch (e) {
      res.status(500).send({ err: "Internal Server Error" });
      console.log(e);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({ email });
      if (!user) return res.status(404).send({ err: "Invalid Credentials" });

      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect)
        return res.status(400).send({ err: "Invalid Credentials" });

      const token = user.generateAuthTokens();
      res.send({ user, token });
    } catch (e) {
      res.status(500).send({ err: "Internal Server Error" });
      console.log(e);
    }
  },

  passwordReset: async (req, res) => {
    try {
      const { oldPassword, newPassword, email } = req.body;
      let user = await User.findOne({ email });

      const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);
      if (!isPasswordCorrect)
        return res.status(400).send({ err: "Invalid Credentials" });

      user.password = newPassword;
      await user.save();

      res.send({ msg: "Password Updated" });
    } catch (e) {
      console.log(e);
    }
  },
  updateUserProfile: async (req, res) => {
    try {
      const { firstName, lastName, email, phone } = req.body;
      let user = await User.findOne({ email });
      if (!user) return res.status(400).send({ err: "User not found" });

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.phone = phone;
      await user.save();

      res.send({ msg: "Profile updated successfully!" });
    } catch (e) {
      console.log(e);
    }
  }
};
