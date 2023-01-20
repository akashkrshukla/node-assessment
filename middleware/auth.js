const User = require("../models/user");

const jwt = require("jsonwebtoken");

module.exports = {
  userMiddleWare: async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, "userSecret");

      req.user = await User.findOne({
        _id: decoded._id,
      });
      req.token = token;

      next();
    } catch (e) {
      console.log(e);

      res.status(401).send({
        msg: "Please Authenticate",
      });
    }
  }
};
