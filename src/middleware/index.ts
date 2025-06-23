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