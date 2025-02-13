const cursos: any[] = [];

export const getPosts = async () => {
  if (cursos.length) return cursos;

  const items = await fetch('https://cursosdatabasek-default-rtdb.europe-west1.firebasedatabase.app/cursos.json')
    .then((res) => res.json());

  
  Object.entries(items)
  .forEach(([key, value]: [string, any]) => {
    cursos.push({
      slug: key, 
      titulo: value.titulo,
      imagen : value.imagen,
      url: value.url,
      categoria: value.categoria,
      precio: value.precio,
      nivel: value.nivel ,
      contenido : value.contenido,
      temario: Array.isArray(value.temario) ? value.temario : [],
      comprado: value.comprado || false,
    });
  });

  return cursos;
};
