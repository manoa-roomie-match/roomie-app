import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;
  if (!supabaseUrl || !supabaseServiceRole) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceRole);
};

export async function POST(req: Request) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE.' },
      { status: 500 },
    );
  }

  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = `profiles/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage.from('profile-pics').upload(filePath, buffer, {
    contentType: file.type,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from('profile-pics').getPublicUrl(filePath);

  return NextResponse.json({ publicUrl: data.publicUrl });
}
