import React from 'react'
import './index.less'

type ContainerProps = {
  children?: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="doc-container">
      <main className="doc-container-markdown">{children}</main>
    </div>
  )
}

export default Container
