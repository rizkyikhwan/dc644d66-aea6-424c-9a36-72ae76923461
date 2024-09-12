"use client"

import { ChangeEvent, useEffect, useState } from "react";

const EditableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue()
  const columnMeta = column.columnDef.meta
  const tableMeta = table.options.meta
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    tableMeta?.updateData(row.index, column.id, value, e.target.validity.valid);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (tableMeta?.editedRows[row.id]) {
    return (
      <div className="relative">
        <input
          className="bg-transparent focus:outline-none border-b-2 border-b-transparent focus:border-b-sky-500 invalid:border-b-rose-500"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={columnMeta?.type || "text"}
          required={columnMeta?.required}
          pattern={columnMeta?.pattern}
        />
      </div>
    )
  }

  return <span className="w-full">{value}</span>
}
export default EditableCell