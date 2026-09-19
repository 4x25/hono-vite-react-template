# hono-vite-react-template

React + Vite 客户端渲染，React Router 管理前端哈希路由，Hono 提供 JSON API、HTML 骨架和生产静态资源。没有 React SSR，也不使用 `hydrateRoot`。前后端源码独立，默认通过同源 `/api` 通信。

## 开发

```sh
npm install
npm run dev
```

打开终端显示的地址（默认 `http://localhost:5173`）。`GET /api/health` 返回 `{"status":"ok"}`。

Hono 返回空的 `#root` 和 `/src/client/index.tsx` 脚本标签，浏览器执行 React `createRoot()`。Vite 负责开发资源与 HMR；Hono 插件注入 `/@vite/client`，客户端入口的 React preamble 初始化 Fast Refresh。

## 生产

```sh
npm run build
npm start
```

默认监听 `http://localhost:3000`，可通过 `PORT=8080 npm start` 修改端口。`npm run preview` 同样运行生产 Hono 服务，需要先构建。

构建先检查类型，再分别运行：

- `npm run build:client`：以 `src/client/index.tsx` 为入口，输出到 `dist/client`，所有 CSS 合并为一个文件。
- `npm run build:server`：以 `src/server/index.ts` 为入口，将服务端第三方依赖一起打包，输出 Node.js ESM 到 `dist/server/index.mjs`。

Vite 配置中的 `build.ssr` 仅用于生成 Node.js 服务端 bundle，并不意味着进行 React SSR。构建产出的 JS、CSS、图片等资源文件名不带哈希。服务端直接引用固定的 `/assets/index.js` 和 `/assets/style.css`，不生成或读取 manifest，也不需要根目录 `index.html`。

部署时只需上传整个 `dist`，服务器安装 Node.js 后直接运行：

```sh
node dist/server/index.mjs
# 自定义端口
PORT=8080 node dist/server/index.mjs
```

不需要上传 `package.json`、`package-lock.json` 或 `node_modules`，也不需要在服务器执行 npm install。`.mjs` 明确声明 ESM 模块类型；Node.js 内置模块由运行时提供。静态资源路径相对于服务端产物解析。

## 目录职责

```text
src/
├── client/
│   ├── index.tsx        # React 挂载、HashRouter、Fast Refresh、全局样式
│   ├── routes/index.tsx # 集中声明前端路由
│   ├── layouts/AppLayout.tsx # 顶部导航、内容区、页脚
│   ├── pages/           # 页面组件
│   │   ├── HomePage/    # 模型列表、搜索和品牌筛选
│   │   ├── ModelDetail/ # 模型详情
│   │   └── NotFound/   # 未匹配哈希路由的 404 页面
│   ├── hooks/useTheme.ts # 明暗主题与本地存储
│   ├── data/models.ts   # 本地模型示例数据
│   ├── styles.css      # Tailwind CSS 与 HeroUI 样式入口
│   └── global.less     # 自定义全局样式
└── server/
    ├── app.ts           # 创建 Hono 应用、注册首页和 API
    ├── routes/api.ts    # JSON API 路由
    ├── document.ts      # 唯一 HTML 骨架，标题、meta、资源标签
    ├── dev.ts           # 开发入口，由 Hono Vite 插件加载
    └── index.ts         # 生产入口，静态文件服务和 Node.js 监听
```

组件优先使用 HeroUI v3 默认样式；Tailwind CSS v4 用于布局和必要的样式调整。`ahooks` 的 `useDebounce` 处理搜索防抖，`useLocalStorageState` 保存主题选择，未设置时跟随系统主题。品牌图标使用 `@lobehub/icons`，其他图标使用 `@gravity-ui/icons`。生产构建统一输出 `assets/style.css`。

Tailwind CSS 和 HeroUI 的导入放在 `styles.css`，避免 Less 解析第三方 CSS 时出错；自定义全局样式继续写在 `global.less`。客户端入口按此顺序导入两个文件。

`/#/` 展示模型列表；`/#/models/gpt-demo` 和 `/#/models/claude-demo` 展示详情。本地示例数据不代表实时模型规格。所有页面通过嵌套路由共用 `AppLayout`。

新增页面放在 `client/pages/<页面名>/`，页面目录必须使用 PascalCase（首字母大写，如 `HomePage/`、`NotFound/`），禁止使用小写、kebab-case 或 snake_case 命名，页面样式就近放置，并在 `client/routes/index.tsx` 注册路由。跨页面复用组件出现后再添加 `client/components/`；新增接口放在 `server/routes`，由 `app.ts` 注册。只有实际需要共用类型时再新增 `src/shared`，不要从客户端导入服务端实现。修改页面标题或全局 meta 则编辑 `server/document.ts`。

前端使用 `HashRouter`：`/#/` 显示首页，未匹配的哈希路径显示前端 404 页面并提供返回首页链接。应用内导航使用 React Router 的 `Link` 或 `useNavigate`。哈希部分不会发送给服务器，直接打开或刷新 `/#/任意路径` 仍只请求 `/`，因此服务端仅 `GET /` 返回 HTML，不需要 SPA 回退。未知页面路径、缺失资源和未匹配的 `/api` 请求均使用 Hono 默认的 404 响应（纯文本 `404 Not Found`）。首页请求无需指定 `Accept` 请求头。

## 检查

```sh
npm run typecheck
npm run lint
npm run build
```

前后端均开启 TypeScript 严格检查。`npm run build` 包含类型检查和前后端构建；当前未配置自动化测试。
