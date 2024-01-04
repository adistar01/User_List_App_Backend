const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const userListRoutes = require("./routes/userListRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDb = require("./config/db");

dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/user_list", userListRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
