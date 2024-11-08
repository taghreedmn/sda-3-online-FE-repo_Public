import React from 'react'
import Pagination from '@mui/material/Pagination';

export default function GamePagination(prop) {
    const { totalCount, page, handleChange } = prop;
  return (
    <div>
          <Pagination count={totalCount} page={page} onChange={handleChange} color="primary" />
    </div>
  )
}
