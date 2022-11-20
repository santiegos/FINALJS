const carritocontenedor= document.getElementById("carrito-contenedor");
// OBJETOS //
class Entradas {
    constructor(id, mes, precio, img) {
      this.id = id;
      this.mes = mes;
      this.precio = precio;
      this.img = img;
      this.cantidad = 1;
    }
  }

  const entradasJson = `JSON/entradas.json`;

// ARRAY //
let carrito = []
const entradas = [];

//FUNCIONES //

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarentradas = () => {
    entradas.forEach((entradas)=>{
        const card = document.createElement("div");
        card.classList.add("cardDiv");
        card.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${entradas.img}" class=" altura card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${entradas.mes}</h5>
          <p class="card-text">precio: $${entradas.precio}</p>
          <a href="#" id="boton${entradas.id}" class="btn btn-primary">Comprar</a>
        </div>
      </div>`
      contenedorProductos.appendChild(card);

//Agregar productos al carrito:

const boton = document.getElementById(`boton${entradas.id}`);
boton.addEventListener('click', () => {
  agregarAlCarrito(entradas.id);
  Toastify({
    text: `${entradas.mes} agregado al carrito`,
    duration: 1200,
    gravity: "bottom",
    position: "right",
    style:
    {
        background: "linear-gradient(to right, rgb(11 81 183), rgb(33 67 114))",
    }

}).showToast();
});

    } );


    
}



//Función agregar al carrito:

const agregarAlCarrito = (id) => {
    const entrada = entradas.find((entradas) => entradas.id === id);
    const productoEnCarrito = carrito.find((entradas) => entradas.id === id);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {

      carrito.push(entrada);
  
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarValorCarritoIcon();
    
    
  };



  

  // Mostrar carrito // 

  function mostrarValorCarritoIcon() {
    carrito = JSON.parse(localStorage.getItem("carrito")) || []; 
    console.log("Entradas en Carrito:");
    console.log(carrito);
    actualizarValorCarrito();
    
    

    
  }
  
  function actualizarValorCarrito() {
    const iconNumCarrito = document.getElementById("iconNumCarrito");
    iconNumCarrito.innerText = carrito.length;
    

  }





  function CargarDatosJsonEnListaEntradas(datos){
    datos.forEach((entrada) => {
      entradas.push(entrada);
      
    });
  }


  async function EjecutarEntradas() {
      const respuesta = await fetch(entradasJson);
      const datosDeEntradasJson = await respuesta.json();
      CargarDatosJsonEnListaEntradas(datosDeEntradasJson);
      mostrarentradas();
      console.log("Catalogo añadido a la Web!...")
    }

   
    
    


    function actualizarCarrito(){
 
     
      carritocontenedor.innerHTML = "";

      if (localStorage.getItem("carrito")){
      
        carrito.forEach((productos) => {

         renderCarrito(productos);
        })
        

      };

      calcularTotal();
       
    }
    
    EjecutarEntradas();


    function renderCarrito(productos){

      const div = document.createElement('div')
      div.className = ('productoEnCarrito')
      
            div.innerHTML = `
            <p>${productos.mes}</p>
            <p>Precio:$${productos.precio}</p>
            <p>Cantidad: <span id="cantidad">${productos.cantidad}</span></p>
            <button onclick="eliminarDelCarrito(${productos.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `
            carritocontenedor.appendChild(div)
      
      };

      actualizarCarrito();
    


const vaciarCarrito = document.getElementById("vaciar-carrito");

vaciarCarrito.addEventListener("click", ()=>{

  localStorage.clear();
  carrito.length = 0;
  actualizarCarrito();
 
})


function calcularTotal(){
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}


const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId)

  const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.

  carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos 
  // un elemento 
  actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
  //MODIFICA EL CARRITO
  console.log(carrito)
}



const confirmarCompra=document.getElementById("confirmarCompra");

confirmarCompra.addEventListener("click", ()=>{

  Swal.fire({
    title: "COMPRA EXITOSA!",
    icon: "success",
    html: `
    <div class="CompraExitosaSweet">
        <p>Gracias por elegirnos!<p>
      
    </div>`,
    showCancelButton: false,
    confirmButtonText: "Aceptar",
    backdrop: `
    url("/IMG/mohammad-alizade-XgeZu2jBaVI-unsplash.jpg")
    no-repeat`
    
}).then((result) => {
    if (result.isConfirmed) {
        
      localStorage.clear();
      carrito.length = 0;
      actualizarCarrito();
     
    }
});
})