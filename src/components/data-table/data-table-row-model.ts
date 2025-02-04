import {
  Table,
  Row,
  RowModel,
  RowData,
  memo,
  createRow,
  getMemoOptions,
} from '@tanstack/react-table'
import { DataTableActions } from './data-table'

export function getCoreRowModel<TData extends RowData>(
  actions?: DataTableActions<TData>
): (table: Table<TData>) => () => RowModel<TData> {
  return (table) =>
    memo(
      () => [table.options.data],
      (
        data
      ): {
        rows: Row<TData>[]
        flatRows: Row<TData>[]
        rowsById: Record<string, Row<TData>>
      } => {
        const rowModel: RowModel<TData> = {
          rows: [],
          flatRows: [],
          rowsById: {},
        }

        const accessRows = (
          originalRows: TData[],
          depth = 0,
          parentRow?: Row<TData>
        ): Row<TData>[] => {
          const rows: Row<TData>[] = []

          for (let i = 0; i < originalRows.length; i++) {
            // Create the row
            const row = createRow(
              table,
              table._getRowId(originalRows[i]!, i, parentRow),
              originalRows[i]!,
              i,
              depth,
              undefined,
              parentRow?.id
            )

            // Attach actions to the row
            if (actions) {
              Object.assign(row, { actions })
            }

            // Keep track of every row in a flat array
            rowModel.flatRows.push(row)
            // Also keep track of every row by its ID
            rowModel.rowsById[row.id] = row
            // Push table row into parent
            rows.push(row)

            // Get the original subrows
            if (table.options.getSubRows) {
              row.originalSubRows = table.options.getSubRows(
                originalRows[i]!,
                i
              )

              // Then recursively access them
              if (row.originalSubRows?.length) {
                row.subRows = accessRows(row.originalSubRows, depth + 1, row)
              }
            }
          }

          return rows
        }

        rowModel.rows = accessRows(data)

        return rowModel
      },
      getMemoOptions(table.options, 'debugTable', 'getRowModel', () =>
        table._autoResetPageIndex()
      )
    )
}
