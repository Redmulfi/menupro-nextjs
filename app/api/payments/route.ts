import { createClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

// GET - Retrieve all payments for a tenant
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const tenantId = request.headers.get('x-tenant-id');

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error' },
      { status: 500 }
    );
  }
}

// POST - Create a new payment
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const tenantId = request.headers.get('x-tenant-id');
    const body = await request.json();

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('payments')
      .insert([{ ...body, tenant_id: tenantId }])
      .select();

    if (error) throw error;
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error' },
      { status: 500 }
    );
  }
}

// PUT - Update a payment
export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient();
    const tenantId = request.headers.get('x-tenant-id');
    const body = await request.json();
    const id = request.nextUrl.searchParams.get('id');

    if (!tenantId || !id) {
      return NextResponse.json(
        { error: 'Tenant ID and ID required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('payments')
      .update(body)
      .eq('id', id)
      .eq('tenant_id', tenantId)
      .select();

    if (error) throw error;
    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a payment
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient();
    const tenantId = request.headers.get('x-tenant-id');
    const id = request.nextUrl.searchParams.get('id');

    if (!tenantId || !id) {
      return NextResponse.json(
        { error: 'Tenant ID and ID required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('payments')
      .delete()
      .eq('id', id)
      .eq('tenant_id', tenantId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error' },
      { status: 500 }
    );
  }
}
