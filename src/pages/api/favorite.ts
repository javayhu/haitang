import type { APIRoute } from "astro";
import { supabase } from '@/lib/supabase';

// doc1: https://supabase.com/docs/guides/auth/auth-deep-dive/auth-deep-dive-jwts#jwts-in-supabase
// doc2: https://supabase.com/docs/guides/auth/auth-deep-dive/auth-row-level-security
// doc3: https://supabase.com/docs/guides/auth/auth-deep-dive/auth-policies

// 获取收藏的诗词
export const GET: APIRoute = async ({ url }) => {
  // 解析URL查询参数
  const queryParams = new URLSearchParams(url.search);
  const worksId = queryParams.get('works_id');
  console.log('favorite, get, works_id:', worksId);
  
  // get user id from supabase
  const { data: dataGetUser, error: errorGetUser } = await supabase.auth.getUser();
  if (errorGetUser) { // 应该不太可能，middleware那边已经判断了
    console.log('favorite, get, errorGetUser:', errorGetUser);
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
      }),
      { status: 401 },
    );
  }

  // const user_id = "49e99b22-f704-4ddd-896b-73c7d85dc696";
  const user_id = dataGetUser.user?.id;
  console.log('favorite, get, user_id:', user_id);
  
  let query = supabase
    .from("users_like_works")
    .select("*")
    .order("created_at", { ascending: false })
    .eq('user_id', user_id);

  // 如果提供了works_id，就添加一个过滤条件
  if (worksId) {
    query = query.eq('works_id', worksId);
  }

  const { data, error } = await query;

  if (error) {
    console.log('favorite, get, error:', error);
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify(data));
};

// 收藏诗词
export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { works_id, works_title, works_author, works_dynasty } = body;
  console.log('favorite, post, works_id:', works_id, ', works_title:', works_title);

  // get user id from supabase
  const { data: dataGetUser, error: errorGetUser } = await supabase.auth.getUser();
  if (errorGetUser) { // 应该不太可能，middleware那边已经判断了
    console.log('favorite, post, errorGetUser:', errorGetUser);
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
      }),
      { status: 401 },
    );
  }

  // const user_id = "49e99b22-f704-4ddd-896b-73c7d85dc696";
  const user_id = dataGetUser.user?.id;
  console.log('favorite, post, user_id:', user_id);
  const { data, error } = await supabase
    .from('users_like_works')
    .insert([
      { works_id, works_title, works_author, works_dynasty, user_id },
    ]);
  console.log('favorite, post, data:', data, ', error:', error);

  if (error) {
    return new Response(
      JSON.stringify({
        message: error.message
      }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify({ data }));
}

// 取消收藏诗词
// https://supabase.com/docs/reference/javascript/delete
export const DELETE: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { works_id } = body;
  console.log('favorite, delete, works_id:', works_id);

  // get user id from supabase
  const { data: dataGetUser, error: errorGetUser } = await supabase.auth.getUser();
  if (errorGetUser) { // 应该不太可能，middleware那边已经判断了
    console.log('favorite, delete, errorGetUser:', errorGetUser);
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
      }),
      { status: 401 },
    );
  }

  // const user_id = "49e99b22-f704-4ddd-896b-73c7d85dc696";
  const user_id = dataGetUser.user?.id;
  console.log('favorite, delete, user_id:', user_id);
  const { data, error } = await supabase
    .from('users_like_works')
    .delete().eq('user_id', user_id).eq('works_id', works_id);
  console.log('favorite, delete, data:', data, ', error:', error);

  if (error) {
    return new Response(
      JSON.stringify({
        message: error.message
      }),
      { status: 500 },
    );
  }

  return new Response(JSON.stringify({ data }));
}
