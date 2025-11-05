export function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/-{2,}/g, '-')
    .toLowerCase()
}

export function normalizeLocale(locale?: string): string | undefined {
  if (!locale) return undefined
  const lowered = locale.toLowerCase()
  if (lowered === 'zh-cn' || lowered === 'zh') return 'zh-CN'
  if (lowered === 'en-us' || lowered === 'en') return 'en-US'
  return locale
}
