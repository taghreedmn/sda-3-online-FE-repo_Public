import React from 'react'
import Pagination from '@mui/material/Pagination';

export default function GamePagination(prop) {
    const { totalCount, page, handleChange, limit } = prop;
  return (
    <div>
      <Pagination count={Math.ceil(totalCount / limit)} page={page} onChange={handleChange} color="primary" />
    </div>
  )
}
