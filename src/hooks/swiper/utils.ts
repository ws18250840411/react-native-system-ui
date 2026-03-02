import type React from 'react'

export const LOOP_THRESHOLD = 10

export const createWebMouseHandlers = ({ enabled, vertical, mainSize, clearAuto, next, prev, schedule, dragRef, interRef }: { enabled: boolean; vertical: boolean; mainSize: number; clearAuto: () => void; next: () => void; prev: () => void; schedule: () => void; dragRef: React.MutableRefObject<number | null>; interRef: React.MutableRefObject<boolean> }) => {
  if (!enabled) return undefined
  return {
    onPointerDown: (e: any) => { if (e.nativeEvent.pointerType !== 'mouse' || e.nativeEvent.button !== 0) return; dragRef.current = vertical ? e.nativeEvent.pageY : e.nativeEvent.pageX; interRef.current = true; clearAuto() },
    onPointerUp: (e: any) => { const s = dragRef.current; dragRef.current = null; if (s == null || e.nativeEvent.pointerType !== 'mouse') return; const d = (vertical ? e.nativeEvent.pageY : e.nativeEvent.pageX) - s; if (Math.abs(d) >= mainSize * 0.15) { d < 0 ? next() : prev() }; interRef.current = false; schedule() },
    onPointerLeave: () => { if (dragRef.current != null) { dragRef.current = null; interRef.current = false; schedule() } },
  } as Record<string, any>
}
