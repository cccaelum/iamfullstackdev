import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './Home.jsx'
import ItemDetailPage from "./ItemDetailPage.jsx";
import InputCreate from "./InputCreate";


const App = () => {
  const [data, setData] = useState(null)
  const urlApi = 'http://localhost:3000'

const fetchData = async () => {
  try {
    const response = await fetch(urlApi)
    const resData = await response.json()
    setData(resData)
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchData()
}, [])

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Inicio</Link>
          <br></br>
          <Link to="/create">Agregar tarea</Link>
        </nav>
        {data === null 
        ? (<div>cargando...</div>) 
        : 
          <Routes>
            {/* Ruta para mostrar todas las tareas */}
            <Route path="/" element={<Home data={data} />} />

            {/* Ruta para crear una nueva tarea */}
            <Route
              path="/create"
              element={
                <div>
                  <InputCreate/>
                </div>
              }
            />
            {/* Rutas dinámicas para cada tarea */}
            {data.map(item => (
              <Route key={item._id} path={`/${item._id}`} element={<ItemDetailPage item={item}/>} />
            ))
            }
          </Routes>
        }
        
      </div>
    </Router>
  )
};

export default App;
