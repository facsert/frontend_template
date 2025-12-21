"use client"

import { create } from "zustand"
import { FetchPost } from "@/lib/http";
import { toast } from "sonner"

interface User {
  username: string;
  password: string;
  email: string;
};

const NewUser = (
  username: string="",
  password: string="",
  email: string="",
): User => {
  return {
    username: username,
    password: password,
    email: email,
  }
}

interface SignUpState {
  user: User;
  setUser: (u: User) => void;
}

const useSignUpUser = create<SignUpState>((set) => ({
    user: NewUser(),
    setUser: (user) => set({ user }),
}))

const signUpUser = async () => {
  const {result, msg } = await FetchPost("/api/v1/signup", {})
  if (result) {
    toast.success("signup success")
  } else {
    toast.error(`sign failed: ${msg}`)
  }
}

export {
  useSignUpUser,
  NewUser,
};

export { 
  signUpUser,
};
export type { User };