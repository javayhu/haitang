import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

// 这里是在服务器端执行的，具体来讲是Netlify Functions的运行环境中执行
export const POST: APIRoute = async ({ request, redirect }) => {
  const requestData = await request.json();
  console.log('register, request data:', requestData);
  const { email, password } = requestData;
  console.log('register, Email:', email);
  // console.log('register, Password:', password);

  if (!email || !password) { // 已经不会发生这样的情况，register.astro中已经判断了
    console.log('register fail, email and password are required');
    return new Response(JSON.stringify({ message: 'email and password are required' }), { status: 400 });
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log('register fail, signUp error:', error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }

  console.log('register success');
  return new Response(JSON.stringify({ message: 'success' }), { status: 200 });
};
