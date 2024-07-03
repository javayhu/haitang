
import config from "@/config/config.json";
import { trim } from '@/utils/utils';

export const trimSlash = (s: string) => trim(trim(s, '/'));

export const getAsset = (path: string): string =>
  '/' +
  [config.site.base_url, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
