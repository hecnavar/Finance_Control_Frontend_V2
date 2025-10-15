import React from 'react';

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
        return <p>No hay transacciones registradas. ¡Añade una para empezar!</p>;
    }

    return (
        <div style={{ marginTop: '30px' }}>
            <h3>Historial de Transacciones (CRUD: Read/Delete/Update)</h3>
            
            <table style={styles.table}>
                
                <thead> 
                    <tr style={styles.headerRow}>
                        <th style={styles.th}>Fecha</th>
                        <th style={styles.th}>Tipo</th>
                        <th style={styles.th}>Descripción</th>
                        <th style={styles.th}>Categoría</th>
                        <th style={styles.th}>Monto</th>
                        <th style={styles.th}>Acciones</th>
                    </tr>
                </thead>
        
                <tbody>
                    {transactions.map(t => (
                        <tr key={t.id} style={{ backgroundColor: t.type === 'INCOME' ? '#e8f5e9' : '#ffebee' }}>
                            <td style={styles.td}>{t.date}</td>
                            <td style={styles.td}>{t.type === 'INCOME' ? 'Ingreso' : 'Gasto'}</td>
                            <td style={styles.td}>{t.description}</td>
                            <td style={styles.td}>{t.category}</td>
                            <td style={styles.tdAmount}>${t.amount.toFixed(2)}</td>
                            <td style={styles.td}>
                                <button 
                                    onClick={() => onEdit(t)}
                                    style={styles.editButton}
                                >
                                    Modificar
                                </button>
                                <button 
                                    onClick={() => handleDelete(t.id)}
                                    style={styles.deleteButton}
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