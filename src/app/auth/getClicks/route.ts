import { NextResponse } from 'next/server';
import { createClient } from "../../../utils/supabase/server";

// Define the route handler for GET requests
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const Url_ID = searchParams.get('Url_ID');

  if (!Url_ID) {
    return NextResponse.json({ error: 'Url_ID is required' }, { status: 400 });
  }

  try {
    const data = await getClicks(Url_ID);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Define the getClicks function
async function getClicks(Url_ID: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("URL_Clicks")
    .select("*")
    .in("Url ID", [Url_ID]); // Ensure Url_ID is passed as an array

  if (error) {
    console.error("Error loading clicks:", error.message);
    throw new Error("Failed to load clicks");
  }

  return data;
}
