'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    categories: 0,
    items: 0,
    orders: 0,
    tables: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const supabase = createClient();
        
        // Get counts from each table
        const [categoriesRes, itemsRes, ordersRes, tablesRes] = await Promise.all([
          supabase.from('menu_categories').select('*', { count: 'exact', head: true }),
          supabase.from('menu_items').select('*', { count: 'exact', head: true }),
          supabase.from('orders').select('*', { count: 'exact', head: true }),
          supabase.from('menu_tables').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          categories: categoriesRes.count || 0,
          items: itemsRes.count || 0,
          orders: ordersRes.count || 0,
          tables: tablesRes.count || 0,
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>
      
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Categories" value={stats.categories} />
          <StatCard label="Items" value={stats.items} />
          <StatCard label="Orders" value={stats.orders} />
          <StatCard label="Tables" value={stats.tables} />
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}
