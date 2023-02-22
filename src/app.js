import express from "express";
import fs from "fs";
let index = 0;

const app = express();

class ProductManager {
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
}

async function main() {
    const manager = new ProductManager();
    const products = await manager.getProducts();
    
    //AGREGA 10 PRODUCTOS
    // await manager.addProduct("producto 01", "descripcion 01", 200, "imagen 01", "code01", 21);
    // await manager.addProduct("producto 02", "descripcion 02", 200, "imagen 02", "code02", 22);
    // await manager.addProduct("producto 03", "descripcion 03", 200, "imagen 03", "code03", 23);
    // await manager.addProduct("producto 04", "descripcion 04", 200, "imagen 04", "code04", 24);
    // await manager.addProduct("producto 05", "descripcion 05", 200, "imagen 05", "code05", 25);
    // await manager.addProduct("producto 06", "descripcion 06", 200, "imagen 06", "code06", 26);
    // await manager.addProduct("producto 07", "descripcion 07", 200, "imagen 07", "code07", 27);
    // await manager.addProduct("producto 08", "descripcion 08", 200, "imagen 08", "code08", 28);
    // await manager.addProduct("producto 09", "descripcion 09", 200, "imagen 09", "code09", 29);
    // await manager.addProduct("producto 10", "descripcion 10", 200, "imagen 10", "code10", 30);

    app.get("/products", (req, res) => {
        const {limit} = req.query;
        const productsLimitFiltered = products.filter(u => u.id <= limit-1);

        if(limit) {
            return res.send(productsLimitFiltered);
        }
        res.send(products);
    });

    app.get("/products/:id", (req, res) => {
        const {id} = req.params;
        const product = products.find((p) => `${p.id}` === id);

        if(!product){
            return res.send({error: `¡No existe el producto con ID ${id}!`});
        }
        res.send(product);
    });
    
    app.listen(8080, () => {
        console.log("Server Listening - Port 8080");
    });
}

main();