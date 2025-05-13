const express = require("express");
const router = express.Router();

const signup = require("../../controllers/users/signup");
const login = require("../../controllers/users/login");
const logout = require("../../controllers/users/logout");
const authenticate = require("../../middlewares/authenticate");
const getCurrent = require("../../controllers/users/getCurrent");
const updateSubscription = require("../../controllers/users/updateSubscription");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", authenticate, logout);
router.get("/current", authenticate, getCurrent);
router.patch("/", authenticate, updateSubscription);

module.exports = router;
