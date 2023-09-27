const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
    },

    isVerified: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  console.log("user", user);
  const encryptedPassword = bcrypt.hashSync(user.password, 10);
  user.password = encryptedPassword;
  next();
});

UserSchema.methods.comparePassword = function compare(password) {
  console.log("password ", password);
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.genJWT = function generate() {
  return JWT.sign({ id: this._id, email: this.email }, JWT_KEY, {
    expiresIn: "1h",
  });
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
