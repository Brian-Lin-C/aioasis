import { useCallback, useEffect, useState } from 'react'

const KEY = 'oasis-trail-progress'

type Progress = Record<string, true>

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Progress
    }
    return {}
  } catch {
    return {}
  }
}

/** 小径路标打卡进度：存浏览器本地，跨页面共享（打卡/取消打卡即写回） */
export function useTrailProgress() {
  const [progress, setProgress] = useState<Progress>(() => load())

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress))
    } catch {
      /* 隐私模式等写入失败时静默降级：本次会话内仍可用 */
    }
  }, [progress])

  const toggle = useCallback((stepId: string) => {
    setProgress((p) => {
      const next = { ...p }
      if (next[stepId]) delete next[stepId]
      else next[stepId] = true
      return next
    })
  }, [])

  const doneCount = useCallback(
    (stepIds: string[]) => stepIds.filter((id) => progress[id]).length,
    [progress],
  )

  return { progress, toggle, doneCount }
}
