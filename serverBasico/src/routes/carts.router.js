const { Router } = require("express");
const CartManager = require("../managers/CartManager");

const router = Router();
const cartManager = new CartManager("./src/data/carts.json");


router.post("/", async(req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(200).json(newCart);
    } 
    
    catch (error) {
        res.status(400).json({error: "Error al crear el carrito"})
    }
});

router.get("/:cid", async(req, res) => {
    try {
        const id = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(id);
        res.status(200).json(cart.products);
    } 
    
    catch (error) {
        res.status(404).json({error: "Error, carrito no encontrado"});
    }
});


router.post("/:cid/product/:pid", async(req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);

        const updateCart = await cartManager.addProductToCart(cid, pid);
        res.status(200).json(updateCart);
    }

    catch (error) {
        res.status(404).json({error: "Carrito o producto no encontrado"});
    }
});

module.exports = router;