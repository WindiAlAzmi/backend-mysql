const express = require("express");
const router = express.Router();

const userRoute = require("./users-route");
const brandRoute = require("./brand-route");
const voucherRoute = require("./voucher-route");
const transactionRoute = require("./transaction-route");


router.use("/users", userRoute);
router.use("/brand", brandRoute);
router.use("/transaction/redemption", transactionRoute);
router.use("/voucher", voucherRoute);


module.exports = router;
