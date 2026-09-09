import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import { supabaseAdmin } from "@/lib/supabase-server";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "1") {
    redirect("/admin");
  }

  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminDashboardClient initialProjects={projects ?? []} />;
}
