import React, { useState } from 'react'

const Table = ({
  columns = [],
  data = [],
  className = '',
  striped = true,
  hover = true,
  bordered = false,
  small = false,
  sortable = false,
  onRowClick,
  emptyMessage = 'Aucune donnée disponible'
}) => {
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')

  const handleSort = (columnKey) => {
    if (!sortable || !columnKey) return

    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (aValue === bValue) return 0

    const comparison = aValue > bValue ? 1 : -1
    return sortDirection === 'asc' ? comparison : -comparison
  })

  const tableClasses = [
    'table',
    striped && 'table-striped',
    hover && 'table-hover',
    bordered && 'table-bordered',
    small && 'table-sm',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="table-responsive">
      <table className={tableClasses}>
        <thead className="table-light">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={column.style}
                className={sortable && column.sortable !== false ? 'cursor-pointer' : ''}
                onClick={() => handleSort(column.key)}
              >
                {column.label}
                {sortable && sortColumn === column.key && (
                  <span className="ms-2">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center text-muted py-4">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => (
              <tr
                key={row.id || index}
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? 'cursor-pointer' : ''}
              >
                {columns.map((column) => (
                  <td key={column.key} style={column.style}>
                    {column.render
                      ? column.render(row[column.key], row, index)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table

