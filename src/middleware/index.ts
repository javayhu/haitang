import { defineMiddleware } from "astro:middleware";
import { supabase } from "@/lib/supabase";
import dateConfig from ".json/date.json";

// import micromatch from "micromatch";
// const todayRoutes = ["/today(|/)"];
// const protectedRoutes = ["/dashboard(|/)"];
// const redirectRoutes = ["/signin(|/)", "/register(|/)"];
// const proptectedAPIRoutes = ["/api/favorite(|/)"];

// 定义路由模式的类型
type RoutePattern = RegExp;

// 定义一个函数来检查URL是否匹配给定的正则表达式列表
function isMatch(pathname: string, patterns: RoutePattern[]): boolean {
  return patterns.some(pattern => pattern.test(pathname));
}

// 将你的路由模式转换为正则表达式
const protectedRoutesRegex: RoutePattern[] = [/^\/dashboard(\/?)$/];
const redirectRoutesRegex: RoutePattern[] = [/^\/signin(\/?)$/, /^\/register(\/?)$/];
const protectedAPIRoutesRegex: RoutePattern[] = [/^\/api\/favorite(\/?)$/];

export const onRequest = defineMiddleware(
  async ({ locals, url, cookies, redirect }, next) => {
    console.log('middleware, url:', url.pathname);

    // const protectedRoutes = ["/dashboard(|/)"];
    if (isMatch(url.pathname, protectedRoutesRegex)) {
      const accessToken = cookies.get("sb-access-token");
      const refreshToken = cookies.get("sb-refresh-token");

      if (!accessToken || !refreshToken) {
        console.log('middleware, protectedRoutes, not token, to signin');
        return redirect("/signin");
      }

      const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value,
      });

      if (error) {
        console.log('middleware, protectedRoutes, to signin, error:', error);
        cookies.delete("sb-access-token", {
          path: "/",
        });
        cookies.delete("sb-refresh-token", {
          path: "/",
        });
        return redirect("/signin");
      }

      // console.log('middleware, data:', data);
      locals.username = data.user?.user_metadata?.name!;
      locals.useremail = data.user?.email!;
      locals.avatarurl = data.user?.user_metadata?.avatar_url!;
      cookies.set("sb-access-token", data?.session?.access_token!, {
        sameSite: "strict",
        path: "/",
        secure: true,
      });
      cookies.set("sb-refresh-token", data?.session?.refresh_token!, {
        sameSite: "strict",
        path: "/",
        secure: true,
      });
    }

    // const redirectRoutes = ["/signin(|/)", "/register(|/)"];
    if (isMatch(url.pathname, redirectRoutesRegex)) {
      const accessToken = cookies.get("sb-access-token");
      const refreshToken = cookies.get("sb-refresh-token");

      if (accessToken && refreshToken) {
        console.log('middleware, redirectRoutes, to dashboard');
        return redirect("/dashboard");
      }
    }

    // const proptectedAPIRoutes = ["/api/favorite(|/)"];
    if (isMatch(url.pathname, protectedAPIRoutesRegex)) {
      const accessToken = cookies.get("sb-access-token");
      const refreshToken = cookies.get("sb-refresh-token");

      // Check for tokens
      if (!accessToken || !refreshToken) {
        console.log('middleware, APIRoutes, 401 Unauthorized');
        return new Response(
          JSON.stringify({
            error: "Unauthorized",
          }),
          { status: 401 },
        );
      }

      // Verify the tokens
      const { error } = await supabase.auth.setSession({
        access_token: accessToken.value,
        refresh_token: refreshToken.value,
      });

      if (error) {
        console.log('middleware, APIRoutes, setSession, 401 error:', error);
        return new Response(
          JSON.stringify({
            error: "Unauthorized",
          }),
          { status: 401 },
        );
      }
    }

    return next();
  },
);


// middleware session: {
//   user: {
//     id: '3a04b83a-5e6a-427c-9bbf-bcd507059869',
//     aud: 'authenticated',
//     role: 'authenticated',
//     email: 'javayhu@gmail.com',
//     email_confirmed_at: '2024-04-19T16:16:24.734132Z',
//     phone: '',
//     confirmed_at: '2024-04-19T16:16:24.734132Z',
//     last_sign_in_at: '2024-04-20T16:16:09.66145Z',
//     app_metadata: { provider: 'github', providers: [Array] },
//     user_metadata: {
//       avatar_url: 'https://avatars.githubusercontent.com/u/1982582?v=4',
//       email: 'javayhu@gmail.com',
//       email_verified: true,
//       full_name: 'javayhu',
//       iss: 'https://api.github.com',
//       name: 'javayhu',
//       phone_verified: false,
//       preferred_username: 'javayhu',
//       provider_id: '1982582',
//       sub: '1982582',
//       user_name: 'javayhu'
//     },
//     identities: [ [Object] ],
//     created_at: '2024-04-19T16:16:24.726134Z',
//     updated_at: '2024-04-21T01:54:30.821122Z',
//     is_anonymous: false
//   },
//   session: {
//     access_token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImRiMzBqeC9CWHUwRVBoUWIiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEzNjY4MDcwLCJpYXQiOjE3MTM2NjQ0NzAsImlzcyI6Imh0dHBzOi8vYmVtYXJ6b2VkaGtwanFvc3p3d3Uuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjNhMDRiODNhLTVlNmEtNDI3Yy05YmJmLWJjZDUwNzA1OTg2OSIsImVtYWlsIjoiamF2YXlodUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImdpdGh1YiIsInByb3ZpZGVycyI6WyJnaXRodWIiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xOTgyNTgyP3Y9NCIsImVtYWlsIjoiamF2YXlodUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZnVsbF9uYW1lIjoiamF2YXlodSIsImlzcyI6Imh0dHBzOi8vYXBpLmdpdGh1Yi5jb20iLCJuYW1lIjoiamF2YXlodSIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiamF2YXlodSIsInByb3ZpZGVyX2lkIjoiMTk4MjU4MiIsInN1YiI6IjE5ODI1ODIiLCJ1c2VyX25hbWUiOiJqYXZheWh1In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3MTM2MDMyNjh9XSwic2Vzc2lvbl9pZCI6IjU3MDU4M2I5LTc3NTYtNGNhYS1hZTdlLTVmZDNkNTcyOGQzNyIsImlzX2Fub255bW91cyI6ZmFsc2V9.ELcayraYTNjFYMfDtbpoWm3lyD_krCIYt6bupCIjR1Q',
//     refresh_token: 'v5MK3D0_emvcZRwTG51JWw',
//     user: {
//       id: '3a04b83a-5e6a-427c-9bbf-bcd507059869',
//       aud: 'authenticated',
//       role: 'authenticated',
//       email: 'javayhu@gmail.com',
//       email_confirmed_at: '2024-04-19T16:16:24.734132Z',
//       phone: '',
//       confirmed_at: '2024-04-19T16:16:24.734132Z',
//       last_sign_in_at: '2024-04-20T16:16:09.66145Z',
//       app_metadata: [Object],
//       user_metadata: [Object],
//       identities: [Array],
//       created_at: '2024-04-19T16:16:24.726134Z',
//       updated_at: '2024-04-21T01:54:30.821122Z',
//       is_anonymous: false
//     },
//     token_type: 'bearer',
//     expires_in: 133.61999988555908,
//     expires_at: 1713668070
//   }
// }