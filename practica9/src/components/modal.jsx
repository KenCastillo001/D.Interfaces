import React, { useState, useEffect } from "react";

// Componente Modal que recibe titulo, precio y slug (identificador único)
const Modal = ({ titulo, precio, slug }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      alert(`¡Gracias por tu compra del curso "${titulo}"!`);
      actualizarEstadoCompra();
      setTimeout(() => {
        window.location.href = "/cursos/ArticleComprado";
      }, 2000);  // Llama a la función para actualizar la base de datos
    }
  }, [isOpen]);

  // Función para actualizar el estado de 'comprado' en la base de datos
  const actualizarEstadoCompra = async () => {
    try {
      await fetch(`https://cursosdatabasek-default-rtdb.europe-west1.firebasedatabase.app/cursos/${slug}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comprado: true }),
      });
      console.log("Estado de compra actualizado en la base de datos.");
    } catch (error) {
      console.error("Error al actualizar la compra:", error);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-lime-400 text-black px-6 py-3 rounded font-bold flex items-center"
      >
        ¡Adquirir ahora!
      </button>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg border border-white border-opacity-30 p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">¡Compra realizada con éxito!</h2>
        <p className="text-xl font-bold text-white mb-4">Curso adquirido: {titulo}</p>
        <p className="text-2xl text-gray-200 mb-4">El precio de tu compra es: ${precio}</p>
        <button
          onClick={() => setIsOpen(false)}
          className="bg-blue-500 bg-opacity-80 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:bg-opacity-100 transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;


