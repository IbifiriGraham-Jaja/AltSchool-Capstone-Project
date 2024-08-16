import { createClient } from "../../../utils/supabase/server";

export async function getClicks(Url_ID) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("URL_Clicks")
    .select("*")
    .in("Url ID", Url_ID);

  if (error) {
    console.log("error loading Clicks");
    return error.message;
  }
  return data;
}