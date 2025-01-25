const articles: any[] = [];

export const getPosts = async () => {
  if (articles.length) return articles;

  const items = await fetch('https://blogastrok-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
    .then((res) => res.json());

  
  Object.entries(items).forEach(([key, value]: [string, any]) => {
    articles.push({
      slug: key, 
      title: value.title,
      Image: value.Image,
      description: value.description,
      likes: value.likes  
    });
  });

  return articles;
};

