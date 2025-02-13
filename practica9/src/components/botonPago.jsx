import React from 'react';



const PurchaseButton = ({ precio, slug }) => {
    
  const handlePayment = async () => {
    try {
      // Actualizamos la base de datos en Firebase
      await fetch(`https://cursosdatabasek-default-rtdb.europe-west1.firebasedatabase.app/cursos/${slug}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comprado: true })
      });

      alert(`¡Gracias por tu compra! Precio: ${precio}`);
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Hubo un error al procesar tu compra. Intenta nuevamente.');
    }
  };

  return (
    <button 
      type="button"
      className="purchase--btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      onClick={handlePayment}
    >
      Pagar
    </button>
  );
};

export default PurchaseButton;
