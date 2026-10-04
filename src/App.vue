<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getStatus, type BootstrapStatus } from './api/status'

const backend = ref<BootstrapStatus | null>(null)
const loading = ref(false)
const error = ref('')
const checkedAt = ref('')

async function refresh() {
  if (loading.value) return
  loading.value = true
  error.value = ''
  backend.value = null
  try {
    backend.value = await getStatus()
    checkedAt.value = new Date().toLocaleTimeString('zh-CN')
  } catch (cause) {
    error.value = cause instanceof Error && cause.name !== 'TimeoutError'
      ? cause.message : '连接超时，请确认后端已启动。'
    if (cause instanceof TypeError) error.value = '暂时无法连接后端，请确认后端已启动。'
  } finally {
    loading.value = false
  }
}

onMounted(refresh)
</script>

<template>
  <main class="page">
    <header class="brand"><span class="brand-mark" aria-hidden="true">W</span> 微信智能客服</header>
    <section class="panel" aria-labelledby="page-title">
      <p class="eyebrow">项目初始化</p>
      <h1 id="page-title">服务已准备好</h1>
      <p class="description">先确认前后端连接，后续逐步接入消息、知识库与人工审阅。</p>
      <div class="status-row" role="status" aria-live="polite">
        <span :class="['dot', { connected: backend }]" aria-hidden="true"></span>
        <div>
          <strong>{{ loading ? '正在检查连接…' : backend ? '后端已连接' : '后端未连接' }}</strong>
          <p>{{ error || (backend ? `最近检查 ${checkedAt}` : '等待连接检查') }}</p>
        </div>
        <button :disabled="loading" @click="refresh">{{ loading ? '检查中…' : '重新检查' }}</button>
      </div>
      <dl class="details">
        <div><dt>后端项目</dt><dd>wechat-ai</dd></div>
        <div><dt>前端项目</dt><dd>wechat-ai-web</dd></div>
        <div><dt>运行模式</dt><dd><span class="badge">{{ backend ? backend.effectiveMode : '待确认' }}</span></dd></div>
      </dl>
      <p class="note">当前完成基础工程初始化，微信消息处理尚未启用。</p>
    </section>
    <footer>个人微信 PC + RPA + Spring AI</footer>
  </main>
</template>
