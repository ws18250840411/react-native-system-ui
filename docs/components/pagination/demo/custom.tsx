import React from 'react'
import { Pagination, Typography } from 'react-native-system-ui'

export default () => {
  const [page, setPage] = React.useState(3)
  return (
    <Pagination
      value={page}
      onChange={setPage}
      totalItems={120}
      itemsPerPage={10}
      showPageSize={4}
      prevText={<Typography.Text>上一页</Typography.Text>}
      nextText={<Typography.Text>下一页</Typography.Text>}
      pageRender={(item) => (
        <Typography.Text style={{ fontWeight: item.active ? '700' : '400' }}>
          {item.text}
        </Typography.Text>
      )}
    />
  )
}
