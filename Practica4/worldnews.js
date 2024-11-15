// news-viewer.js

class NewsViewer extends HTMLElement {
  constructor() {
      super();
  }

  connectedCallback() {
      this.loadArticles();
  }

  async loadArticles() {
      try {
          const response = await fetch('https://news-foniuhqsba-uc.a.run.app/WorldNews');
          if (!response.ok) {
              throw new Error('Error al obtener los artículos');
          }
          const articles = await response.json();
          this.renderArticles(articles);
      } catch (error) {
          console.error('Error:', error);
          this.innerHTML = `<p>Error al cargar los artículos. Inténtelo nuevamente más tarde.</p>`;
      }
  }

  renderArticles(articles) {
      const template = document.getElementById('article-template');
      
      this.innerHTML = ''; // Limpiar contenido previo del news-viewer

      articles.forEach(article => {
          // Clonar el contenido del template para cada artículo
          const articleClone = document.importNode(template.content, true);

          // Rellenar el contenido del artículo con los datos
          articleClone.querySelector('.title').textContent = article.headline;
          articleClone.querySelector('.author').textContent = article.author;
          articleClone.querySelector('.description').innerHTML = article.body;

          // Agregar el evento de clic en el artículo clonado
          const clonedArticle = articleClone.querySelector('.article');  // Obtener el nodo 'article' del clone
          
          clonedArticle.addEventListener('click', () => {
              // Redirigir al artículo específico usando su ID
              window.location.href = `articulo.html?id=${article.id}`; 
          });

          // Agregar el artículo clonado al DOM
          this.appendChild(articleClone); 
      });
  }
}

// Definir el elemento personalizado
customElements.define('news-viewer', NewsViewer);
