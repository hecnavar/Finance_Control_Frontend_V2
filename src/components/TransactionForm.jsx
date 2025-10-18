import React, { useState, useEffect } from 'react';
import '../styles/TransactionsForm.css';

const TransactionForm = ({ onSave, initialData = {}, onCancel }) => {
    const isEditing = initialData.id;

    const [formData, setFormData] = useState({
        amount: initialData.amount || '',
        type: initialData.type || 'EXPENSE',
        date: initialData.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0],
        description: initialData.description || '',
        category: initialData.category || '',
        id: initialData.id || null,
    });
    
    useEffect(() => {
        setFormData({
            amount: initialData.amount || '',
            type: initialData.type || 'EXPENSE',
            date: initialData.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0],
            description: initialData.description || '',
            category: initialData.category || '',
            id: initialData.id || null,
        });
    }, [initialData]);

const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'type') {
        setFormData(prev => ({ 
            ...prev, 
            [name]: value === 'Gasto' ? 'EXPENSE' : 'INCOME' 
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.amount || !formData.description || !formData.date) {
            alert("Por favor, complete todos los campos requeridos.");
            return;
        }

        try {
            await onSave({
                ...formData,
                amount: parseFloat(formData.amount), 
            });
        } catch (error) {
            alert(`Error al guardar: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h3>{isEditing ? `Modificar Transacción #${formData.id}` : 'Añadir Nueva Transacción'}</h3>
            
            <div className="form-row">
                <label className="form-label">Tipo:</label>
                <select name="type" value={formData.type} onChange={handleChange} className="form-input">
                    <option value="EXPENSE">Gasto</option>
                    <option value="INCOME">Ingreso</option>
                </select>
                <label className="form-label">Fecha:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-row">
                <label className="form-label">Monto:</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="form-input" min="0.01" step="0.01" required />
                <label className="form-label">Categoría:</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} className="form-input" required />
            </div>

            <label className="form-label">Descripción:</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} className="form-input full-width-input" required />

            <div style={{ marginTop: '15px' }}>
                <button type="submit" className="submit-button">
                    {isEditing ? 'Guardar Cambios' : 'Registrar'}
                </button>
                
                {isEditing && (
                    <button type="button" onClick={onCancel} className="cancel-button">
                        Cancelar Edición
                    </button>
                )}
            </div>
        </form>
    );
};

export default TransactionForm;