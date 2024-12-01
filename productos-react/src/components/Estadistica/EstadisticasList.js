import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import estadisticaApi from '../../services/estadistica-api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, Title);

function EstadisticasList() {
  const [estadisticas, setEstadisticas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const data = await estadisticaApi.obtenerEstadisticas();
        setEstadisticas(data);
      } catch (error) {
        console.error('Error al cargar las estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);

  if (loading) {
    return <div>Cargando estadísticas...</div>;
  }

  if (!estadisticas.length) {
    return <div>No hay datos disponibles para mostrar el gráfico.</div>;
  }

  
  const categoriasUnicas = estadisticas.map(estadistica => estadistica.categoria); 
  const categoriasCount = estadisticas.map(estadistica => estadistica.cantidad); 


  const data = {
    labels: categoriasUnicas, 
    datasets: [
      {
        data: categoriasCount, 
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], 
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div>
      <h2>Gráfico de Categorías de Productos</h2>
      <Pie data={data} />
    </div>
  );
}

export default EstadisticasList;
