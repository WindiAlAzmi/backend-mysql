require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const path = require("path");

app.use(cors());

const allRoutes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(allRoutes);

app.listen(PORT, () => {
  console.log("runnn port", PORT);
});
