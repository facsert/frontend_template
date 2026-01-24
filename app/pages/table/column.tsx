"use client";

import { useState } from "react";
import { type ColumnDef, Column, Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  EyeOff,
  MoreHorizontal,
} from "lucide-react";
import { type User, useUsers } from "./apis";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TableUserForm } from "./form";

const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnSorted column={column} title="Email" />,
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => <ColumnSorted column={column} title="Username" />,
    cell: ({ row }) => <div className="">{row.getValue("username")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <ColumnSorted column={column} title="CreatedAt" />,
    cell: ({ row }) => <div className="">{row.getValue("created_at")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnActions row={row} />,
  },
];

interface ColumnSortedProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

function ColumnSorted<TData, TValue>({
  column,
  title,
  className,
}: ColumnSortedProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -ml-3 h-8"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ColumnActions<TData>({ row }: { row: Row<TData> }) {
  const [open, setOpen] = useState(false);
  const { deleteUser, getUsers } = useUsers();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="data-[state=open]:bg-muted size-8"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => setOpen(true)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          variant="destructive"
          onClick={async () => {
            await deleteUser((row.original as User).id)
            getUsers()
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Modify the user details below.
            </DialogDescription>
          </DialogHeader>
          <TableUserForm user={row.original as User} edit={true} />
        </DialogContent>
      </Dialog>

    </DropdownMenu>
  );
}

export { columns };
