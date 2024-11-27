class ProductosGames extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.loadGames();
    }

    async loadGames() {
        try {
            const respuesta = await fetch('https://products-foniuhqsba-uc.a.run.app/Games');
            if (!respuesta.ok) {
                throw new Error('Error al obtener los elementos');
            }
            const elementos = await respuesta.json();
            console.log('Elementos obtenidos:', elementos); // Verifica los elementos obtenidos
            this.renderGames(elementos);
        } catch (error) {
            console.error('Error:', error);
            this.innerHTML = `<p>Error al cargar los juegos. Inténtelo nuevamente más tarde.</p>`;
        }
    }

    renderGames(elementos) {
        const template = document.getElementById('game-collection');
        this.innerHTML = ''; // Limpiar el contenido previo
        const fragment = document.createDocumentFragment();

        elementos.forEach(game => {
            
            const hasActionAdventure = game.features && game.features.some(feat => feat.value === 'Action-Adventure');

            if (hasActionAdventure) {
                const gameClone = document.importNode(template.content, true);

                // Asegúrate de que los selectores sean correctos
                gameClone.querySelector('.title').textContent = game.title;
                gameClone.querySelector('.short_description').innerHTML = game.short_description;
                gameClone.querySelector('.image').src = game.image || 'default-image.jpg';
                gameClone.querySelector('.rating').textContent = game.rating;
                gameClone.querySelector('.price').textContent = game.price;


                const juego = gameClone.querySelector(".game")

                juego.addEventListener("click", ()=>{
                    window.location.href = `Game.html?id=${game.id}`
                })
        


                fragment.appendChild(gameClone);
            }
        });

        this.appendChild(fragment);
    }
}

customElements.define('productos-games', ProductosGames);



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
