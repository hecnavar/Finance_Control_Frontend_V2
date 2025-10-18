import React from 'react';
import '../styles/TransactionList.css'; 

const TransactionList = ({ transactions, onDelete, onEdit }) => {

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar esta transacción? Esta acción es irreversible.')) {
            try {
                await onDelete(id);
            } catch (error) {
                alert(`Error al borrar: ${error.message}`);
            }
        }
    };

    if (transactions.length === 0) {
        return <p style={{ marginTop: '20px' }}>No hay transacciones registradas. ¡Usa el formulario para añadir la primera!</p>;
    }

    return (
        <div style={{ marginTop: '30px' }}>
            <h3>Historial de Transacciones (CRUD: Leer, Borrar, Modificar)</h3>
            
            <table className="transaction-table">
                
                <thead> 
                    <tr className="header-row">
                        <th className="th">Fecha</th>
                        <th className="th">Tipo</th>
                        <th className="th">Descripción</th>
                        <th className="th">Categoría</th>
                        <th className="th td-amount">Monto</th>
                        <th className="th">Acciones</th>
                    </tr>
                </thead>
                
                <tbody>
                    {transactions.map(t => (
                        <tr 
                            key={t.id} 
                            className={t.type === 'INCOME' ? 'income-row' : 'expense-row'}
                        >
                            <td className="td">{t.date}</td>
                            <td className="td">{t.type === 'INCOME' ? 'Ingreso' : 'Gasto'}</td>
                            <td className="td">{t.description}</td>
                            <td className="td">{t.category}</td>
                            <td className="td td-amount">
                                ${t.amount ? t.amount.toFixed(2) : '0.00'}
                            </td>
                            <td className="td">
                                <button 
                                    onClick={() => onEdit(t)}
                                    className="edit-button"
                                >
                                    Modificar
                                </button>
                                <button 
                                    onClick={() => handleDelete(t.id)}
                                    className="delete-button"
                                >
                                    Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;