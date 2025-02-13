import React, { useState, useEffect } from 'react';

const App = () => {
  const [cursos, setCursos] = useState([]);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      if (cursos.length) return;

      const response = await fetch('https://cursosdatabasek-default-rtdb.europe-west1.firebasedatabase.app/cursos.json');
      const items = await response.json();

      const cursosArray = Object.entries(items).map(([key, value]) => ({
        slug: key,
        titulo: value.titulo,
        imagen: value.imagen,
        url: value.url,
        categoria: value.categoria,
        precio: value.precio,
        nivel: value.nivel,
        estrellas: value.estrellas,
        contenido: value.contenido,
        temario: Array.isArray(value.temario) ? value.temario : [],
        comprado: value.comprado || false,
      }));

      setCursos(cursosArray);
    };

    getPosts();
  }, [cursos]);

  const filtrarCursos = (query) => {
    const queryLower = query.toLowerCase();
    return cursos.filter(curso =>
      curso.titulo.toLowerCase().includes(queryLower) ||
      curso.categoria.toLowerCase().includes(queryLower)
    );
  };

  const resultadosFiltrados = filtrarCursos(query);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          className="block w-[600px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Buscar cursos..."
          required
        />
      </div>
      {isFocused && (
        <div className="max-h-[500px] overflow-y-auto scroll-smooth snap-y snap-mandatory p-4 space-y-4">
          {resultadosFiltrados.length === 0 ? (
            <p>No se encontraron cursos.</p>
          ) : (
            resultadosFiltrados.map((curso) => (
              <div
                key={curso.slug}
                className="snap-start border border-white/30 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white/30 backdrop-blur-lg"
              >
                <h2 className="text-2xl text-blue-900 font-bold mb-4">{curso.titulo}</h2>
                <img
                  src={curso.imagen}
                  alt={curso.titulo}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                <p className="text-blue-900 mb-2">
                  <strong className="text-blue-900 font-bold">Categoría:</strong> {curso.categoria}
                </p>
                <p className="text-purple mb-2">
                  <strong className="text-blue-900 font-bold">Precio:</strong> {curso.precio}
                </p>
                <p className="text-blue-900 mb-4">
                  <strong className="text-blue-900 font-bold">Nivel:</strong> {curso.nivel}
                </p>
                <button
                  onClick={() => window.location.href = `/cursos/${curso.slug}`}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Ver curso
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default App;
