export interface BootstrapStatus {
  appName: 'wechat-ai'
  status: 'UP'
  effectiveMode: 'OFF'
  schemaVersion: 1
}

export async function getStatus(): Promise<BootstrapStatus> {
  const base = (import.meta.env?.VITE_API_BASE_URL || '').replace(/\/$/, '')
  const response = await fetch(`${base}/api/v1/admin/status`, {
    signal: AbortSignal.timeout(5000),
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new Error(`后端响应异常（${response.status}）`)
  const data: unknown = await response.json()
  // ponytail: validate this one contract at the boundary; add generated clients when APIs grow.
  if (typeof data !== 'object' || data === null
    || !('appName' in data) || data.appName !== 'wechat-ai'
    || !('status' in data) || data.status !== 'UP'
    || !('effectiveMode' in data) || data.effectiveMode !== 'OFF'
    || !('schemaVersion' in data) || data.schemaVersion !== 1) {
    throw new Error('后端返回的数据与当前接口版本不一致')
  }
  return data as BootstrapStatus
}
