import api from './api';  

const API_URL = '/productos';  

const obtenerProductos = async () => {
  try {
    const response = await api.get(API_URL);  
    return response.data;  
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
};

const crearProducto = async (producto) => {
  try {
    const response = await api.post(API_URL, producto); 
    return response.data; 
  } catch (error) {
    console.error('Error al crear el producto:', error);
  }
};

const actualizarProducto = async (id, producto) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, producto); 
    return response.data; 
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  }
};

const eliminarProducto = async (id) => {
  try {
    await api.delete(`${API_URL}/${id}`); 
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
};

const buscarProductoPorId = async (id) => {
  try {
    const response = await api.get(`${API_URL}/${id}`); 
    return response.data; 
  } catch (error) {
    console.error('Error al buscar el producto por ID:', error);
  }
};

const buscarProductoPorCategoria = async (categoria) => {
  try {
    const response = await api.get(`${API_URL}?categoria=${categoria}`); 
    return response.data;  
  } catch (error) {
    console.error('Error al buscar productos por categoría:', error);
  }
};

export default {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  buscarProductoPorId,
  buscarProductoPorCategoria,
};
