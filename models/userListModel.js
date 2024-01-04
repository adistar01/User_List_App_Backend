const mongoose = require("mongoose");

const userListSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
  },
  attachedToUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const userListModel = mongoose.model("UserList", userListSchema);

module.exports = userListModel;
