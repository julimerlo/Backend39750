import { Router } from "express";
import CartManager from "../DAO/cartsManager.js";

const routerCart = Router();
const carts = new CartManager();

routerCart.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    if (isNaN(Number(cid)))
      return res.status(400).send({ status: "No es un numero valido" });
    const valueReturned = await carts.getCartById(cid);
    if (valueReturned.error)
      return res.status(200).send({ status: "Sin carritos", valueReturned });

    res.status(200).send({ status: "Carrito", valueReturned });
  } catch (err) {
    res.status(400).send({ status: "error router", err });
  }
});

routerCart.post("/", async (req, res) => {
  try {
    // Obtenemos el body
    const cart = req.body;
    console.log(req.body);
    // Comprobamos que todos los campos estén completos
    const campoVacio = Object.values(cart).find((value) => value === "");
    if (campoVacio) {
      return res
        .status(400)
        .send({ status: "error", message: "Falta completar algún campo" });
    }

    // Si addProduct devuelve un objeto con la propiedad error quiere decir que hay un error
    if (cart.status === "error") return res.status(400).send({ valueReturned });
    await carts.addCart(cart);
    res.status(200).send({ cart });
  } catch (err) {
    console.log(err);
  }
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  try {
    let producto = {};
    const { cid, pid } = req.params;
    if (isNaN(Number(cid)))
      return res.status(400).send({ status: "No es un numero valido" });
    if (isNaN(Number(pid)))
      return res.status(400).send({ status: "No es un numero valido" });

    producto["idProduct"] = Number(pid);
    producto["cantidad"] = 1;

    const carrito = await carts.getCartById(cid);
    if (carrito.error) return res.status(400).send({ carrito });

    let productoEncontrado = carrito.productos.findIndex(
      (productos) => productos.idProduct == pid
    );
    console.log(productoEncontrado, "encontrado");

    if (productoEncontrado !== -1) {
      // carrito.productos[productoEncontrado]
      carrito.productos[productoEncontrado].cantidad =
        Number(carrito.productos[productoEncontrado].cantidad) + 1;
      await carts.updateCart(cid, carrito);
      return res
        .status(200)
        .send({ statusbar: "success", message: "producto agregado" });
    }
    carrito.productos.push(producto);
    await carts.updateCart(cid, carrito);
    res.status(200).send({
      status: "success",
      message: "Producto agregado",
      carrito: carrito.productos,
    });
  } catch (err) {
    return res
      .status(400)
      .send({ status: "error", message: "error de parametros" });
  }
});

export default routerCart;
