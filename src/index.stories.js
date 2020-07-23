import 'bulma/css/bulma.css'
import './css/style.css'

import React from 'react'
import Pagination from './components/pagination'

export default { title: 'Pagination' }

export const usage = () => {
  const [page, setPage] = React.useState(1)
  return <Pagination page={page} totalPage={20} setPage={setPage}/>
}

