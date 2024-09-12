import {
  createColumnHelper
} from '@tanstack/react-table'
import ButtonActionCell from "../components/button-action-cell"
import EditableCell from "../components/editable-cell"
import { Employee } from "./type"

const columnHelper = createColumnHelper<Employee>()

export const columns = [
  columnHelper.accessor('firstName', {
    header: "First Name",
    cell: EditableCell,
    meta: {
      type: "text",
      required: true,
      pattern: '^[a-zA-Z ]+$',
      validationMessage: 'Date cannot be in the future',
    }
  }),
  columnHelper.accessor('lastName', {
    header: "Last Name",
    cell: EditableCell,
    meta: {
      type: "text",
      required: true,
      pattern: '^[a-zA-Z ]+$',
    }
  }),
  columnHelper.accessor('position', {
    header: "Position",
    cell: EditableCell,
    meta: {
      type: "text",
      required: true,
      pattern: '^[a-zA-Z ]+$',
    }
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: EditableCell,
    meta: {
      type: "text",
      required: true,
      pattern: '^[0-9+\-\.]+$',
    }
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: EditableCell,
    meta: {
      type: "email",
      required: true,
    }
  }),
  columnHelper.display({
    id: "edit",
    cell: ButtonActionCell
  })
]