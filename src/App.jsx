import React, { useState, useEffect } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  
  const BACKEND_URL = 'http://localhost:8080/api/transactions';

  useEffect(() => {
    fetch(BACKEND_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTransactions(data);
      })
      .catch(error => {
        console.error("Error al obtener datos:", error);
        setError("Error al conectar con el Backend. Asegúrate de que Spring Boot esté corriendo en el puerto 8080. Detalle: " + error.message);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tablero de Gasto/Ingreso Personal (Prueba de Conexión)</h1>
      
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      
      <h2>Transacciones cargadas: ({transactions.length})</h2>
      
      {transactions.length > 0 ? (
        <table style={{ border: '1px solid black', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid black', padding: '8px' }}>Fecha</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Descripción</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Monto</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={t.id || index}> 
                <td style={{ border: '1px solid black', padding: '8px' }}>{t.date}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{t.description}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Esperando datos de Spring Boot...</p>
      )}
    </div>
  );
}

export default App;