let locked = false
let previousOverflow = ''

export const setBodyScrollLocked = (nextLocked: boolean) => {
  if (typeof document === 'undefined') return

  if (nextLocked && !locked) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    locked = true
    return
  }

  if (!nextLocked && locked) {
    document.body.style.overflow = previousOverflow
    locked = false
  }
}

export const isBodyScrollLocked = () => locked

