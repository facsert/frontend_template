"use client"
import { useEffect } from "react";
import { useUsers } from "./apis";
import { columns } from "./column";
import { DataTable } from "./table";

export default function TablePage() {
  const { users, getUsers } = useUsers()

  useEffect(() => {
    getUsers()    
  }, [getUsers])
  return (
    <div className="p-4">
      <DataTable columns={columns} data={users} />
    </div>
  );
};