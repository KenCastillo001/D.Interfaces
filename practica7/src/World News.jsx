
import './App.css'
import {useNavigate, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Article from './Article';


function World_News() {
  const [noticias, setNoticias] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
   const [idioma, setIdioma] = useState("es");
  


  
   const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
  };

  const navigate = useNavigate();
    
    const handleNavigation = (id) => {
      navigate(`/Article/${id}`);
    };


useEffect(() => {
 
  const fetchPosts = async () => {
    try {
      const response = await fetch("https://news-foniuhqsba-uc.a.run.app/World News");
      if (!response.ok) {
        throw new Error("Error al cargar los datos");
      }
      const data = await response.json();
      setNoticias(data); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };

  fetchPosts(); 
}, []); 


if (loading) return <p>Cargando...</p>;
if (error) return <p>Error: {error}</p>;

return (
  <>
    <div className=" mb-4 grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-0 ">
        <button  onClick={() => cambiarIdioma("es")} className="mr-2  justify-items-center px-2 py-2"><img src="españa.png" alt="" />es</button>
        <button onClick={() => cambiarIdioma("ch")} className="mr-2 justify-items-center"><img src="china.png" alt="" />ch</button>
        <button onClick={() => cambiarIdioma("fr")} className="mr-2 justify-items-center"><img src="francia.png" alt="" />fr</button>
        <button onClick={() => cambiarIdioma("pt")} className="mr-2 justify-items-center"><img src="portugal.png" alt="" />pt</button>
        <button onClick={() => cambiarIdioma("it")} className="mr-2 justify-items-center"><img src="italia.png" alt="" />it</button>
        
      </div>
    


 
  <div>
  
  
  <ul className='cuerpo grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2' >
            {noticias.map((noticia) => (
           <li key={noticia.id}  className="w-82 bg-white shadow p-4 space-y-2 rounded-md hover:-translate-y-2 duration-300"  onClick={() => handleNavigation(noticia.id)} >
            
            <div className='text-sm w-full text-gray-400'   >
            <svg
    viewBox="0 0 24 24"
    fill="none"
    height="24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    class="w-10 h-10 text-gray-300 bg-gray-600 rounded-full p-1"
  >
    <path
      d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="currentColor"
    ></path>
  </svg>
  <h2 className="text-black text-lg uppercase">
                <img className="h-30 " src= {noticia.image_url} alt="" />
                {noticia.translations[idioma]?.headline || "Sin título"}
              </h2>
              <p className="mt-4 text-black">
                {noticia.translations[idioma]?.abstract || "Sin resumen"}
              </p>
            <p className='text-black'>{noticia.author}</p>
            <p className='text-black'>{noticia.section}</p>
            <p className='text-black'>{noticia.date}</p>
            </div>
           
           </li>
            ))}
         </ul>
    

  </div>

  <footer className="shadow-lg  bg-white shadow-gray-900" >
      <img className="h-16" src="Nt.png" alt="" />
      <p>  Copyright &copy; 2024. All rights reserved.</p>
      <p>© 2024 The New York Times Company
      NYTCoContact UsAccessibilityWork with usAdvertiseT Brand StudioYour Ad ChoicesPrivacy PolicyTerms of ServiceTerms of SaleSite MapHelpSubscriptions</p>
    </footer>
     
  </>
)
}

export default World_News