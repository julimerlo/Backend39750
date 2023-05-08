import express from "express";
import productRouter from "../src/routers/products.router.js";
import routerCar from "./routers/carts.router.js";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import handlebars from 'express-handlebars';
import ProductManager from './DAO/productManager.js';
import {Server} from 'socket.io';

const pm = new ProductManager();

const app = express();

const httpServer = app.listen(8080, () => {
    
  console.log('Escuchando el puerto 8080');
});

const socketServer = new Server(httpServer)

socketServer.on('connection', async socket => {
    const data =  await pm.getProducts()

    socket.emit('products', {data})

    socket.on('product', async data => {
        try{
            const {
            title,
            description,
            price,
            status,
            category,
            thumbnail,
            code,
            stock
        } = data
        console.log(price)

        const valueReturned = await pm.addProduct(title, description, price, status, category, thumbnail, code, stock)
        console.log(valueReturned)
        }
        catch (err){
            console.log(err);
        }
        
})
socket.on('product_delete', async id => {
    try{
        const valueReturned = await pm.deleteProduct(id)
    console.log(valueReturned)
    }
    catch (err){
        console.log(err);
    }
    
})
})


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//  HBS
app.engine('handlebars', handlebars.engine()) 
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars') 


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Router de carritos
app.use("/api/carts", routerCar);

// Router de productos
app.use("/api/products", productRouter);

app.use('/', (req, res) => {
  res.render('realTimeProducts', {})
})


