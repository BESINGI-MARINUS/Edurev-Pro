const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [
        true,
        'Please provide your full names as in your birth certificate!',
      ],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email!'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email!'],
    },
    matricule: {
      type: String,
      required: [true, 'Please provide your matricule!'],
      unique: true,
      validate: {
        validator: function (v) {
          return /^(LMUI-?\d+[A-Z]+[0-9]+|LMU-\d+[A-Z]+[0-9]+)$/.test(v);
        },
        message: 'Invalid Matricule.',
      },
    },
    academicYear: {
      type: String,
      require: [true, 'Please input your academic year (e.g 2023/2024)'],
      default: `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`,
    },
    role: {
      type: String,
      enum: {
        values: ['student', 'lecturer', 'admin'],
        message: "Role must be either 'student','lecturer' or 'admin'",
      },
      default: 'student',
    },
    school: {
      type: String,
      enum: {
        values: [
          'Engineering and Technology',
          'Agriculture',
          'Medical and Biomedical science',
        ],
        message: 'Invalid. Please enter a valid school name.',
      },
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // Only hash the matricule if it has been modified (or is new)
  if (!this.isModified('matricule')) return next();

  this.matricule = await bcrypt.hash(this.matricule, 12);
});

userSchema.methods.correctMatricule = async function (
  enteredMatricule,
  userMatricule,
) {
  return await bcrypt.compare(enteredMatricule, userMatricule);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
