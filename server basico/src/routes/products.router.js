const { Router } = require("express");
const ProductManager = require("../managers/ProductManager");

const router = Router();
const productManager = new ProductManager("./src/data/products.json");


router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({error: "Error del servidor", });
    }
});


router.get("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const product = await productManager.getProductsById(id);
        res.status(200).json(product);
    }

    catch (error) {
        res.status(404).json({error: "Producto no encontrado"});
    }  
});


router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        const productAdded = await productManager.addProduct(newProduct);
        res.status(200).json(productAdded); 
    }

    catch (error) {
        res.status(500).json({error: "Error al agregar producto"})
    }
});


router.put("/:pid", async(req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const updateData = (req.body);
        const updatedProduct = await productManager.updateProduct(id, updateData);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(404).json({error: "Error, producto no encontrado"});
    }
});


router.delete("/:pid", async(req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const result = await productManager.deleteProduct(id);
        res.status(200).json(result);
    }
    
    catch (error) {
        res.status(404).json({error: "Error, el producto no se encontro"});
    }
});

module.exports = router;