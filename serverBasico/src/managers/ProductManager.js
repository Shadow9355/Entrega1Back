const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid")

class ProductManager {
    constructor() {
        this.path = "../data/products.json"
        console.log("Ruta encontrada:", this.path)
    }


// OBTENER LA LISTA DE PRODUCTOS
    async getProducts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data)
        }

        catch (error) {
            console.log("Error al leer los productos:", error);
            return [];
        }
    }


// OBTENER UN PRODUCTO POR SU ID
    async getProductsById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find(p => p.id === id);
            return product || null;
        } 

        catch (error) {
            console.log("Error al buscar el producto:", error);
        }
    }


// AGREGAR UN PRODUCTO A LA LISTA
    async addProduct (product) {
        try {
            const products = await this.getProducts();
            const newProduct = {
                id: uuidv4(),
                ...product
            };

            products.push(newProduct);

            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return newProduct;
        } 

        catch (error) {
            console.log("Error al crear el producto:", error);
        }
    }


// ACTUALIZAR LA DATA DE UN PRODUCTO
    async updateProduct(id, updateData) {
        try {
            const products = await this.getProducts();
            const index = products.find(p => p.id === id);
            if (index === -1) return null;

            products[index] = { ...products[index], ...updatedData};
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[index];
        } 
        
        catch (error) {
            console.log("Error al actualizar producto:", error);
        }
    }


// ELIMINAR UN PRODUCTO DE LA LISTA
    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const filtered = products.filter(p => p.id !== id);
            await fs.writeFile(this.path, JSON.stringify(filtered, null, 2));
            return filtered;

        } catch (error) {
            console.log("Error al eliminar producto", error);
        }
    }

}

module.exports = ProductManager;