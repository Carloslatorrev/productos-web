import React from "react";
import productoApi from "../../services/producto-api";

const ProductoItem = ({ producto, setProductos }) => {
  const handleEliminar = async () => {
    await productoApi.eliminarProducto(producto.id);
    setProductos((prevProductos) => prevProductos.filter(p => p.id !== producto.id));
  };

  return (
    <li>
      {producto.nombre} - ${producto.precio} - {producto.categoria}
      <button onClick={handleEliminar}>Eliminar</button>
    </li>
  );
};

export default ProductoItem;
