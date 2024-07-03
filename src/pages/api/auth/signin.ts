import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const requestData = await request.json();
  console.log('signin, request data:', requestData);
  const { email, password, provider } = requestData;
  console.log('signin, Email:', email);
  // console.log('signin, Password:', password);
  console.log('signin, provider:', provider);

  const siteUrl = import.meta.env.SITE_URL;
  console.log('signin, site_url:', siteUrl);
  const callbackUrl = siteUrl + "/api/auth/callback";
  // console.log('signin, callbackUrl: ', callbackUrl);
  if (provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: callbackUrl,
      },
    });

    if (error) {
      console.log('signin, signInWithOAuth error:', error);
      return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }

    console.log('signin success, data url:', data.url);
    // return redirect(data.url);
    console.log('register success');
    return new Response(JSON.stringify({ message: 'success', url: data.url }), { status: 200 });
  }

  if (!email || !password) {
    console.log('signin error, email and password are required');
    return new Response(JSON.stringify({ message: 'email and password are required' }), { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log('signin, signInWithPassword error:', error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }

  const { access_token, refresh_token } = data.session;
  cookies.set("sb-access-token", access_token, {
    sameSite: "strict",
    path: "/",
    secure: true,
  });
  cookies.set("sb-refresh-token", refresh_token, {
    sameSite: "strict",
    path: "/",
    secure: true,
  });

  console.log('signin success');
  return new Response(JSON.stringify({ message: 'success' }), { status: 200 });
};
