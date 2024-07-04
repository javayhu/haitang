<h1 align=center>海棠诗社</h1>

<p align=center>https://haitang.app | https://haitang.vercel.app</p>

<p align=center>海棠诗社，古诗词的数字桃源</p>

<p align=center>如果觉得这个项目不错的话，可以点个⭐，非常感谢 </p>

![image](public/images/screenshot.png)

## 📌 Key Features

- 🎯 海棠诗社按诗集、朝代、诗人、诗词等方式检索，内容丰富，信息齐全
- 📝 海棠诗社按选集、主题、节日、节气、词牌、时令、地理等方式精选分类
- 🔍 海棠诗社全站响应式布局，兼容移动端，支持暗黑模式，响应速度快


## ✨ Tech Stacks

- 🖥️ Frontend: Astro + Tailwind + Shadcn/ui
- 📊 Analytics: [Umami + Google Analytics](src/layouts/Analytics.astro)
- 🗂️ Database: [SQLite + Drizzle](src/database/poetry.db)
- 💬 Comment: [Giscus](src/components/Giscus.astro)


## 🚀 Deployment

Fork这个项目，然后在Vercel中新建项目，选择Github仓库，配置默认即可。

开源版本的海棠诗社：https://haitang.vercel.app

现网版本的海棠诗社：https://haitang.app

### 开源版本和现网版本有什么区别？

部署平台的差异：开源版本的海棠诗社是部署在Vercel上，需要科学上网才能访问。现网版本的海棠诗社是部署在Netlify上，绑定了域名，所以国内可以直接访问。本项目是纯静态网站，还可以在其他平台上部署，例如CloudFlare。

网站功能的差异：为简化开源版本的上手流程，我从现网版本代码中去掉了跟诗词无关的注册登录和诗词收藏逻辑，
否则还要配置 Supabase + Github OAuth + Resend 等繁琐的步骤，这些逻辑跟学习诗词这个主体功能相关性不大。
如果确实对注册登录以及诗词收藏等逻辑感兴趣的话，可以看[这次代码提交](https://github.com/javayhu/haitang/commit/d8febb388bc9fe1fdd9a559c3e0e017e7fe5fff2)之前的代码，本项目中所有功能的代码都是有的，可以自行配置。


## 🚀 Getting Started

### 👉 Install Dependencies

```bash
yarn
```

### 👉 Development Command

```bash
yarn dev
```

### 👉 Build Command

```bash
yarn build
```


## 📝 License

Copyright (c) 2024 - Present, Designed & Developed by [javayhu](https://javayhu.site)

**Code License:** Released under the [MIT](LICENSE) license.
