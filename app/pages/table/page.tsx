"use client"
import { useEffect } from "react";
import { useUsers, FetchUsers } from "./apis";
import { columns } from "./column";
import { DataTable } from "./table";

export default function TablePage() {
  const { users, setUsers, setUniqueNames } = useUsers()

  useEffect(() => {

    FetchUsers({setUsers, setUniqueNames})
    
  }, [setUsers, setUniqueNames])
  return (
    <div className="p-4">
      <DataTable columns={columns} data={users} />
    </div>
  );
};