// routes/lovRoutes.js
const express = require("express");
const router = express.Router();
const NrspIbftController = require("../controllers/NrspIbftController");
const AccountCreationController = require("../controllers/AccountCreationController");

router.post("/get-login", AccountCreationController.getLogin);
router.post("/get-fetch_lov", AccountCreationController.getFetchLov);
router.post("/get-lov", NrspIbftController.getLov);
router.post("/ibft-summary", NrspIbftController.ibftSummary);
router.post("/send-ibft", NrspIbftController.sendIbft);
router.post("/create-nrsp-account", NrspIbftController.createNrspAccount);

module.exports = router;
