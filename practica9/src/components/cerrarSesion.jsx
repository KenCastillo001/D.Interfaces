import React from 'react';

import { useState, useEffect } from "react";

const CerrarSesionButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Verifica si hay un usuario en localStorage al montar el componente
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      setVisible(true);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("email");
    
    // Oculta el botón antes de redirigir
    setVisible(false);
    
    setTimeout(() => {
      window.location.href = "/"; // Redirige al login después de cerrar sesión
    }, 500); // Pequeño retraso visual antes de la redirección
  };

  return (
    visible && (
      <button
        onClick={cerrarSesion}
        className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition-all duration-300 ease-in-out opacity-100 hover:opacity-80 ml-20"
      >
        Cerrar Sesión
      </button>
    )
  );
};

export default CerrarSesionButton;
