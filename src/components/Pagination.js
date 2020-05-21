import React from 'react';

import {
  Pagination,
} from 'react-bootstrap';



// Serverside Pagination component
const ServersidePagination = (props) => {
  const {
    currentPage,
    handlePagination,
    totalItems,
    itemPerPage,
  } = props

  let totalPages = 1
  if (totalItems===itemPerPage) {
    totalPages = 1
  } else if (totalItems % itemPerPage === 0) {
    totalPages = (totalItems / itemPerPage)
  } else if ((totalItems > itemPerPage) && (totalItems % itemPerPage !== 0)) {
    totalPages = parseInt(totalItems / itemPerPage) + 1
  }

  if (totalItems > 0) {
    return (
      <div className="d-flex align-items-end justify-content-end" style={{margin: "25px 0px 10px 0px"}}>
        <Pagination>
          <Pagination.Item
            onClick={()=>handlePagination(1)}
            key="first"
            disabled={currentPage===1}>
            First
          </Pagination.Item>
          <Pagination.Item
            onClick={()=>handlePagination(currentPage-1)}
            key="previous"
            disabled={currentPage===1}>
            Previous
          </Pagination.Item>

          {
            Array(totalPages).fill().map((_, index) => (
              <Pagination.Item
                onClick={()=>handlePagination(index+1)}
                to={{ search: `?page=${index+1}` }}
                key={index}
                active={(index+1) === currentPage}>
                {index+1}
              </Pagination.Item>
            ))
          }

          <Pagination.Item
            onClick={()=>handlePagination(currentPage+1)}
            key="next"
            disabled={currentPage===totalPages}>
            Next
          </Pagination.Item>
          <Pagination.Item
            onClick={()=>handlePagination(totalPages)}
            key="last"
            disabled={currentPage===totalPages}>
            Last
          </Pagination.Item>
        </Pagination>
      </div>
    );
  } else {
    return (
      null
    )
  }
}


export default ServersidePagination
