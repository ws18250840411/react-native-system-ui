/// <reference types="vite/client" />

// 声明 .md 文件模块类型
declare module '*.md' {
    import { ComponentType } from 'react'
    const Component: ComponentType
    export const frontmatter: Record<string, any>
    export const headings: Array<{ depth: number; text: string; slug: string }>
    export const title: string
    export default Component
}
