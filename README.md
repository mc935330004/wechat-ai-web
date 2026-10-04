# wechat-ai-web

Vue 3 + TypeScript + Vite 独立前端，目录 `F:\TraeProject\wechat-ai-web`。

## 启动

先启动后端 `F:\ideaProject\wechat-ai`，再在本项目根目录执行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\dev.ps1
```

浏览器打开 `http://127.0.0.1:5173`。首页会通过 Vite `/api` 代理检查后端状态，显示 OFF 模式。后端未启动会明确显示未连接，可点击重新检查。

脚本优先使用本项目 `.tools\node-22`，不修改机器或用户级 Node 环境。编辑器中的 Node interpreter 也应设为 Node 22.12+；本机安装位置 `.tools\node-22\node.exe`。在已有兼容 Node 的终端也可直接 `npm run dev`。

## 安装与构建

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\dev.ps1 -Action install
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\dev.ps1 -Action test
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\dev.ps1 -Action build
```

install 使用已提交的 package-lock.json 与 npm ci；build 包含 TypeScript 类型检查，静态产物写入 dist。

开发代理默认 `http://127.0.0.1:8080`，如有调整复制 `.env.example` 为 `.env.local` 并修改 `BACKEND_URL`。生产静态部署需将 `/api` 反向代理到后端；preview 仅预览静态产物，未配置生产代理时不会自行访问后端。

当前只有项目连接检查页，尚未实现客服业务或微信自动化。

## 接口与版本

接口真值：后端 `docs/contracts/openapi.yaml`。当前仅一个只读接口，前端使用小型类型定义并在 fetch 边界校验；接口增多时再生成 API client。

`docs/contract-version.json` 记录后端 API 版本与 hash；更新接口时两端同步。`.tools`、node_modules、dist 和实际环境配置不进 Git。
