import React from 'react'
import { Pagination } from 'react-native-system-ui'

export default () => {
  const [page, setPage] = React.useState(1)
  return (
    <Pagination
      value={page}
      onChange={setPage}
      pageCount={10}
      showPageSize={5}
      forceEllipses
    />
  )
}
