//● Collection 4: Login/Signup
// UserId: string (CharField)
// Password : string(CharField)
// Email :  string(CharField)
// DOB : Date
// FullName :  string(CharField)
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    //     userId: {
    //       type: String,
    //       required: [true, "User ID is required"],
    //       unique: true,
    //       trim: true,
    //       minlength: [4, "User ID must be at least 4 characters long"],
    //     },
    firstname: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
