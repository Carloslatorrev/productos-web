import React, { useState } from "react";
import productoApi from "../../services/producto-api";

const ProductoForm = ({ setProductosFiltrados, setProductos }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await productoApi.crearProducto(formData);
    const updatedProductos = await productoApi.obtenerProductos();
    setProductos(updatedProductos);
    setProductosFiltrados(updatedProductos);
    productos
    setFormData({ nombre: "", descripcion: "", precio: "", categoria: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="producto-form">
      <div className="form-row">
        <input
          type="text"
          value={formData.nombre}
          onChange={(e) =>
            setFormData({ ...formData, nombre: e.target.value })
          }
          placeholder="Nombre"
        />
        <input
          type="text"
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
          placeholder="Descripción"
        />
        <input
          type="number"
          value={formData.precio}
          onChange={(e) =>
            setFormData({ ...formData, precio: e.target.value })
          }
          placeholder="Precio"
        />
        <input
          type="text"
          value={formData.categoria}
          onChange={(e) =>
            setFormData({ ...formData, categoria: e.target.value })
          }
          placeholder="Categoría"
        />
        <button type="submit">Crear Producto</button>
      </div>
    </form>
  );
};

export default ProductoForm;
