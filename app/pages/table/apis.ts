
import { toast } from "sonner"
import { FetchGet, FetchPost, AuthKey } from "@/lib/http"
import { create } from "zustand"

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

interface UsersState {
  users: User[],
  setUsers: (users: User[]) => void;

  getUsers: () => void;
  insertUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: number) => void;

  uniqueNames: string[],
  setUniqueNames: (names: string[]) => void,
}

const useUsers = create<UsersState>((set) => ({
  users: [],
  setUsers: (users) => {
    set({users: users})
  },
  
  getUsers: async () => {
    const token = localStorage.getItem(AuthKey)?? ""
    const {result, msg, data} = await FetchGet<User[]>("/api/v1/users", 
      { headers: {[AuthKey]: token} }
    )
    if (!result || data === null) {
      toast.error(msg)
      return
    }

    await set({
      users: data, 
      uniqueNames: [...new Set(data.map(u => u.username))]
    })
  },
  
  insertUser: async (user: User) => {
    // 插入用户
    const token = localStorage.getItem(AuthKey)?? ""
    const {result, msg, data} = await FetchPost<number>(
      "/api/v1/users/insert", 
      {
        headers: {[AuthKey]: token},
        body: JSON.stringify(user),
      },
    )
    if (!result || data === null) {
      toast.error(msg)
      return
    }
    toast.success(`insert user ${user.username} success`)
  },

  updateUser: async (user: User) => {
    // 更新用户
    const token = localStorage.getItem(AuthKey)?? ""
    const {result, msg, data} = await FetchPost<number>(
      `/api/v1/users/update/${user.id}`, 
      {
        headers: {[AuthKey]: token},
        body: JSON.stringify(user),
      },
    )
    if (!result || data === null) {
      toast.error(msg)
      return
    }
    toast.success(`update user ${user.username} success`)
  },

  deleteUser: async (id: number) => {
    // 删除用户
    const token = localStorage.getItem(AuthKey)?? ""
    const {result, msg, data} = await FetchPost<number>(
      `/api/v1/users/delete/${id}`, 
      {
        headers: {[AuthKey]: token},
      },
    )
    if (!result || data === null) {
      toast.error(msg)
      return
    }
    toast.success(`delete user id=${id} success`)
  },

  uniqueNames: [],
  setUniqueNames: (names) => set({uniqueNames: names}),
}))

export { 
  useUsers,
};

export type { 
  User
};