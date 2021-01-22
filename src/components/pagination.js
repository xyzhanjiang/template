import React from 'react'

export default function Pagination({ page, setPage, totalPage }) {
  const pagePrev = page - 1
  const pageNext = page + 1

  function prev() {
    if (page === 1) return
    setPage(pagePrev)
  }

  function next() {
    if (page === totalPage) return
    setPage(pageNext)
  }

  return (
    <nav className="pagination is-small is-centered" role="navigation">
      <ul className="pagination-list">
        <li>
          <a
            className="pagination-link"
            aria-label={`Goto page ${pagePrev}`}
            onClick={prev}>
            Previous
          </a>
        </li>
        {page > 2 && <li>
          <a
            aria-label="Goto page 1"
            className="pagination-link"
            onClick={() => setPage(1)}>1</a>
        </li>}
        {totalPage > 5 && page > 3 && <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>}
        {page > 1 && <li>
          <a
            className="pagination-link"
            aria-label={`Goto page ${pagePrev}`}
            onClick={() => setPage(pagePrev)}>{pagePrev}</a>
        </li>}
        <li>
          <a
            className="pagination-link is-current"
            aria-label={`Page ${page}`}
            aria-current="page"
            href="#">
            {page}
          </a>
        </li>
        {page < totalPage && <li>
          <a
            className="pagination-link"
            aria-label={`Goto page ${pageNext}`}
            onClick={() => setPage(pageNext)}>{pageNext}</a>
        </li>}
        {totalPage > 5 && page < totalPage - 2 && <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>}
        {page < totalPage - 1 && <li>
          <a
            className="pagination-link"
            aria-label={`Goto page ${totalPage}`}
            onClick={() => setPage(totalPage)}>{totalPage}</a>
        </li>}
        <li>
          <a
            className="pagination-link"
            aria-label={`Goto page ${pageNext}`} 
            onClick={next}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  )
}

