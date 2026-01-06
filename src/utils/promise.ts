export const isPromiseLike = (value: unknown): value is Promise<unknown> =>
  !!value && typeof value === 'object' && typeof (value as any).then === 'function'

