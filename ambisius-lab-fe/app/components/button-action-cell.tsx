"use client"

import { Table } from "@tanstack/react-table"
import { MouseEvent } from "react"
import { FiTrash } from "react-icons/fi"
import { MdCheck, MdClose, MdEdit } from "react-icons/md"
import { Employee } from "../lib/type"

interface ButtonActionCellProps {
  table: Table<Employee>
  row: any
}

const ButtonActionCell = ({ table, row }: ButtonActionCellProps) => {
  const meta = table.options.meta
  const validRow = meta?.validRows[row.id];
  const disableSubmit = validRow ? Object.values(validRow)?.some(item => !item) : false;

  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }))

    if (elName !== "edit") {
      e.currentTarget.name === "cancel" ? meta?.revertData(row.index) : meta?.updateRow(row.index);
    }
  }

  const removeRow = () => {
    meta?.removeRow(row.index);
  };

  return meta?.editedRows[row.id] ? (
    <div className="space-x-3">
      <button onClick={setEditedRows} name="cancel">
        <MdClose size={18} className="text-rose-500" />
      </button>
      <button onClick={setEditedRows} name="done" disabled={disableSubmit} className="disabled:opacity-50">
        <MdCheck size={18} className="text-emerald-500" />
      </button>
    </div>
  ) : (
    <div className="space-x-3">
      <button onClick={removeRow} name="remove">
        <FiTrash size={18} className="text-rose-500" />
      </button>
      <button onClick={setEditedRows} name="edit">
        <MdEdit size={18} className="text-blue-500" />
      </button>
    </div>
  )
}
export default ButtonActionCell