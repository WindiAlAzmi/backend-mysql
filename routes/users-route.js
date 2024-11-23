const express = require("express");
const {
  getAllUsers,
  getIdUser,
  createUser,
  updateUser,
  deleteUser,
  deleteAllData,
} = require("../controllers/users-controllers");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getIdUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.delete("/", deleteAllData);

module.exports = router;
