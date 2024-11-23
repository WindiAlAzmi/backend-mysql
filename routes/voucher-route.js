const express = require("express");
const { getAllVoucher, getAllVoucherByBrand, getVoucherById, addVoucher, editVoucherById, deletedVoucherById, deletedAllVoucher } = require("../controllers/voucher-controllers");


const router = express.Router();

router.get("/", getAllVoucher);
router.get("/brand/:id", getAllVoucherByBrand);
router.get("/:id", getVoucherById);
router.post("/", addVoucher);
router.put("/:id", editVoucherById);
router.delete("/:id", deletedVoucherById);
router.delete("/", deletedAllVoucher);

module.exports = router;
