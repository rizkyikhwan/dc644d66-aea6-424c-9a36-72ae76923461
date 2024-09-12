import useSWR, { mutate } from "swr"
import { Employee } from "../lib/type"

const url = "http://localhost:3001/employee"

async function getRequest() {
  const response = await fetch(url)
  return response.json()
}

async function updateRequest(id: number, data: Employee) {
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return response.json()
}

async function addRequest(data: Employee) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return response.json()
}

async function deleteRequest(id: number) {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })

  return response.json()
}

export default function useEmployee() {
  const { data, isValidating, isLoading } = useSWR(url, getRequest)

  const updateRow = async (id: number, postData: Employee) => {
    await updateRequest(id, postData);
    mutate(url);
  };

  const addRow = async (postData: Employee) => {
    await addRequest(postData)
    mutate(url)
  }

  const deleteRow = async (id: number) => {
    await deleteRequest(id)
    mutate(url)
  }

  return {
    data: data ?? [],
    isValidating,
    isLoading,
    updateRow,
    addRow,
    deleteRow
  }
}