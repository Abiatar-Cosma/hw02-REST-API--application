const express = require("express");
const router = express.Router();

const signup = require("../../controllers/users/signup");
const login = require("../../controllers/users/login");
const logout = require("../../controllers/users/logout");
const authenticate = require("../../middlewares/authenticate");
const getCurrent = require("../../controllers/users/getCurrent");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrent);

module.exports = router;
