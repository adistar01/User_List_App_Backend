const express = require("express");
const {
  getAllUserListItemsController,
  createUserListItemController,
  updateUserListItemController,
  deleteUserListItemController,
} = require("../controllers/userListController");
const { isLogin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", isLogin, getAllUserListItemsController);
router.post("/userListItem", isLogin, createUserListItemController);
router.put("/userListItem/:id", isLogin, updateUserListItemController);
router.delete("/userListItem/:id", isLogin, deleteUserListItemController);

module.exports = router;
