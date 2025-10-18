import React, { useState, useEffect } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

const API_BASE_URL = '/api'; 

const Dashboard = () => {
    const { 
        transactions, 
        loading: crudLoading, 
        error: crudError,
        saveTransaction, 
        deleteTransaction,
    } = useTransactions();

    const [balance, setBalance] = useState(null);
    const [monthlySummary, setMonthlySummary] = useState([]);
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [summaryError, setSummaryError] = useState(null);
    
    const [editingTransaction, setEditingTransaction] = useState(null); 

    const fetchSummaryData = async () => {
        setSummaryLoading(true);
        setSummaryError(null);
        try {
            const balanceResponse = await fetch(`${API_BASE_URL}/summary/balance`);
            const monthlyResponse = await fetch(`${API_BASE_URL}/summary/monthly`);

            setBalance(await balanceResponse.json());
            setMonthlySummary(await monthlyResponse.json());
        } catch (err) {
            setSummaryError("Error al cargar datos de resumen.");
        } finally {
            setSummaryLoading(false);
        }
    };

    const handleSave = async (data) => {
        await saveTransaction(data);
        setEditingTransaction(null);
    };

    useEffect(() => {
        fetchSummaryData();
    }, [transactions]); 


    if (crudLoading || summaryLoading) {
        return <div style={{padding: '20px'}}>Cargando...</div>;
    }

    if (crudError || summaryError) {
        return <div style={{padding: '20px', color: 'red'}}>Error de conexión: {crudError || summaryError}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>💰 Dashboard Financiero Personal</h1>

            <div style={{ border: '2px solid #28a745', padding: '15px', marginBottom: '30px', backgroundColor: '#e9f7ef' }}>
                <h2>Saldo Total Actual: ${balance !== null ? balance.toFixed(2) : '0.00'}</h2>
            </div>
            
            <TransactionForm 
                onSave={handleSave} 
                initialData={editingTransaction || {}}
                onCancel={() => setEditingTransaction(null)}
            />

            <TransactionList 
                transactions={transactions} 
                onDelete={deleteTransaction} 
                onEdit={(t) => setEditingTransaction(t)}
            />
            
            <h3 style={{marginTop: '30px'}}>Evolución Mensual (Datos para Gráfica)</h3>
            {monthlySummary.length > 0 ? (
                 <p>Resumen cargado: {monthlySummary.length} meses analizados.</p>
            ) : (
                <p>No hay suficientes datos para el resumen mensual.</p>
            )}
        </div>
    );
};

export default Dashboard;