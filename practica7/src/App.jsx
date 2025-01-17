/* eslint-disable react/no-unknown-property */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState , useEffect } from 'react'
import './App.css'
import World_News from './World News'
import Technology from './Technology'
import Home from "./Home";
import Sport from "./Sport";
import Finance from "./Finance";
import Entertainment from "./Entertainment";
import Login from './Login';
import { Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Article from './Article';
import { useLocalStorage } from 'react-use';
import RutaProtegida from './RutaProtegida';



function App() {
 const [usuario , setUsuario] =  useLocalStorage('Usuario',null)
  
      
      const [fechaHora, setFechaHora] = useState(new Date());
      const [dialogoAbierto, setDialogoAbierto] = useState(false);
      const [data, setData] = useState([]); 
      const [noticias, setNoticias] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [searchText, setSearchText] = useState(''); 
      
      

      const AbrirDialogo = () => setDialogoAbierto(true);
      const CerrarDialogo = () => setDialogoAbierto(false);
      
     
        const navigate = useNavigate();
      
        const logear = () => {
          navigate('/Login'); 
        };
     
  const formatearFecha = (fecha) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(fecha);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://news-foniuhqsba-uc.a.run.app');
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        console.log('Datos obtenidos:', data);
        setNoticias(data);
      } catch (err) {
        console.error('Error al cargar los datos:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


  const noticiasFiltradas = noticias.filter(
    (noticia) =>
      Array.isArray(noticia.translations) &&
      noticia.translations.some(
        (translation) =>
          translation.headline?.toLowerCase().includes(searchText.toLowerCase()) ||
          translation.abstract?.toLowerCase().includes(searchText.toLowerCase())
      )
  );

  
  

  return (
    <>

{dialogoAbierto && (
        <div className="overlay">
          <dialog open className='container mx-auto my-auto flex justify-center '>
            <div className='h-80'>
            <button>Buscar</button>
            <input className='h-12 w-80' type="text" placeholder="Ingrese un texto..." value={searchText} 
             onChange={(e) => setSearchText(e.target.value)} />
            <button onClick={CerrarDialogo} >Cerrar</button>
            </div>
             {/* Mostrar las noticias filtradas si existen */}
             {loading ? (
                <p>Cargando...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : noticiasFiltradas.length === 0 ? (
                <p>No se encontraron noticias</p>
              ) : (
                <ul className="cuerpo grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {noticiasFiltradas.map((noticia) => (
                    <li
                      key={noticia.id}
                      className="w-82 bg-white shadow p-4 space-y-2 rounded-md hover:-translate-y-2 duration-300"
                      onClick={() => handleNavigation(noticia.id)}
                    >
                      <div className="text-sm w-full text-gray-400">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          height="24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="w-10 h-10 text-gray-300 bg-gray-600 rounded-full p-1"
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
                          {noticia.translations[idioma]?.headline || "Sin título"}
                        </h2>
                        <p className="mt-4 text-black">
                          {noticia.translations[idioma]?.abstract || "Sin resumen"}
                        </p>
                        <p className="text-black">{noticia.author}</p>
                        <p className="text-black">{noticia.section}</p>
                        <p className="text-black">{noticia.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            
           
            
          </dialog>
        </div>
      )}

  
      
    
   
      {/* Navegación (opcional) */}
      
    

      <div className='logo bg-white'>
      <div>
      <button className='buscador bg-white' onClick={AbrirDialogo}><img src="buscador.png" alt="" /></button>
      



      


      <p className='text-black '>{formatearFecha(fechaHora)}</p>
        <img src="Nt.png" alt="" />
      </div>

        <button className=''>Suscribe for € 0.5/WEEK</button>
        
        <button className='ml-8 p-0' onClick={ logear}><img src="logIn3.png" alt="" className=' flex justify-center h-14' />Iniciar Sesión</button>

      </div>

      

      <nav className='shadow-lg  bg-white shadow-gray-900 flex justify-around gap-0'>

        <Link className="hover:underline text-black" to="/">Home</Link>
        <Link className="hover:underline text-black" to="/World_News">World News</Link>
        <Link  className="hover:underline text-black" to="/Sport">Sport</Link>
        <Link className="hover:underline text-black" to="/Finance">Finance</Link>
        <Link className="hover:underline text-black" to="/Technology">Technology</Link>
        <Link className="hover:underline text-black" to="/Entertainment">Entertainment</Link>
        

      </nav>


      <span className="flex items-center mb-6 mt-6 p-0">
        <span className="h-px flex-1 bg-white"></span>
      </span>
      

      {/* Define las rutas */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>}/>
        <Route path="/World_News" element={<World_News />} />
        <Route path="/Sport" element={<Sport />} />
        <Route path="/Finance" element={<Finance />} />
        <Route path="/Technology" element={<Technology/>} />
        <Route path="/Entertainment" element={<Entertainment/>} />
        <Route
              element={<RutaProtegida canActivate={!!usuario} redirectPath="/Login" />}>
          <Route path="/Article/:id" element={<Article />} />
        </Route>

       
      </Routes>
    
 
    
     
        
    </>
  )
}

export default App
