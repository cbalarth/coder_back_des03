import productManager from "./productManager.js";
import express from "express";

const app = express();

async function main() {
    const manager = new productManager();
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

    app.get("/products/:id", async (req, res) => {
        const {id} = req.params;
        const productito = await manager.getProductById(id);

        if(!productito){
            return res.send({error: `¡No existe el producto con ID ${id}!`});
        }
        res.send(productito);
    });
    
    app.listen(8080, () => {
        console.log("Server Listening - Port 8080");
    });
}

main();