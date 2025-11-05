const express = require("express");
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hoa mundo</h1>")
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


module.exports = app