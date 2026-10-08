import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('smartmart_compare');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('smartmart_compare', JSON.stringify(compareList));
  }, [compareList]);

  const toggleCompare = (product) => {
    const exists = compareList.some(item => item.id === product.id);
    if (exists) {
      setCompareList(prev => prev.filter(item => item.id !== product.id));
      return { added: false, message: 'Removed from comparison' };
    } else {
      if (compareList.length >= 4) {
        return { added: false, error: true, message: 'Maximum 4 products can be compared at once' };
      }
      setCompareList(prev => [...prev, product]);
      return { added: true, message: 'Added to comparison list' };
    }
  };

  const isInCompare = (productId) => {
    return compareList.some(item => item.id === productId);
  };

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(item => item.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider value={{
      compareList,
      toggleCompare,
      isInCompare,
      removeFromCompare,
      clearCompare,
      compareCount: compareList.length
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
