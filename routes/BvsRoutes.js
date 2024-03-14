// routes/lovRoutes.js
const express = require("express");
const router = express.Router();
const BvsController = require("../controllers/BvsRegisterationController");

router.post("/sendOtp", BvsController.sendOTP);
router.post("/BvsLogin", BvsController.BvsLogin);
router.post("/BvsRegisteration", BvsController.BvsRegisteration);
router.post("/RefreshToken", BvsController.RefreshToken);
router.post("/deposit", BvsController.deposit);
router.post("/depositConfirm", BvsController.depositConfirm);

module.exports = router;
