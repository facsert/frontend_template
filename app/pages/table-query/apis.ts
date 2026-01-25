
import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FetchGet, FetchPost } from "@/lib/http"


interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}


function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, msg, result } = await FetchGet<User[]>("/api/v1/users");
      if (!result) {
        toast.error(msg);
        return [];
      }
      return data;
    },
    onError: () => {
      toast.error("get users failed");
    }
  })
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      const { data, msg, result } = await FetchPost<User>("/api/v1/users/insert", {
        method: "POST",
        body: JSON.stringify(user),
      });
      if (!result) {
        toast.error(msg);
        return;
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("create user successfully");
    }
  })
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      const { msg, result } = await FetchPost<User>(`/api/v1/users/update/${user.id}`, {
        method: "POST",
        body: JSON.stringify(user),
      });
      if (!result) {
        toast.error(msg);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("update user successfully");
    }
  })
}

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { msg, result } = await FetchPost<number>(`/api/v1/users/delete/${id}`, {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      if (!result) {
        toast.error(msg);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("delete user successfully");
    }
  })
}

export { 
  useGetUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
};

export type { 
  User
};