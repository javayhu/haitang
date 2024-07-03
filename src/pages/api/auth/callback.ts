import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const authCode = url.searchParams.get("code");
  console.log('callback, authCode:', authCode);
  if (!authCode) {
    console.log('callback error, no code provided');
    return new Response("No code provided", { status: 400 });
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);
  if (error) {
    console.log('callback, exchangeCodeForSession error:', error);
    return new Response(error.message, { status: 500 });
  }

  const { access_token, refresh_token } = data.session;
  console.log('callback, session, access_token:', access_token
    + ', refresh_token:', refresh_token);
  cookies.set("sb-access-token", access_token, {
    path: "/",
    secure: true,
    httpOnly: true,
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
    secure: true,
    httpOnly: true,
  });
  return redirect("/dashboard");
};
