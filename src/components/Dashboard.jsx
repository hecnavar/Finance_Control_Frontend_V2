import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

const API_BASE_URL = '/api'; 

const Dashboard = () => {
    const { 
        transactions, 
        loading, 
        error, 
        saveTransaction, 
        deleteTransaction 
    } = useTransactions();
    
    const [editingTransaction, setEditingTransaction] = useState(null);
    
    const handleSave = async (data) => {
        await saveTransaction(data);
        setEditingTransaction(null);
    };

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>💰 Dashboard Financiero Personal</h1>

            <TransactionForm 
                onSave={handleSave} 
                initialData={editingTransaction || {}}
            />

            <TransactionList 
                transactions={transactions} 
                onDelete={deleteTransaction} 
                onEdit={handleEdit} 
            />

        </div>
    );
};

export default Dashboard;