'use client';

import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category_id: string;
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tid = params.get('tenant_id') || localStorage.getItem('tenant_id');
    if (tid) {
      setTenantId(tid);
      localStorage.setItem('tenant_id', tid);
    }
  }, []);

  useEffect(() => {
    if (!tenantId) return;

    const fetchMenuData = async () => {
      try {
        const categoriesRes = await fetch('/api/categories', {
          headers: { 'x-tenant-id': tenantId },
        });
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
        if (categoriesData.length > 0 && !selectedCategory) {
          setSelectedCategory(categoriesData[0].id);
        }

        const itemsRes = await fetch('/api/items', {
          headers: { 'x-tenant-id': tenantId },
        });
        const itemsData = await itemsRes.json();
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [tenantId]);

  const filteredItems = selectedCategory ? items.filter(item => item.category_id === selectedCategory) : items;

  if (!tenantId) return <div className="min-h-screen bg-orange-50 flex items-center justify-center"><p>Invalid tenant</p></div>;
  if (loading) return <div className="min-h-screen bg-orange-50 flex items-center justify-center"><p>Loading menu...</p></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Menu</h1>
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-6 py-3 rounded-lg font-medium transition-colors ${selectedCategory === cat.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}`}>
              {cat.name}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
              {item.description && <p className="text-gray-600 text-sm mb-4">{item.description}</p>}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-orange-500">${item.price.toFixed(2)}</span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
