import { createClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 });
    const { data, error } = await supabase.from('tables').select('*').eq('tenant_id', tenantId);
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const tenantId = request.headers.get('x-tenant-id');
    if (!tenantId) return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 });
    const body = await request.json();
    const { data, error } = await supabase.from('tables').insert([{ ...body, tenant_id: tenantId }]).select();
    if (error) throw error;
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient();
    const tenantId = request.headers.get('x-tenant-id');
    const id = request.nextUrl.searchParams.get('id');
    if (!tenantId || !id) return NextResponse.json({ error: 'Tenant ID and ID required' }, { status: 400 });
    const body = await request.json();
    const { data, error } = await supabase.from('tables').update(body).eq('id', id).eq('tenant_id', tenantId).select();
    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Error' }, { status: 500 });
  }
}
