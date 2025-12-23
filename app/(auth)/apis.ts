"use client"

import { create } from "zustand"
import { toast } from "sonner"
import { redirect } from 'next/navigation'
import { FetchPost, AuthKey } from "@/lib/http"

interface User {
  username: string;
  password: string;
  email: string;
};

const newUser = (
  u: User={  
    email: "root@example.com",
    username: "root",
    password: "admin",
  }
): User => {
  return u
}

interface LoginState {
  user: User;
  setUser: (u: User) => void;
}

const useLoginUser = create<LoginState>((set) => ({
    user: newUser(),
    setUser: (user) => set({ user }),
}))

const signUpUser = async (u: User) => {
  const { result, msg, data } = await FetchPost<string>("/api/v1/auth/signUp", { body: JSON.stringify(u)})
  if (!result || data === null) {
    toast.error(msg)
    return
  }
  
  document.cookie = `${AuthKey}=${data}`
  localStorage.setItem(AuthKey, data)
  toast.success(`signUp success ${data}`)
  redirect("/pages")
}

const loginUser = async (u: User) => {
  const { result, msg, data } = await FetchPost<string>("/api/v1/auth/login", { 
    body: JSON.stringify(u)
  })
  if (!result || data === null) {
    toast.error(msg)
    return
  }
  
  document.cookie = `${AuthKey}=${data}`
  localStorage.setItem(AuthKey, data)
  toast.success(`login success ${data}`)
  redirect("/pages")
}

export {
  loginUser,
  signUpUser,
  useLoginUser,
  newUser,
};
export type { User };