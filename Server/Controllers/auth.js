// const User = require("../Models/Users");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   try {
//     //code
//     // 1 checkUser
//     const { name, password } = req.body;
//     var user = await User.findOne({ name });

//     if (user) {
//       return res.send("This Email already Used!!").status(400);
//     }

//     // 2 Encrypt
//     const salt = await bcrypt.genSalt(10);
//     user = new User({
//       name,
//       password,
//     });

//     user.password = await bcrypt.hash(password, salt);
//     // 3 save
//     await user.save();
//     res.send("Register success!");

//     res.send(req.body);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Sever error");
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     //code
//     //1 check user
//     const { name, password } = req.body;
//     var user = await User.findOneAndUpdate({ name }, { new: true });
//     console.log(user);
//     if (user) {
//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         return res.status(400).send("Password  invalid!!");
//       }

//       //2 Payload
//       var payload = {
//         user: {
//           name: user.name,
//           role: user.role,
//         },
//       };
//       //3generate token
//       jwt.sign(payload, "jwtsecret", { expiresIn: 300 }, (err, token) => {
//         if (err) throw err;
//         res.json({ token, payload });
//       });
//     } else {
//       return res.status(400).send("User not found!!");
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Sever error");
//   }
// };

// exports.currentUser = async(req,res) =>{
//   try{
//     //code
//     console.log('currentUser',req.user)
//     const user = await User.findOne({name:req.user.name})
//     .select('-password')
//     .exec()
//     res.send(user)
//   }catch(err){
//     console.log(err);
//     res.status(500).send("Server Error.")
//   }
// }
//******************************original code***************************************** */

const User = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    //code
    // 1 checkUser
    const { email, username, password } = req.body;
    var user = await User.findOne({ email });

    if (user) {
      return res.send("This Email already Used!!").status(400);
    }

    // 2 Encrypt
    const salt = await bcrypt.genSalt(10);
    user = new User({
      email,
      username,
      password,
    });

    user.password = await bcrypt.hash(password, salt);
    // 3 save
    await user.save();
    res.send("Register success!");

    res.send(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).send("Sever error");
  }
};

exports.login = async (req, res) => {
  try {
    //code
    //1 check user
    const { email, password } = req.body;
    var user = await User.findOneAndUpdate({ email }, { new: true });
    console.log(user);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.send("Password  invalid!!").status(400);
      }

      //2 Payload
      var payload = {
        user: {
          username: user.username,
          role: user.role,
        },
      };
      console.log("This is payload :", payload);

      //3generate token
      jwt.sign(payload, "jwtsecret", { expiresIn: 3000 }, (err, token) => {
        if (err) throw err;

        res.json({ token, payload });
      });
    } else {
      return res.send("User not found!!").status(400);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Sever error");
  }
};

exports.currentUser = async (req, res) => {
  try {
    //code
    console.log("currentUser", req.user);
    const user = await User.findOne({ name: req.user.name })
      .select("-password")
      .exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error.");
  }
};
