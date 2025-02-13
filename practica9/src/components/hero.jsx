import React, { useState, useEffect } from "react";

const slides = [
  { id: 1, img: "slider1.jpg", title: "ACADEMIAE", subtitle: "LA PLATAFORMA DE FORMACIÓN ONLINE QUE NECESITAS" },
  { id: 2, img: "slider2.jpg", title: "ANALISIS DE DATOS", subtitle: "FORMATE EN UNA DE LAS RAMAS DE LA INFORMATICA CON MAYOR CRECIMIENTO"  },
  { id: 3, img: "slider3.jpg" ,title: "PROGRAMACIÓN", subtitle: "DOMINA LOS LENGUAJES DE PROGRAMACIÓN MÁS MODERNOS DEL MERCADO"  },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  const moveSlide = (i) => {
    setIndex(i);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000); // Cambia de slide cada 4 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-screen h-screen flex-shrink-0 relative">
            <img src={slide.img} alt={`Slide ${slide.id}`} className="w-full h-full object-cover" />
            {slide.title && (
              <div className="absolute top-1/3 left-10 text-white">
                <h1 className="text-6xl font-bold">{slide.title}</h1>
                <p className="text-2xl">{slide.subtitle}</p>
                <a href="#" className="mt-4 inline-block px-6 py-3 bg-yellow-500 text-black font-bold rounded">DESCUBRE MÁS</a>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => moveSlide(i)}
            className={`w-4 h-4 rounded-full cursor-pointer ${index === i ? "bg-yellow-500" : "bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;