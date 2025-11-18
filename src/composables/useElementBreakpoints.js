import { computed, toValue } from 'vue'
import { useElementSize } from '@vueuse/core'
import { pxValue } from '@vueuse/shared'

const EPS = 0.1

export const useElementBreakpoints = (target, breakpoints, options = {}) => {
  breakpoints = toValue(breakpoints)

  const { strategy = 'min-width', ...sizeOptions } = options
  const { width } = useElementSize(target, sizeOptions)

  function getValue(k) {
    const v = toValue(breakpoints[toValue(k)])
    return typeof v === 'string' ? pxValue(v) : v
  }

  const gte = (key) => width.value >= getValue(key)
  const lte = (key) => width.value <= getValue(key)
  const gt  = (key) => width.value >= getValue(key) + EPS
  const lt  = (key) => width.value <= getValue(key) - EPS

  const greaterOrEqual = (key) => computed(() => gte(key))
  const smallerOrEqual = (key) => computed(() => lte(key))
  const greater        = (key) => computed(() => gt(key))
  const smaller        = (key) => computed(() => lt(key))
  const between        = (a, b) => computed(() => gte(a) && lt(b))

  const isGreater         = (key) => gt(key)
  const isGreaterOrEqual  = (key) => gte(key)
  const isSmaller         = (key) => lt(key)
  const isSmallerOrEqual  = (key) => lte(key)
  const isInBetween       = (a, b) => gte(a) && lt(b)

  const entries = computed(() =>
    Object.keys(breakpoints)
      .map((k) => ({ key: k, value: getValue(k) }))
      .filter((e) => e.value != null)
      .sort((a, b) => a.value - b.value)
  )

  const current = () => computed(() => 
    entries.value
      .filter(e => strategy === 'min-width' ? gte(e.key) : lte(e.key))
      .map(e => e.key)
  )

  const active = () => computed(() => 
    current().value.at(strategy === 'min-width' ? -1 : 0)
  )

  const shortcutMethods = Object.keys(breakpoints)
    .reduce((shortcuts, key) => {
      Object.defineProperty(shortcuts, key, {
        get: () =>
          strategy === 'min-width'
            ? greaterOrEqual(key)
            : smallerOrEqual(key),
        enumerable: true,
        configurable: true,
      })
      return shortcuts
    }, {})

  return Object.assign(shortcutMethods, {
    greaterOrEqual,
    smallerOrEqual,
    greater,
    smaller,
    between,
    isGreater,
    isGreaterOrEqual,
    isSmaller,
    isSmallerOrEqual,
    isInBetween,
    current,
    active,
  })
}
