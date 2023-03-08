import fs from "fs";
let index = 0;

class productManager {
    #path = "./products.json";
    products = [];

    async addProduct(title, description, price, thumbnail, code, stock) {
        const newProduct = {
            id: index,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
    };

    const products = await this.getProducts();
    const updatedProducts = [...products, newProduct];
    await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts)); //Crear archivo JSON con string del objeto base.
    index = index + 1;
    }

    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.#path, "utf-8");
            return JSON.parse(products); //Retorna objeto del string almacenado en el JSON.
        } catch (e) {
            return [];
        }
    }

    async getProductById(productoID) {
        const products = await this.getProducts();
        try {
            const productoEncontrado = products.find((elemento) => elemento.id == productoID);
            return productoEncontrado;
        } catch (e) {
            return console.log((`ERROR: ¡No existe el producto con ID ${productoID}!`));
        }
    }

    async updateProduct(productoID, productoTitle) {
        const products = await this.getProducts();
        try {
            products[productoID].title = productoTitle;
            await fs.promises.writeFile(this.#path, JSON.stringify(products));
            return products[productoID];
        } catch (e) {
            return console.log((`ERROR: ¡No existe el producto con ID ${productoID}!`));
        }
    }

    async deleteProduct(productoID) {
        const products = await this.getProducts();
        try {
            products.splice(productoID, 1);
            await fs.promises.writeFile(this.#path, JSON.stringify(products));
            return products;
        } catch (e) {
            return console.log((`ERROR: ¡No existe el producto con ID ${productoID}!`));
        }
    }
}

export default productManager;