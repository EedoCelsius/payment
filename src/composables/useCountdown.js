import { computed, ref, toRef, toValue } from 'vue'
import { useTimeoutPoll } from '@vueuse/core'

export function useCountdown(durationMs, options = {}) {
  const { interval = 100, immediate = true, onFinish } = options

  durationMs = toRef(durationMs)
  const isRunning = ref(false)
  const remaining = ref(durationMs.value)

  let targetTime

  const syncRemaining = () => {
    remaining.value = Math.max(0, targetTime - Date.now())
    if (!remaining.value) {
      controls.pause()
      isRunning.value = false
      onFinish && onFinish()
    }
  }

  const controls = useTimeoutPoll(syncRemaining, interval, { immediate })

  function resume() {
    targetTime = Date.now() + remaining.value
    controls.resume()
    isRunning.value = true
  }

  function pause() {
    controls.pause()
    remaining.value = Math.max(0, targetTime - Date.now())
    isRunning.value = false
  }

  function reset(to = durationMs, opts = {}) {
    remaining.value = Math.max(0, toValue(to))
    targetTime = Date.now() + remaining.value
    opts.start ?? true ? resume() : pause()
  }

  if (immediate) resume()

  return {
    resume,
    pause,
    reset,
    isRunning,
    remaining: computed(() => Math.ceil(remaining.value / interval) * interval),
  }
}
