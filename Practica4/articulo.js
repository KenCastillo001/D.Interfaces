
document.addEventListener("DOMContentLoaded", async () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("id");

    if (articleId) {
        try {
            
            const response = await fetch(`https://news-foniuhqsba-uc.a.run.app/${articleId}`);
            
            
            if (!response.ok) {
                throw new Error('Error al obtener el artículo');
            }

           
            const article = await response.json();

            
            document.getElementById("article-title").textContent = article.headline;
            document.getElementById("article-author").textContent = article.author;
            document.getElementById("article-content").textContent = article.body;
        } catch (error) {
            console.error("Error al cargar el artículo:", error);
           
            document.body.innerHTML = `<p>Error al cargar el artículo. Inténtelo nuevamente más tarde.</p>`;
        }
    } else {
        
        console.error("No se encontró el ID del artículo.");
        document.body.innerHTML = `<p>No se encontró el ID del artículo.</p>`;
    }
});
