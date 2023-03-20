class ProductManager {
  constructor() {
    this.products = [];
  }
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

    return this.products.push({ id: this.products.length + 1, ...newProduct });
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    let product = this.products.find((prod) => prod.id === id);
    if (!product) return `Producto inexistente`;
    return product;
  }
}

const product = new ProductManager();

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

console.log(
  product.addProduct({
    title: `CAFÉ BRASIL CATUAI`,
    description: `Una combinacion agradable de caramelo, nueces y almendras. Cuerpo mediano y baja acidez.`,
    price: 6000,
    thumbnail: `https://www.modobarista.com/product_images/l/093/Catuai__98631_zoom.png`,
    code: `CBC`,
    stock: 900,
  })
);

console.log(product.getProducts());
console.log(product.getProductById(4));
