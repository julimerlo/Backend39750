const socket = io();

const products = document.getElementById("products");
const linkCSS = document.getElementsByTagName("link");
const formulario = document.getElementById("formulario");
// const boton = document.getElementById('boton')

// console.log(boton);
linkCSS[0].href += "index.css";

// products.innerText = 'Hola mundo'
// console.log('realTimeProducts');

// socket.emit('hola', 'data')
socket.on("products", (data) => {
  console.log("mensaje del servidor");

  // let style = data.style
  // console.log(style);
  let productos = "";
  data.data.forEach((producto) => {
    productos += `<div class="producto"> 
                    <h1>title:${producto.title}</h1><br>
                    description:${producto.description}<br>
                    price:${producto.price}<br>
                    status:${producto.status}<br>
                    category:${producto.category}<br>
                    thumbnail:${producto.thumbnail}<br>
                    code:${producto.code}<br>
                    stock:${producto.stock}<br>
                    id:${producto.id}<br>
                </div>`;
  });
  products.innerHTML = productos;
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(event.target));
  data["thumbnail"] = ["empty"];
  console.log(data);

  socket.emit("product", data);
});
// data

boton.addEventListener("click", () => {
  // event.preventDefault();
  console.log("click");
  // if (event.key==="Enter"){
  //     socket.emit('message2', input.value)
  //     input.value = ''
  // }
});
