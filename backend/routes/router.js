const express = require("express");
const router = new express.Router();
const userControllers = require("../controllers/userControllers");
const adminControllers = require("../controllers/adminControllers");

// User routes
router.post("/user/register", userControllers.userregister);
router.post("/user/sendotp", userControllers.userOtpSend);
router.post("/user/user-login", userControllers.userLogin);

// Admin routes
router.post("/admin/admin-login", adminControllers.adminLogin);

module.exports = router;
