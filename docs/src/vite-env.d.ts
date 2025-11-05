/// <reference types="vite/client" />

// 声明 .md 文件模块类型
declare module '*.md' {
    import { ComponentType } from 'react'
    const Component: ComponentType
    export default Component
}

