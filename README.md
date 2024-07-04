<h1 align=center>海棠诗社</h1>

<p align=center>https://haitang.app</p>

<p align=center>海棠诗社，古诗词的数字桃源</p>

<p align=center>如果觉得这个项目不错的话，可以点个⭐，非常感谢 </p>

![image](public/images/screenshot.png)

## 📌 Key Features

- 🎯 海棠诗社按诗集、朝代、诗人、诗词等方式检索，内容丰富，信息齐全
- 📝 海棠诗社按选集、主题、节日、节气、词牌、时令、地理等方式精选分类
- 🔍 海棠诗社全站响应式布局，兼容移动端，支持暗黑模式，响应速度快
- 👤 海棠诗社支持添加自己喜欢的诗词到个人诗单 


## ✨ Tech Stacks

- 🖥️ Frontend: Astro + Tailwind + Shadcn/ui
- 📊 Analytics: Umami + Google Analytics
- 🗂️ Database: SQLite + Drizzle
- 💬 Comment: Giscus


## 🚀 Deployment

Fork这个项目，然后在Vercel中新建项目，选择Github仓库，配置默认即可。

> 注：为简化开源版本的上手时间，我去掉了跟诗词无关的注册登录和诗词收藏逻辑，
  否则要配置 Supabase + Github OAuth + Resend 等繁杂的操作，
  如果确实对注册登录等逻辑感兴趣的话，可以看[历史代码提交](https://github.com/javayhu/haitang/commit/d8febb388bc9fe1fdd9a559c3e0e017e7fe5fff2)进行探索。


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


## ℹ️ Other Information

- 💬 Comment: [Giscus config file](src/components/Giscus.astro)
- 📊 Analytics: [Umami + Google Analytics](src/layouts/Analytics.astro)
- 🗂️ Database: [poetry SQLite file](src/database/poetry.db)


## 📝 License

Copyright (c) 2024 - Present, Designed & Developed by [javayhu](https://javayhu.site)

**Code License:** Released under the [MIT](LICENSE) license.
