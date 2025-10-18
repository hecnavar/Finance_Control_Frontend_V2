import { useState, useEffect, useCallback } from 'react';

const API_URL = '/api/transactions'; 

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) { 
                throw new Error('Failed to fetch transactions');
            }
            
            const data = await response.json();
            setTransactions(data);
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);


    const saveTransaction = async (transactionData) => {
        const method = transactionData.id ? 'PUT' : 'POST';
        const url = transactionData.id ? `${API_URL}/${transactionData.id}` : API_URL;

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transactionData),
        });

        if (response.ok) {
            await fetchTransactions(); 
            return true;
        }
        throw new Error(`Failed to ${method === 'POST' ? 'create' : 'update'} transaction`);
    };

    const deleteTransaction = async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            await fetchTransactions(); 
            return true;
        }
        throw new Error('Failed to delete transaction');
    };

    return { 
        transactions, 
        loading, 
        error, 
        fetchTransactions, 
        saveTransaction, 
        deleteTransaction,
        setTransactions 
    };
};