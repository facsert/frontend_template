
import { toast } from "sonner"
import { FetchGet, AuthKey } from "@/lib/http"
import { create } from "zustand"

interface User {
  email: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

interface UsersState {
  users: User[],
  setUsers: (users: User[]) => void;
}

const useUsers = create<UsersState>((set) => ({
  users: [],
setUsers: (users) => set({users}),
}))

const FetchUsers = async (
  setUsers: (users: User[]) => void
) => {
  const token = localStorage.getItem(AuthKey)?? ""
  const {result, msg, data} = await FetchGet<User[]>("/api/v1/users", 
    { headers: {AuthKey: token} }
  )
  if (!result || data === null) {
    toast.error(msg)
    return
  }
  setUsers(data)
};

export { 
  FetchUsers,
  useUsers,
};

export type { 
  User
};