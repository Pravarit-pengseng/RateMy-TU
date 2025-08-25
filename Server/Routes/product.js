const express = require("express");
const router = express.Router();
const {
  read,
  list,
  create,
  update,
  remove,
} = require("../Controllers/product");

//middleware
const { auth } = require("../Middleware/auth");

//http://localhost:5000/api/product
router.get("/product", list); //write ',auth'
//one product
router.get("/product/:id", read);
router.post("/product", create);
router.put("/product/:id", update);
router.delete("/product/:id", remove);
module.exports = router;
