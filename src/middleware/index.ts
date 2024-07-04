import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(
  async ({ url }, next) => {
    console.log('middleware, url:', url.pathname);
    return next();
  },
);