import { createClient } from "../../../utils/supabase/server";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // Get the authenticated user
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse the Url_id from the query parameters
  const url = new URL(request.url);
  const urlId = url.searchParams.get("urlId");

  if (!urlId) {
    return NextResponse.json({ error: "Url_id is required" }, { status: 400 });
  }

  const { data: urlData, error: urlError } = await supabase
    .from("URLS")
    .select("*")
    .eq("id", urlId)
    .eq("user_id", user.id)
    .single();

  if (urlError) {
    return NextResponse.json({ error: urlError.message }, { status: 500 });
  }

  const { data: clickData, error: clickError } = await supabase
    .from("URL_Clicks")
    .select("*")
    .eq("url_id", urlId)
    .order("created_at", { ascending: false });

  if (clickError) {
    return NextResponse.json({ error: clickError.message }, { status: 500 });
  }

  return NextResponse.json({ url: urlData, clicks: clickData }, { status: 200 });
}