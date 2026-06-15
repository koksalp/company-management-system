const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const authRoutes = require("./routes/auth.routes");
const companyRoutes = require("./routes/company.routes");
const productRoutes = require("./routes/product.routes");

app.use("/auth", authRoutes);
app.use("/company", companyRoutes);
app.use("/product", productRoutes);

module.exports = app; 

