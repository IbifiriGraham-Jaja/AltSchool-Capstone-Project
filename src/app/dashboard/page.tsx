import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";
import LinkStats from "@/components/linkstats";
import { DashboardShortener } from "@/components/shortener_dashboard";
import { MdLogout } from "react-icons/md";


export default async function Dashboard() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const userId = data.user.id;

  // Fetch the total number of links created by the user
  const { data: linksData, error: linksError } = await supabase
    .from("URLS")
    .select("*", { count: "exact" })
    .eq("user_id", userId);

    if (linksError ) {
      console.error("Error fetching link stats:", linksError );
    }
  
    const totalLinks = linksData?.length || 0;
    
  const userName: string = data?.user?.user_metadata?.user_name;
  return (
    <main className="bg-Gray px-6 md:px-10 lg:px-20 pt-12 min-h-screen">
      <nav className="flex justify-between items-center">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-4 text-VeryDarkBlue ">
          Hi there, {userName}
        </h1>
        <form action="./auth/signout" method="POST">
          <button
            type="submit"
            className="flex items-center px-3 py-1 rounded-full gap-2"
          >
            <MdLogout /> Logout
          </button>
        </form>
      </nav>
      <LinkStats />
      <DashboardShortener />
    </main>
  );
}