import { createClient } from "../../../utils/supabase/server"; 
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  // Authenticate the user
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch click data for the URL associated with the user
  const { data, error } = await supabase
    .from("URL_Clicks")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Handle possible errors when fetching data
  if (error) {
    console.error('Error fetching clicks:', error);
    return NextResponse.json({ error: 'Failed to fetch clicks' }, { status: 500 });
  }

  // If no data found
  if (!data) {
    return NextResponse.json({ error: 'No clicks found for this user' }, { status: 404 });
  }

  // Return the click data
  return NextResponse.json({ clicks: data });
}
