"use client"
import { useEffect } from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useUsers, FetchUsers } from "./apis";

export default function TablePage() {
  const { users, setUsers } = useUsers()
  useEffect(() => {
    FetchUsers(setUsers)
    
  }, [setUsers])
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>username</TableHead>
          <TableHead>email</TableHead>
          <TableHead>password</TableHead>
          <TableHead>created_at</TableHead>
          <TableHead>updated_at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(u => (
          <TableRow key={u.email}>
            <TableCell>{u.username}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.password}</TableCell>
            <TableCell>{String(u.created_at)}</TableCell>
            <TableCell>{String(u.updated_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};