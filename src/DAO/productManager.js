import fs from "fs";

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./src/DAO/productos.json";
  }

  __appendProduct = async () => {
    const toJSON = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, toJSON);
  };

  addProduct = async (
    title,
    description,
    price,
    status,
    category,
    thumbnail,
    code,
    stock
  ) => {
    const productsFS = await this.getProducts();
    // console.log(productsFS);
    this.products = productsFS;

    const product = {
      title,
      description,
      price,
      status,
      category,
      thumbnail,
      code,
      stock,
    };
    // console.log(product, 'codigo----');
    // Validacion de codigo
    const validarCodigo = this.products.find(
      (productos) => productos.code === product.code
    );
    if (validarCodigo) {
      return {
        status: "error",
        message: "El producto no se pudo agregar porque el codigo es repetido",
      };
    }
    // ID Autoincremental
    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }

    // Verifica que el objeto tenga todos sus valores
    if (Object.values(product).every((value) => value)) {
      product.status === "false"
        ? (product.status = false)
        : (product.status = true);
      console.log(product.price, "precio");
      product.price = Number(product.price);
      product.stock = Number(product.stock);
      product.thumbnail = [product.thumbnail];
      this.products.push(product);
      this.__appendProduct();
      return {
        status: "succes",
        message: "El producto se registró",
        producto: product,
      };
    }
    return { status: "error", message: "Todos los campos son obligatorios" };
  };

  getProducts = async () => {
    try {
      const getFileProducts = await fs.promises.readFile(this.path, "utf-8");
      if (getFileProducts.length === 0) return [];
      return JSON.parse(getFileProducts);
    } catch (err) {
      console.log(err);
      return { status: "error", error: err };
    }
  };

  getProductById = async (id) => {
    try {
      const getFileProducts = await fs.promises.readFile(this.path, "utf-8");
      const parseProducst = JSON.parse(getFileProducts);
      console.log(parseProducst[id - 1]);
      if (!parseProducst[id - 1]) return "Error! No existe";

      return parseProducst[id - 1];
    } catch (err) {
      console.log(err);
    }
  };

  updateProduct = async (pid, data) => {
    const getFileProducts = await fs.promises.readFile(this.path, "utf-8");
    const parseProducts = JSON.parse(getFileProducts);
    // console.log(parseProducts);
    if (isNaN(Number(pid)))
      return { status: "error", message: "No es un id válido" };

    const findId = parseProducts.findIndex((product) => product.id == pid);
    if (findId === -1)
      return { status: "error", message: "No se encontró el id" };

    this.products = parseProducts.map((element) => {
      if (element.id == pid) {
        element = Object.assign(element, data);
        return element;
      }
      return element;
    });

    this.__appendProduct();
    return returnedTarget;
  };

  deleteProduct = async (pid) => {
    const getFileProducts = await fs.promises.readFile(this.path, "utf-8");
    const parseProducts = JSON.parse(getFileProducts);
    if (isNaN(Number(pid)))
      return { status: "error", message: "No es un id válido" };

    const findId = parseProducts.findIndex((product) => product.id == pid);
    if (findId === -1)
      return { status: "error", message: "No se encontró el id" };

    this.products = parseProducts.filter((product) => product.id !== pid);

    this.appendProduct();
    return {
      status: "success",
      message: `Se eliminó el producto con id ${pid}`,
    };
  };
}

const product = new ProductManager();
/*
product.addProduct({
  title: `CAFÉ COSTAa RICA`,
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
