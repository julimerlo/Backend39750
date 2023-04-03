import fs from "fs";

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "../db/productos.json";
  }

  appendProduct = async () => {
    const toJSON = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, toJSON);
  };

  addProducts = (title, description, price, thumbnail, code, stock) => {
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    /* ID AUTOINCREMENTABLE */

    if (this.products.length === 0) {
      product.id = 1;
    } else product.id = this.products[this.products.length - 1].id + 1;
  };

  addProduct(newProduct) {
    /* Validaciones */
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.thumbnail ||
      !newProduct.code ||
      !newProduct.stock
    )
      return `Todos los campos son obligatorios`;

    let product = this.products.find((prod) => prod.code === newProduct.code);
    if (product) return `Ya existe un producto con este codigo`;

    return (
      this.products.push({ id: this.products.length + 1, ...newProduct }) &&
      this.appendProduct()
    );
  }

  getProducts = async () => {
    try {
      const productsList = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(productsList);
      return products;
    } catch (err) {
      console.log(err);
    }
  };

  getProductById = async (idProduct) => {
    try {
      const productosDb = await fs.promises.readFile(this.path, "utf-8");
      const productoId = JSON.parse(productosDb);
      const find = productoId.find((value) => value.id === idProduct);
      return find;
    } catch (err) {
      console.log(err);
    }
  };

  updateProduct = async (id, obj) => {
    try {
      const productosDb = await fs.promises.readFile(this.path, "utf-8");
      const productoId = JSON.parse(productosDb);

      const productoUpdt = Object.assign(productoId[id - 1], obj);
      console.log(productoUpdt);
      this.products = productoId;
      this.appendProduct();
    } catch (err) {
      console.log(err);
    }
  };

  deleteProduct = async (id) => {
    try {
      const productosDb = await fs.promises.readFile(this.path, "utf-8");
      const productoId = JSON.parse(productosDb);

      productoId.splice(id - 1, 1);
      this.products = productoId;
      this.appendProduct();
    } catch (err) {
      console.log(err);
    }
  };
}

/* const product = new ProductManager("./db/productos.json"); */
/*
product.addProduct({
  title: `CAFÉ COSTA RICA`,
  description: `Marcadas notas frutales y achocolatadas con una nota limon que da un balance perfecto.`,
  price: 3500,
  thumbnail: `https://www.modobarista.com/product_images/d/003/Costa_Rica__50415_zoom.png`,
  code: `CCR`,
  stock: 1000,
});

product.addProduct({
  title: `CAFÉ BRASIL BOURBON`,
  description: `Cuerpo suave con notas a chocolate y caramelo con una acidez brillante e intensa`,
  price: 3000,
  thumbnail: `https://www.modobarista.com/product_images/d/649/Bourbon__79367_zoom.png`,
  code: `CBB`,
  stock: 750,
});

product.addProduct({
  title: `CAFÉ BRASIL CATUAI`,
  description: `Una combinacion agradable de caramelo, nueces y almendras. Cuerpo mediano y baja acidez.`,
  price: 6000,
  thumbnail: `https://www.modobarista.com/product_images/l/093/Catuai__98631_zoom.png`,
  code: `CBC`,
  stock: 900,
});
product.addProduct({
  title: `CAFÉ TOSTADO BRASIL PEDRA`,
  description: `catuai, caturra y mundo novo.`,
  price: 4000,
  thumbnail: `https://www.modobarista.com/product_images/n/062/1__42600_zoom.png`,
  code: `CTBP`,
  stock: 700,
});
product.addProduct({
  title: `CAFÉ TOSTADO COLOMBIA SUPREMO`,
  description: `Caturra y Typica.`,
  price: 3000,
  thumbnail: `https://www.modobarista.com/product_images/a/376/3__78745_zoom.png`,
  code: `CTCS`,
  stock: 1200,
});
product.addProduct({
  title: `CAFÉ TOSTADO PERÚ`,
  description: `Typica, Caturra y Bourbon.`,
  price: 2000,
  thumbnail: `https://www.modobarista.com/product_images/j/879/4__28964_zoom.png`,
  code: `CTP`,
  stock: 400,
});
product.addProduct({
  title: `CAFÉ SALVADOR`,
  description: `APANECA- LLAMATEPEC.`,
  price: 5400,
  thumbnail: `https://www.modobarista.com/product_images/x/868/Salvador___94185_zoom.png`,
  code: `CS`,
  stock: 100,
});
product.addProduct({
  title: `CAFÉ TOSTADO COLOMBIA ORGÁNICO`,
  description: `Typica y Caturra.`,
  price: 4500,
  thumbnail: `https://www.modobarista.com/product_images/u/882/2__48717_zoom.png`,
  code: `CTCO`,
  stock: 950,
});
product.addProduct({
  title: `CAFÉ BRASIL TOPAZIO`,
  description: `Topazio.`,
  price: 1000,
  thumbnail: `https://www.modobarista.com/product_images/p/041/Topazio___63224_zoom.png`,
  code: `CBT`,
  stock: 900,
});
product.addProduct({
  title: `CAFÉ BRASIL OEIRAS TOSTADO - ORGÁNICO`,
  description: `Frutado, Panela, taza limpia y acidez dulce.`,
  price: 6300,
  thumbnail: `https://www.modobarista.com/product_images/d/524/Oeiras__37832_zoom.png`,
  code: `CBOTO`,
  stock: 400,
}); */
/* product.addProduct({
  title: `CAFÉ`,
  description: `Comun.`,
  price: 100,
  thumbnail: `No img`,
  code: `CC`,
  stock: 400,
}); */
/* console.log(product.getProducts()); */

/* product.getProductById(7); */

/* product.updateProduct(2, {
  title: "CAFÉ BRASIL BOURBON PREMIUM",
  price: 120000,
});
 */
/* product.deleteProduct(1); */

export default ProductManager;
