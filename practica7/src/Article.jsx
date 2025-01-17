import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Article() {
  const { id } = useParams();  // Obtiene el parámetro 'id' de la URL
  const [noticia, setNoticia] = useState(null); // Guardará la noticia específica
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idioma, setIdioma] = useState("es");

  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch("https://news-foniuhqsba-uc.a.run.app"); // Asegúrate de que esta URL sea correcta
        if (!response.ok) throw new Error("Error al cargar los datos");

        const data = await response.json();
        console.log("Datos de la API:", data);  // Muestra los datos completos de la API para inspección

        // Aquí estamos usando String(id) para asegurarnos de que la comparación sea entre strings
        // Ajusta 'noticia.id' si la respuesta tiene un nombre diferente para el id
        const foundNoticia = data.find(noticia => String(noticia.id) === String(id));

        if (foundNoticia) {
          setNoticia(foundNoticia); // Si se encuentra la noticia, la guardamos en el estado
        } else {
          setError("Noticia no encontrada");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Detén el estado de carga
      }
    };

    fetchArticle(); // Llama a la función para obtener los datos
  }, [id]); // El useEffect se ejecuta cada vez que cambia el 'id'

  // Si está cargando, muestra el mensaje de carga
  if (loading) return <p>Cargando...</p>;

  // Si hay un error, muestra el mensaje de error
  if (error) return <p>Error: {error}</p>;

  // Si no se encuentra la noticia, muestra un mensaje
  if (!noticia) return <p>Noticia no encontrada</p>;

  return (
    <>
      <div className=" mb-4 grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-0 ">
        <button  onClick={() => cambiarIdioma("es")} className="mr-2  justify-items-center px-2 py-2"><img src="españa.png" alt="" />es</button>
        <button onClick={() => cambiarIdioma("ch")} className="mr-2 justify-items-center"><img src="china.png" alt="" />ch</button>
        <button onClick={() => cambiarIdioma("fr")} className="mr-2 justify-items-center"><img src="francia.png" alt="" />fr</button>
        <button onClick={() => cambiarIdioma("pt")} className="mr-2 justify-items-center"><img src="portugal.png" alt="" />pt</button>
        <button onClick={() => cambiarIdioma("it")} className="mr-2 justify-items-center"><img src="italia.png" alt="" />it</button>
        
      </div>
    <div className="w-100 bg-white shadow p-4 space-y-2 rounded-md hover:-translate-y-2 duration-300  ">
      <img className="h-30" src= {noticia.image_url} alt="" />
      <h1 className="text-black">
      {noticia.translations[idioma]?.headline || "Sin título"}
        </h1>
      <p className="mt-10 text-black">
      {noticia.translations[idioma]?.body || "Sin título"}
        </p>
      <p >Autor: {noticia.author}</p>
      <p>Fecha: {noticia.date}</p>

    </div>
    <footer className="shadow-lg  bg-white shadow-gray-900" >
      <img className="h-16" src="Nt.png" alt="" />
      <p>  Copyright &copy; 2024. All rights reserved.</p>
      <p>© 2024 The New York Times Company
      NYTCoContact UsAccessibilityWork with usAdvertiseT Brand StudioYour Ad ChoicesPrivacy PolicyTerms of ServiceTerms of SaleSite MapHelpSubscriptions</p>
    </footer>
     
    </>
  );
}

export default Article;
