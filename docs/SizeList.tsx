import React from 'react'
import sizes from './component-sizes'

const formatSize = (bytes: number) => {
  return (bytes / 1024).toFixed(1) + 'k'
}

const getColor = (bytes: number) => {
  const kb = bytes / 1024
  if (kb > 20) return '#ff4d4f' // Red
  if (kb > 10) return '#faad14' // Orange
  if (kb > 5) return '#fadb14' // Yellow
  return '#52c41a' // Green
}

export default () => {
  const total = sizes.reduce((acc, item) => acc + item.size, 0)
  const avg = total / sizes.length

  return (
    <div style={{ padding: '20px 0' }}>
      <h3>所有导出内容的体积</h3>
      <p style={{ marginBottom: 20, color: '#666' }}>
        平均: {formatSize(avg)} gzipped
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {sizes.map((item) => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: getColor(item.size),
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                minWidth: '100px',
                textAlign: 'center',
                marginRight: '12px',
              }}
            >
              {formatSize(item.size)} gzipped
            </div>
            <span style={{ fontSize: '14px', color: '#333' }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
