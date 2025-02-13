
import React, { useEffect, useState } from 'react';
import App from "../components/Buscador"
import CerrarSesionButton from "../components/cerrarSesion"

const Header = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    setUsuario(usuarioGuardado);
  }, []);

  return (
    <header className="bg-white shadow-md h-40 sticky top-0 left-0 right-0 z-50 ">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo y nombre de la academia */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path 
                d="M3 21h18M5 21V8l7-5 7 5v13M10 9h4m-4 4h4m-4 4h4" 
                stroke="#000000" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <a href="/">
              <span className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 mt-8">
                ACADEMIAE
              </span>
          </a>

        </div>

        {/* Buscador */}
        <div>
         <App />
          <div id="results"></div>
        </div>

        {/* Iconos y usuario */}
        
          <div className='grid grid-cols-3 gap-2  '>
          <a href="/cursos/loginForm">
            <img src="/user.png" alt="Perfil de usuario" />
          </a>
          {usuario && (
            <div className="bg-white shadow-xl border border-gray-300 rounded-2xl p-4 text-center w-fit mx-auto mt-4 mr-32">
            <span className="text-4xl font-extrabold text-gray-800">
            ¡<span className="text-blue-500">{usuario}</span>! 🚀
            </span>
            <CerrarSesionButton/>
  </div>
)}
          </div>
         
        </div>
      
    </header>
  );
};

export default Header;
