class NewsViewer extends HTMLElement {
  constructor() {
      super();
  }

  connectedCallback() {
      this.loadArticles();
  }

  async loadArticles() {
      try {
          const response = await fetch('https://news-foniuhqsba-uc.a.run.app/Finance');
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
      
      this.innerHTML = ''; 

      articles.forEach(article => {
          
          const articleClone = document.importNode(template.content, true);

          
          articleClone.querySelector('.title').textContent = article.headline;
          articleClone.querySelector('.author').textContent = article.author;
          articleClone.querySelector('.description').innerHTML = article.body;

          
          const clonedArticle = articleClone.querySelector('.article');  
          
          clonedArticle.addEventListener('click', () => {

              window.location.href = `articulo.html?id=${article.id}`; 
          });

          
          this.appendChild(articleClone); 
      });
  }
}

// Definir el elemento personalizado
customElements.define('news-viewer', NewsViewer);

