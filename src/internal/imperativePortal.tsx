import React, { useCallback, useEffect, useState } from 'react'
import Portal from '../components/portal/Portal'

export interface ImperativePortalRenderProps<Options> {
  id: number
  options: Options
  visible: boolean
  close: () => void
  remove: () => void
}

export interface ImperativePortalRegistry<Options> {
  mount: (options: Options) => number
  update: (id: number, options: Options) => void
  get: (id: number) => Options | undefined
  keys: () => number[]
  close: (id: number) => void
  clear: () => void
}

export const createImperativePortalRegistry = <Options,>(
  render: (props: ImperativePortalRenderProps<Options>) => React.ReactElement,
): ImperativePortalRegistry<Options> => {
  const activeKeys = new Set<number>()
  const optionMap = new Map<number, Options>()
  const closers = new Map<number, () => void>()

  const remove = (id: number) => {
    Portal.remove(id)
    activeKeys.delete(id)
    optionMap.delete(id)
    closers.delete(id)
  }

  const close = (id: number) => {
    const closer = closers.get(id)
    if (closer) {
      closer()
      return
    }
    remove(id)
  }

  const ManagedPortal: React.FC<{ id: number; options: Options }> = ({ id, options }) => {
    const [visible, setVisible] = useState(true)
    const handleClose = useCallback(() => {
      setVisible(false)
    }, [])

    useEffect(() => {
      closers.set(id, handleClose)
      return () => {
        if (closers.get(id) === handleClose) closers.delete(id)
      }
    }, [handleClose, id])

    return render({ id, options, visible, close: handleClose, remove: () => remove(id) })
  }

  ManagedPortal.displayName = 'ImperativeManagedPortal'

  const update = (id: number, options: Options) => {
    optionMap.set(id, options)
    Portal.update(id, <ManagedPortal id={id} options={options} />)
  }

  return {
    mount: (options: Options) => {
      const id = Portal.add(null)
      activeKeys.add(id)
      update(id, options)
      return id
    },
    update,
    get: (id: number) => optionMap.get(id),
    keys: () => Array.from(activeKeys),
    close,
    clear: () => {
      Array.from(activeKeys).forEach(close)
    },
  }
}
