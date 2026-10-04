# wechat-ai-web

- Independent Vue 3/TypeScript/Vite frontend. Backend: F:\ideaProject\wechat-ai.
- API contract source is backend docs/contracts/openapi.yaml; update the contract-version metadata when APIs change.
- Use scripts/dev.ps1 for the project-local Node runtime; check with -Action build.
- Native fetch and CSS suffice for this bootstrap; add dependencies only when required by a real feature.
- No model/Agent keys, WeChat operations or backend business permissions in this project.
- Do not read or modify mc-ai. Preserve unrelated files and local changes.
