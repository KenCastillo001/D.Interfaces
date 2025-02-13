import React, { useEffect, useState } from 'react';
import StarRating from "../components/estrellas";  // Asegúrate de tener este componente creado

const Destacados = ({ soloTarjetas = false }) => {
  const [cursos, setCursos] = useState([]);

  // Función para obtener los cursos desde Firebase
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch('https://cursosdatabasek-default-rtdb.europe-west1.firebasedatabase.app/cursos.json');

        if (!response.ok) {
          throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }

        const items = await response.json();

        // Filtramos los cursos comprados y mapeamos la información
        const cursosComprados = Object.entries(items || {}) // Evita error si `items` es null
          .filter(([_, value]) => value?.estrellas === 5)
          .map(([key, value]) => ({
            slug: key,
            titulo: value?.titulo ?? 'Sin título',
            imagen: value?.imagen ?? '',
            estrellas: value?.estrellas ?? 0,
            url: value?.url ?? '',
            categoria: value?.categoria ?? 'Categoría desconocida',
            precio: value?.precio ?? 0,
            nivel: value?.nivel ?? 'Nivel desconocido',
            comprado: value?.comprado ?? false
          }));

        setCursos(cursosComprados);
      } catch (err) {
        console.error('Error al obtener los cursos:', err);
      }
    };

    fetchCursos();
  }, []);

  // Estructura de las tarjetas de los cursos
  const renderCursos = () => (
    <ul className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full ">
      {cursos.map((curso) => (
        <li className="w-full " key={curso.slug}>
          <article className="relative overflow-hidden rounded-3xl shadow-2xl bg-white bg-opacity-5 backdrop-blur-2xl border border-white border-opacity-30 text-white transition-transform duration-300 hover:shadow-3xl hover:scale-105">
            
            {/* Fondo degradado */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 opacity-25"></div>

            {/* Contenido de la tarjeta */}
            <div className="relative p-4">
              <a href={`/cursos/${curso.slug}`} className="text-white text-lg font-bold">
                <img src={curso.imagen} alt={curso.titulo} className="w-full h-64 object-cover rounded-xl shadow-lg" />
              </a>

              <div className="flex items-center justify-between leading-tight p-2 md:p-4">
                <div>
                  <h1>
                    <a className="no-underline hover:underline text-white text-2xl font-extrabold drop-shadow-lg" href={`/blog/${curso.slug}`}>
                      {curso.titulo}
                    </a>
                  </h1>
                </div>

                <div className="mt-4 text-right">
                  <p className="text-white text-lg font-semibold drop-shadow-sm">{curso.categoria}</p>
                  <p className="text-white mt-2 text-lg font-semibold flex items-center">
                    <img src="/nivel.png" alt="Nivel" className="w-5 h-5 mr-2" /> {curso.nivel}
                  </p>
                </div>
              </div>

              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <span className="text-red-400 text-3xl font-bold drop-shadow-md">${curso.precio}.00</span>

                {/* Mostrar estrellas usando el componente StarRating */}
                <StarRating estrellas={curso.estrellas} />
              </footer>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );

  // Si solo queremos las tarjetas, retornamos directamente las tarjetas
  if (soloTarjetas) {
    return renderCursos();
  }

  // Si no, retornamos todo el contenedor
  return (
    <main className="w-full max-w-screen-xl mx-auto mt-8 p-4">
      <div className="rounded-lg border border-purple bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6 dark:bg-gray-700 dark:shadow-gray-900/25">
        {cursos.length === 0 ? (
          <div className="text-center text-gray-700 dark:text-gray-300">No se encontraron cursos disponibles.</div>
        ) : (
          renderCursos()
        )}
      </div>
    </main>
  );
};

export default Destacados;
