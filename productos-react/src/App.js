import React, { useEffect, useState } from 'react';
import './App.css';
import productoApi from './services/producto-api';
import estadisticaApi from './services/estadistica-api'; 
import ProductoForm from './components/Producto/ProductoForm';
import ProductoList from './components/Producto/ProductoList'; 
import EstadisticasList from './components/Estadistica/EstadisticasList'; 

function App() {
  const [productos, setProductos] = useState([]); 
  const [estadisticas, setEstadisticas] = useState([]); 
  const [activeTab, setActiveTab] = useState('productos'); 
  const [nombreBusqueda, setNombreBusqueda] = useState('');
  const [idBusqueda, setIdBusqueda] = useState('');
  

 
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await productoApi.obtenerProductos(); 
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    const fetchEstadisticas = async () => {
      try {
        const data = await estadisticaApi.obtenerEstadisticas(); 
        setEstadisticas(data); 
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
      }
    };

    fetchProductos(); 
    fetchEstadisticas(); 
  }, []); 

  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  
  const handleNombreBusqueda = (e) => {
    setNombreBusqueda(e.target.value);
  };

 
  const handleIdBusqueda = (e) => {
    setIdBusqueda(e.target.value);
  };

  
  const buscarPorNombre = async () => {
    if (nombreBusqueda.trim() === "") {
      const data = await productoApi.obtenerProductos(); 
      setProductos(data); 
    } else {
      const productosFiltradosPorNombre = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(nombreBusqueda.toLowerCase())
      );
      setProductos(productosFiltradosPorNombre); 
    }
  };
  
  const buscarPorId = async () => {
    if (idBusqueda.trim() === "") {
      const data = await productoApi.obtenerProductos(); 
      setProductos(data); 
    } else {
      const productosFiltradosPorId = productos.filter((producto) =>
        producto.id.toString().includes(idBusqueda)
      );
      setProductos(productosFiltradosPorId); 
    }
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Productos</h1>
        <div>
          <button onClick={() => handleTabChange('productos')}>Productos</button>
          <button onClick={() => handleTabChange('estadisticas')}>Estadísticas</button>
        </div>

        {activeTab === 'productos' && (
          <div>
            <h2>Buscar Producto</h2>
            <div>
              <input
                type="text"
                placeholder="Buscar por nombre"
                value={nombreBusqueda}
                onChange={handleNombreBusqueda}
              />
              <button className='btnBuscar' onClick={buscarPorNombre}>Buscar por Nombre</button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Buscar por ID"
                value={idBusqueda}
                onChange={handleIdBusqueda}
              />
              <button className='btnBuscar' onClick={buscarPorId}>Buscar por ID</button>
            </div>
          </div>
        )}

    
        {activeTab === 'productos' && (
          <div>
            <h2>Crear Producto</h2>
            <ProductoForm setProductos={setProductos}  />
            <h2>Lista de Productos</h2>
            <ProductoList productos={productos}  setProductos={setProductos} />
          </div>
        )}

        {activeTab === 'estadisticas' && (
          <div>
            <h2>Estadísticas</h2>  
            <EstadisticasList estadisticas={estadisticas} />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
