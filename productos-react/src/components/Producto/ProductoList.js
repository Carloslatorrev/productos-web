import React from "react";
import productoApi from "../../services/producto-api";

const ProductoList = ({ productos, setProductosFiltrados, setProductos }) => {
  const handleEliminar = async (id) => {
    await productoApi.eliminarProducto(id);
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  const handleActualizar = async (producto) => {
    await productoApi.actualizarProducto(producto.id, producto);
    setProductos(await productoApi.obtenerProductos());
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id ? { ...producto, [name]: value } : producto
      )
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="producto-item">
              <td>
                <input
                  type="text"
                  name="nombre"
                  value={producto.nombre}
                  onChange={(e) => handleChange(e, producto.id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="descripcion"
                  value={producto.descripcion}
                  onChange={(e) => handleChange(e, producto.id)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="precio"
                  value={producto.precio}
                  onChange={(e) => handleChange(e, producto.id)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="categoria"
                  value={producto.categoria}
                  onChange={(e) => handleChange(e, producto.id)}
                />
              </td>
              <td className="producto-actions">
                <button onClick={() => handleActualizar(producto)}>
                  Actualizar
                </button>
                <button className="producto-actions-red" onClick={() => handleEliminar(producto.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductoList;
