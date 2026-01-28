import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FetchGet, FetchPost, FetchFile } from "@/lib/http";

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
    },
    // 设置缓存时间为无限期，避免频繁重新获取数据
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      const { data, msg, result } = await FetchPost<User>(
        "/api/v1/users/insert",
        {
          method: "POST",
          body: JSON.stringify(user),
        },
      );
      if (!result) {
        toast.error(msg);
        return;
      }
      return data;
    },
    onSuccess: () => {
      // 刷新缓存
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("create user successfully");
    },
  });
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      const { msg, result } = await FetchPost<User>(
        `/api/v1/users/update/${user.id}`,
        {
          method: "POST",
          body: JSON.stringify(user),
        },
      );
      if (!result) {
        toast.error(msg);
      }
    },
    onSuccess: () => {
      // 刷新缓存
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("update user successfully");
    },
  });
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { msg, result } = await FetchPost<number>(
        `/api/v1/users/delete/${id}`,
        {
          method: "POST",
          body: JSON.stringify({ id }),
        },
      );
      if (!result) {
        toast.error(msg);
      }
    },
    onSuccess: () => {
      // 刷新缓存
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("delete user successfully");
    },
  });
};

const exportUsers = async (format: string) => {
  const { result, msg } = await FetchFile<string>(
    `/api/v1/users/export?format=${format}`,
  );
  if (!result) {
    toast.error(msg);
    return;
  }
};

export {
  useGetUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  exportUsers,
};

export type { User };
