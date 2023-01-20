const mongoose = require("mongoose");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      required: true,
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
    },

    phone: {
      type: Number,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.otp;
  delete user.__v;

  return user;
};

userSchema.methods.generateAuthTokens = function async() {
  return jwt.sign({ _id: this._id.toString() }, "userSecret");
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcyrpt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
