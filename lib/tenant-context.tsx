'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface TenantContextType {
  tenantId: string | null;
  setTenantId: (id: string) => void;
  clearTenantId: () => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenantId, setTenantIdState] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem('tenant_id');
    if (stored) {
      setTenantIdState(stored);
    }
    setIsLoaded(true);
  }, []);

  const setTenantId = (id: string) => {
    setTenantIdState(id);
    localStorage.setItem('tenant_id', id);
  };

  const clearTenantId = () => {
    setTenantIdState(null);
    localStorage.removeItem('tenant_id');
  };

  if (!isLoaded) {
    return <>{children}</>;
  }

  return (
    <TenantContext.Provider value={{ tenantId, setTenantId, clearTenantId }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
}
