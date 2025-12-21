"use client"

// import { create } from "zustand"
// import { FetchPost } from "@/lib/http";
import { toast } from "sonner"
import { redirect } from 'next/navigation'
import { FetchPost } from "@/lib/http"

interface User {
  username: string;
  password: string;
  email: string;
};

// interface UserOpt {
//   name: string;
//   isError: boolean;
//   msg: string;
// }

const newUser = (
  u:User={ 
    email: "root@example.com",
    username: "root",
    password: "admin",
  }
): User => {
  return u
}

// interface SignUpState {
//   user: User;
//   setUser: (u: User) => void;
// }

// const useSignUpUser = create<SignUpState>((set) => ({
//     user: newUser(),
//     setUser: (user) => set({ user }),
// }))
const signUpUser = async (u: User) => { 
  const { result, msg, data } = await FetchPost<string>(
    "/api/v1/auth/signUp", 
    { body: JSON.stringify(u)}
  )
  if (!result || data === null) {
    toast.error(msg)
    return
  }
  
  localStorage.setItem("Authorization", data)
  toast.success("signUp success")
  redirect("/pages")
};

const loginUser = async (u: User) => {
  const { result, msg, data } = await FetchPost<string>("/api/v1/auth/login", { body: JSON.stringify(u)})
  if (!result || data === null) {
    toast.error(msg)
    return
  }
  
  document.cookie = `Authorization=${data}`
  localStorage.setItem("Authorization", data)
  toast.success("login success")
  redirect("/pages")
}

export {
  loginUser,
  signUpUser,
  newUser,
};
export type { User };