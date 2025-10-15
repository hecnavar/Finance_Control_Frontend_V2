import React, { useState, useEffect } from 'react';

const TransactionForm = ({ onSave, initialData = {} }) => {
    const [formData, setFormData] = useState({
        amount: initialData.amount || '',
        type: initialData.type || 'EXPENSE',
        date: initialData.date || new Date().toISOString().split('T')[0],
        description: initialData.description || '',
        category: initialData.category || '',
        id: initialData.id || null,
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSave(formData);
            if (!formData.id) {
                setFormData({ amount: '', type: 'EXPENSE', date: new Date().toISOString().split('T')[0], description: '', category: '', id: null });
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
            <h3>{formData.id ? 'Modificar' : 'Añadir Nueva'} Transacción</h3>
            
            
            <button type="submit">Guardar</button>
        </form>
    );
};

export default TransactionForm;