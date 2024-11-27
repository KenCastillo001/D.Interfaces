
const getId = () => {
    const searchParams = new URLSearchParams(location.search.slice(1));
    return Number(searchParams.get('id'));
}


class ProductosGames extends HTMLElement{
    constructor() {
        super()
        this.id = getId()
        console.log({ id: this.id })
      }
  
      connectedCallback() {
        this.render()
      }
  
      async loadArticles() {
        return fetch('https://products-foniuhqsba-uc.a.run.app/Games').then(res => res.json())
      }
  
      async render() {
        
        const juegos = await this.loadArticles()
        console.log({ juegos })
        
        const juego = juegos.find(juego => juego.id == this.id)
        console.log({ juego });
        
        if (juego) {
         
            const template = document.getElementById('game-collection');
            const clone = template.content.cloneNode(true);
    
           
            clone.querySelector('.title').textContent = juego.title || 'No hay título disponible';
            clone.querySelector('.image').src = juego.image || 'default-image.jpg';
            clone.querySelector('.description').textContent = juego.description || 'No hay descripción corta disponible';
            clone.querySelector('.date').textContent = juego.date || 'No hay fecha disponible';
            clone.querySelector('.rating').textContent = juego.rating || 'No hay calificación disponible';
            clone.querySelector('.tags').textContent = juego.tags.join(', ') || 'No hay etiquetas disponibles';
            clone.querySelector('.price').textContent = juego.price || 'No hay precio disponible';
            clone.querySelector('.id').textContent = juego.id || 'No hay ID disponible';
    
           
            clone.querySelector('.features').textContent = juego.features.join(', ') || 'No hay características disponibles';
            
            
            this.appendChild(clone);
        } else {
            console.error('Juego no encontrado');
        }
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

        if (juegos.length == 0) {
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

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
     const tarjeta = new Tarjetas(); 
      tarjeta.llenarTemplate(); 
});


customElements.define('nueva-tarjeta', Tarjetas);



document.addEventListener('DOMContentLoaded', function () {
    var botonPopover = document.querySelector('[data-popover-target="popover"]');
    var popover = document.getElementById('popover');
    
    botonPopover.addEventListener('click', function () {
       
        popover.classList.toggle('opacity-100');
        popover.classList.toggle('invisible');
    });
});



const registro = document.querySelector("#registro")

registro.addEventListener("click" , () =>{
    window.location.href ='formulario.html'
})

