import React, { createContext, useState, useEffect, useCallback } from 'react';
import { inventoryApi } from '../services/inventoryApi';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryApi.getInventory();
      setItems(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Не вдалося завантажити інвентар');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshInventory = () => {
    fetchInventory();
  };

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const value = {
    items,
    loading,
    error,
    refreshInventory,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
