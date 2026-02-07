const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [
      true,
      "Please provide your full names as in your birth certificate!",
    ],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  matricule: {
    type: String,
    required: [true, "Please provide your matricule!"],
    unique: true,
    validate: {
      validator: function (v) {
        return /^(LMUI-?\d+[A-Z]+[0-9]+|LMU\d+[A-Z]+[0-9]+)$/.test(v);
      },
      message: "Invalid Matricule.",
    },
  },
  role: {
    type: String,
    enum: {
      values: ["student", "lecturer", "admin"],
      message: "Role must be either 'student','lecturer' or 'admin'",
    },
    default: "student",
  },
});

userSchema.pre("save", async function (next) {
  // Only hash the matricule if it has been modified (or is new)
  if (!this.isModified("matricule")) return next();

  this.matricule = await bcrypt.hash(this.matricule, 12);
});

const User = mongoose.model("user", userSchema);

module.exports = User;
