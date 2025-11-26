import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions for common queries
export const db = {
  // Categories
  getCategories: async (tenantId: string) => {
    const { data, error } = await supabase
      .from('menu_categories')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('order', { ascending: true })
    return { data, error }
  },
  
  // Items
  getItems: async (tenantId: string, categoryId?: number) => {
    let query = supabase
      .from('menu_items')
      .select('*')
      .eq('tenant_id', tenantId)
    if (categoryId) query = query.eq('category_id', categoryId)
    const { data, error } = await query.order('order', { ascending: true })
    return { data, error }
  },
  
  // Orders
  getOrders: async (tenantId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
    return { data, error }
  },
}
