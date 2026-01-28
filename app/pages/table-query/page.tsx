"use client"
// import { useState, useEffect } from "react";
import { type User, useGetUsers } from "./apis";
import { columns } from "./column";
import { DataTable } from "./table";


export default function TablePage() {
  const { data, isLoading, error  } = useGetUsers()
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || data === null || data === undefined) {
    return <div>Error</div>;
  }
  
  return (
    <div className="p-4">
      <DataTable columns={columns} data={data as User[]} />
    </div>
  );
};