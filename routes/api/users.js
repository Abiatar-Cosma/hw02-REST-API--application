const express = require("express");
const router = express.Router();

const signup = require("../../controllers/users/signup");
const login = require("../../controllers/users/login");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
