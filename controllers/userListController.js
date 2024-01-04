const userListModel = require("../models/userListModel");

const getAllUserListItemsController = async (req, res) => {
  try {
    const userList = await userListModel.find({
      attachedToUser: { $eq: req.user._id },
    });
    return res.status(200).send({
      userList,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Internal Server error",
    });
  }
};

const createUserListItemController = async (req, res) => {
  const { userName, userEmail, userPhone } = req.body;
  if (!userName || !userEmail || !userPhone) {
    return res.status(404).send({
      error: "Some details are missing",
    });
  }
  try {
    const existingUserListItem = await userListModel.findOne({ userEmail });
    if (existingUserListItem) {
      return res.status(400).send({
        error: "This user item already exists",
      });
    }
    const newUserListItem = await userListModel({
      userName,
      userEmail,
      userPhone,
      attachedToUser: req.user._id,
    }).save();
    return res.status(201).send({
      userListItem: newUserListItem,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Internal Server error",
    });
  }
};

const updateUserListItemController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      error: "Invalid request!",
    });
  }
  try {
    const updateItem = await userListModel.findByIdAndUpdate(id, {
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPhone: req.body.userPhone,
    });
    return res.status(200).send({
      userListItem: updateItem,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Internal server error",
    });
  }
};

const deleteUserListItemController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      error: "Invalid request!",
    });
  }
  try {
    const deleteItem = await userListModel.findByIdAndDelete(id);
    return res.status(204).send({
      userListItem: deleteItem,
    });
  } catch (error) {
    return res.status(500).send({
      error: "Internal server error",
    });
  }
};

module.exports = {
  getAllUserListItemsController,
  createUserListItemController,
  updateUserListItemController,
  deleteUserListItemController,
};
