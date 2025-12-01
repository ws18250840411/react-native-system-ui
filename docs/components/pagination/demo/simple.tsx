import React from 'react'
import { Pagination } from 'react-native-system-ui'

export default () => {
  const [page, setPage] = React.useState(1)
  return (
    <Pagination
      mode="simple"
      value={page}
      pageCount={6}
      onChange={setPage}
    />
  )
}
