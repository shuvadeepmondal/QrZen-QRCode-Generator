"use client"

import { useMemo } from "react"

export function useDebouncedEffect(effect: () => void, deps: any[], delay: number) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoDeps = useMemo(() => deps, deps)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => {
    let timeout: number | undefined
    return () => {
      window.clearTimeout(timeout)
      timeout = window.setTimeout(effect, delay)
    }
  }, [effect, delay, memoDeps])()
}
