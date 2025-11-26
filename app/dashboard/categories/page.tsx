'use client';

import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
  description?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tenantId, setTenantId] = useState<string>('');

  const demoTenantId = 'demo-tenant-123';

  useEffect(() => {
    setTenantId(demoTenantId);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories', {
        headers: { 'x-tenant-id': demoTenantId },
      });
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.name) return;
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'x-tenant-id': demoTenantId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });
      const data = await res.json();
      setCategories([...categories, data]);
      setNewCategory({ name: '', description: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-tenant-id': demoTenantId },
      });
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Categories</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Category</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Category name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handleAddCategory}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add Category
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-bold">Name</th>
                <th className="px-6 py-3 text-left text-gray-700 font-bold">Description</th>
                <th className="px-6 py-3 text-left text-gray-700 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-800">{cat.name}</td>
                  <td className="px-6 py-3 text-gray-600">{cat.description || '-'}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
