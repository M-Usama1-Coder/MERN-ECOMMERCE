const cors = require("cors");
const express = require("express");
const DataBase = require("./Database");
const UserRoute = require("./routes/UserRoute");
const ProductRoute = require("./routes/ProductRoute");
const OrderRoute = require("./routes/OrderRoute");
const CartRoute = require("./routes/CartRoute");
const stripeRoute = require("./routes/StripeRoute");
require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/users", UserRoute);
app.use("/api/products", ProductRoute);
app.use("/api/carts", CartRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/checkout", stripeRoute);

// PORT
const PORT = process.env.PORT || 6000;

// DATABASE CONNECTION
DataBase();

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
