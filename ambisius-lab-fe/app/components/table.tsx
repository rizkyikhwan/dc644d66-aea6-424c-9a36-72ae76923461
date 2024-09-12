"use client"

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import { Dispatch, useEffect, useState } from "react"
import { MdAdd } from 'react-icons/md'
import useEmployee from '../hook/useEmployee'
import { columns } from "../lib/columns"
import { Employee } from '../lib/type'
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io'
import { AiOutlineLoading } from 'react-icons/ai'

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    editedRows: any
    setEditedRows: Dispatch<React.SetStateAction<object>>
    validRows: any
    setValidRows: Dispatch<React.SetStateAction<object>>
    addRow: () => void
    revertData: (rowIndex: number) => void
    updateData: (rowIndex: number, columnId: string, value: string, isValid: boolean) => void
    updateRow: (rowIndex: number) => void,
    removeRow: (rowIndex: number) => void
  }
}

const Table = () => {
  const { data: dataEmployee, isLoading, isValidating, updateRow, addRow, deleteRow } = useEmployee()

  const [data, setData] = useState<Employee[]>([])
  const [editedRows, setEditedRows] = useState({});
  const [validRows, setValidRows] = useState<unknown>({});
  const [sorting, setSorting] = useState<SortingState>([])

  useEffect(() => {
    if (isValidating) return
    setData([...dataEmployee])
  }, [isValidating])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    enableRowSelection: true,
    meta: {
      editedRows,
      setEditedRows,
      validRows,
      setValidRows,
      revertData: (rowIndex: number) => {
        setData(old => old.map((row, index) => index === rowIndex ? dataEmployee[rowIndex] : row))
      },
      updateRow: (rowIndex: number) => {
        if (data[rowIndex]._id) {
          updateRow(data[rowIndex]?._id, data[rowIndex]);
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string, isValid: boolean) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
        setValidRows((old: any) => ({
          ...old,
          [rowIndex]: { ...old[rowIndex], [columnId]: isValid },
        }));
      },
      addRow: () => {
        const newRow: Employee = {
          employeeId: Math.floor(Math.random() * 10000),
          firstName: "...",
          lastName: "...",
          phone: "...",
          position: "...",
          email: "..."
        };
        addRow(newRow)
      },
      removeRow: (rowIndex: number) => {
        if (data[rowIndex]._id) {
          deleteRow(data[rowIndex]._id)
        }
      },
    },
  })

  return (
    <div className="flex flex-col items-end space-y-2">
      <div className='space-x-4'>
        <button
          type="button"
          className="flex items-center space-x-2 bg-emerald-500 p-2 rounded-md hover:bg-emerald-700 transition-colors"
          onClick={() => table.options.meta?.addRow()}
        >
          <MdAdd size={16} className="text-white" />
          <span className="text-sm text-white">Add Employee</span>
        </button>
      </div>
      <div className="flex flex-col border rounded-md overflow-hidden">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="w-full divide-y divide-gray-200">
                <thead className='bg-slate-100'>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id} scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                          {header.isPlaceholder
                            ? null
                            : (
                              <div
                                className={
                                  header.column.getCanSort()
                                    ? 'cursor-pointer select-none flex items-center space-x-1'
                                    : ''
                                }
                                onClick={header.column.getToggleSortingHandler()}
                                title={
                                  header.column.getCanSort()
                                    ? header.column.getNextSortingOrder() === 'asc'
                                      ? 'Sort ascending'
                                      : header.column.getNextSortingOrder() === 'desc'
                                        ? 'Sort descending'
                                        : 'Clear sort'
                                    : undefined
                                }
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: <IoMdArrowRoundUp size={16} />,
                                  desc: <IoMdArrowRoundDown size={16} />,
                                }[header.column.getIsSorted() as string] ?? null}
                              </div>
                            )
                          }
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    table.getHeaderGroups().map((headerGroup, index) => (
                      <tr key={index}>
                        <td colSpan={headerGroup.headers.length}>
                          <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
                            <AiOutlineLoading size={32} className="animate-spin text-sky-500" />
                          </div>
                        </td>
                      </tr>
                    )
                    )
                  ) : (
                    table.getRowModel().rows.map(row => (
                      <tr key={row.id} className="hover:bg-gray-100">
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-start font-medium text-gray-800">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                  {/* {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-100">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-start font-medium text-gray-800">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Table