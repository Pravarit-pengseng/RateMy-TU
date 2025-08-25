// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema(
//   {
//     //user data structure
//     name: String,
//     password: {
//       type: String,
//     },
//     role: {
//       type: String,
//       default: "user",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("user", userSchema);


//*********************************** original code *********************************************** */

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    //user data structure
    email: String,
    username: String,
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);