const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");


class CartManager {
    constructor() {
        this.path = "../data/carts.json"
    }


// LEER EL CARRITO
    async getCarts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } 

        catch (error) {
            console.log("Error al leer el carrito", error);
            return [];
        }
    }


// BUSCAR EL CARRITO POR SU ID
    async getCartById(id) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(c => c.id === id);
            return cart || null;
        }

        catch (error) {
            console.log("Error al buscacr el carrito:", error);
        }
    }


// CREAR UN CARRITO NUEVO
    async createCart() {
        try {
            const carts = await this.getCarts();

            const newCart = {
                id: uuidv4(),
                products: []
            };

            carts.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
            return newCart;
        }
        
        catch (error) {
            console.log("Error al crear carrito:", error);
        }
    }


// AGREGAR PRODUCTOS A UN CARRITO 
    async addProductToCart(cartId, productId) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(c => c.id === id);
            if (!cart) return null;
            

            const product = cart.product.find(p => p.product === productId);
            if (product) {
                product.quantity++;
            } else {
                cart.products.push({ product: productId, quantity: 1});
            }

            await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        } 
        
        catch (error) {
            console.log("Error al agregar producto al carrito:", error);
        }
    }

}

module.exports = CartManager;