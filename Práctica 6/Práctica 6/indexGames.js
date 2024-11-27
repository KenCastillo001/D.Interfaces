class ProductosGames extends HTMLElement{

    constructor(){
        super();
    }

    connectedCallback(){
        this.loadGames()
    }

    async loadGames (){

        try {

            const respuesta = await fetch( 'https://products-foniuhqsba-uc.a.run.app/Games')
            if(!respuesta.ok){
                throw new Error('Error al obtener los elementos');
                
            }
                const elementos = await respuesta.json()
                this.renderGames(elementos);
            
        } catch (error) {
            console.error('Error:', error);
          this.innerHTML = `<p>Error al cargar los juegos. Inténtelo nuevamente más tarde.</p>`;
        }
    }

    
  renderGames(elementos) {
    const template = document.getElementById('game-collection');
    
    this.innerHTML = ''; 

    elementos.forEach(game => {
        
        const gameClone = document.importNode(template.content, true);

      
        gameClone.querySelector('.title').textContent = game.title;
        gameClone.querySelector('.short_description').textContent = game.short_description;
        gameClone.querySelector('.date').textContent = game.date;
        gameClone.querySelector('.image').src = game.image || 'default-image.jpg';
        gameClone.querySelector('.category').textContent = game.category;
        gameClone.querySelector('.rating').textContent = game.rating;
        gameClone.querySelector('.price').textContent = game.price;



      
       
        const agregar = gameClone.querySelector(".carrito");

         agregar.addEventListener('click', ()=>
        this.agregarAlCarrito(game));

        

        const juego = gameClone.querySelector(".image")
       
        juego.addEventListener("click", ()=>{
            window.location.href = `Game.html?id=${game.id}`
        })

        this.appendChild(gameClone); 

    });
  }





   agregarAlCarrito(game){
    const memoria = JSON.parse(localStorage.getItem("juego"));
    console.log(memoria)
    if(!memoria){
        const newGame = this.getNuevoJuego(game) ;
        localStorage.setItem("juego", JSON.stringify([newGame]))
        
    }else {
        const indiceProducto = memoria.findIndex(juego => juego.id === game.id)
        console.log(indiceProducto)
        const nuevaMemoria = memoria;

        if(indiceProducto === -1){
            const newGame = this.getNuevoJuego(game);
            nuevaMemoria.push(newGame)
            
        }else{
            nuevaMemoria[indiceProducto].cantidad ++;
        }
        localStorage.setItem("juego", JSON.stringify(nuevaMemoria))
        actualizarNumeroCarrito()
    }
        
     
    function actualizarNumeroCarrito(){
       const memoria = JSON.parse(localStorage.getItem("juego"));
       const cuentaElement = document.getElementsByClassName("cuenta")[0];
       const cuenta = memoria.reduce((acum , current) => acum+current.cantidad ,0)
       cuentaElement.innerText = cuenta;
    }
        

      
}
 getNuevoJuego(game){
    const newGame =  game ;
    newGame.cantidad = 1;
    return newGame;
}
}




 customElements.define('productos-games', ProductosGames);


class Tarjetas extends HTMLElement {

    constructor(){
        super()
        this.attachShadow({ mode: 'open' }); 
    }
    
    connectedCallback() {
        this.innerHTML = `
            <div id="templateTarjeta">
                <h3 class="title"></h3>
                <p class="price"></p>
                <button class="add-to-cart">Añadir al carrito</button>
            </div>
        `;
    }

    obtenerDatos() {
        const datos = JSON.parse(localStorage.getItem("juego"));
       console.log(datos)
    }

    llenarTemplate() {
        const juegos = this.obtenerDatos();
        console.log(juegos) 
        const contenedorTarjetas = document.getElementById("templateTarjeta"); 
        const template = document.getElementById("games-collection"); 

     
        contenedorTarjetas.innerHTML = "";

        if (juegos.length === 0) {
            contenedorTarjetas.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align: center;">No hay productos</td>
                </tr>
            `;
            return;
        }else{
            contenedorTarjetas.innerHTML = `
            
                <div id="templateTarjeta">
                <h3 class="title"></h3>
                <p class="price"></p>
                <button class="add-to-cart">Añadir al carrito</button>
                </div>
            
            `
             
            juegos.forEach((game) => {
            const gameClone = template.content.cloneNode(true);  
            gameClone.querySelector('.title').textContent = game.title || "Título desconocido";
            gameClone.querySelector('.image').src = game.image || "default-image.jpg";
            gameClone.querySelector('.price').textContent = `$${game.price || "0.00"}`;
            contenedorTarjetas.appendChild(gameClone); 
        });


        }

       
    }

    eliminarDelCarrito(game) {
        const memoria = JSON.parse(localStorage.getItem("juego")) || [];
        const nuevaMemoria = memoria.filter(juego => juego.id !== game.id); 
        localStorage.setItem("juego", JSON.stringify(nuevaMemoria)); 
        this.actualizarNumeroCarrito();  
        this.llenarTemplate(); 
    }

    actualizarNumeroCarrito() {
        const juegos = this.obtenerDatos();
        const carritoNumero = juegos.length;
        
        const carrito = document.getElementById("carritoNumero");
        carrito.textContent = carritoNumero;
    }
}


document.addEventListener("DOMContentLoaded", () => {
     const tarjeta = new Tarjetas(); 
      tarjeta.llenarTemplate(); 
});


customElements.define('nueva-tarjeta', Tarjetas);

//const botonFlex = document.querySelector(".vista-flex");
//const body = document.querySelector(".")
//botonFlex.addEventListener("click" , ()=>{

//})

const registro = document.querySelector("#registro")

registro.addEventListener("click" , () =>{
    window.location.href ='formulario.html'
})


document.addEventListener('DOMContentLoaded', function () {
    var botonPopover = document.querySelector('[data-popover-target="popover"]');
    var popover = document.getElementById('popover');
    
    botonPopover.addEventListener('click', function () {
       
        popover.classList.toggle('opacity-100');
        popover.classList.toggle('invisible');
    });
});