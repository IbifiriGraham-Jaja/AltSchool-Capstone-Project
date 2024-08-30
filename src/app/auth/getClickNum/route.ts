import { createClient } from "../../../utils/supabase/server"; 
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
  .from("URL_Clicks") // Ensure this matches the table name
  .select("*")
  .eq("user_id", user.id)
  .single(); // Retrieve a single record

if (error) {
  console.error('Error fetching clicks:', error.message); // Improved error message
  return NextResponse.json({ error: 'Failed to fetch clicks' }, { status: 500 });
}

  if (data.length === 0) {
    return NextResponse.json({ error: 'No clicks found for this user' }, { status: 404 });
  }

  return NextResponse.json({ clicks: data });
}
