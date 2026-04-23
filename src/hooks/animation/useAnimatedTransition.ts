import { useEffect, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native'
import { nativeDriverEnabled } from '../../platform/animation'
import { useReducedMotion } from './useReducedMotion'
export interface AnimatedTransitionOptions { visible: boolean; duration?: number; enterEasing?: (v: number) => number; exitEasing?: (v: number) => number; useNativeDriver?: boolean }
export interface AnimatedTransitionResult { mounted: boolean; progress: Animated.Value }
const EASE_OUT = Easing.bezier(0.075, 0.82, 0.165, 1.0)
const EASE_IN = Easing.bezier(0.55, 0.055, 0.675, 0.19)
export const useAnimatedTransition = ({ visible, duration = 300, enterEasing = EASE_OUT, exitEasing = EASE_IN, useNativeDriver: driver = nativeDriverEnabled }: AnimatedTransitionOptions): AnimatedTransitionResult => {
  const reduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(visible)
  const progress = useRef(new Animated.Value(visible ? 1 : 0)).current
  const animRef = useRef<Animated.CompositeAnimation | null>(null)
  const seqRef = useRef(0)
  useEffect(() => {
    const dur = reduceMotion ? 0 : duration; seqRef.current += 1; const seq = seqRef.current; animRef.current?.stop()
    if (visible) setMounted(true)
    if (dur <= 0) { progress.setValue(visible ? 1 : 0); if (!visible) setMounted(false); return }
    const anim = Animated.timing(progress, { toValue: visible ? 1 : 0, duration: dur, easing: visible ? enterEasing : exitEasing, useNativeDriver: driver, isInteraction: false })
    animRef.current = anim
    anim.start(({ finished }) => { if (finished && seq === seqRef.current && !visible) setMounted(false) })
  }, [visible, reduceMotion, duration, enterEasing, exitEasing, driver, progress])
  useEffect(() => () => { animRef.current?.stop() }, [])
  return { mounted, progress }
}
