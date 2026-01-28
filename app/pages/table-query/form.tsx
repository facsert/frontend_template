import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type User, useUpdateUser, useCreateUser } from "./apis";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "name must be at least 3 characters.")
    .max(32, "name must be at most 32 characters."),
  email: z
    .string()
    .min(5, "email must be at least 5 characters.")
    .max(64, "email must be at most 64 characters.")
    .email("email must be a valid email address."),
  password: z.string().max(256, "password must be at most 256 characters."),
  created_at: z.string(),
  updated_at: z.string(),
});

function TableUserForm({ user, edit }: { user: User; edit: boolean }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      username: user.username,
      password: user.password,
      created_at: user.created_at.toLocaleString(),
      updated_at: user.updated_at.toLocaleString(),
    },
  });
  const updateUser = useUpdateUser();
  const createUser = useCreateUser();

  // const { updateUser, insertUser, getUsers } = useUsers();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (edit) {
      await updateUser.mutateAsync({
        id: user.id,
        email: data.email,
        username: data.username,
        password: data.password,
        created_at: user.created_at,
        updated_at: new Date(),
      });
    } else {
      await createUser.mutateAsync({
        id: user.id,
        email: data.email,
        username: data.username,
        password: data.password,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="grid grid-cols-2">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="col-span-2">
              <FieldLabel>Email</FieldLabel>
              <Input
                {...field}
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="example@mail.com"
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="col-span-2">
              <FieldLabel>Username</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="username"
              />
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        {!edit && (
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="col-span-2">
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="password"
                />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
        )}

        {edit && (
          <Controller
            name="created_at"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="col-span-1">
                <FieldLabel>Created At</FieldLabel>
                <Input {...field} aria-invalid={fieldState.invalid} disabled />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
        )}

        {edit && (
          <Controller
            name="updated_at"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="col-span-1">
                <FieldLabel>Updated At</FieldLabel>
                <Input {...field} aria-invalid={fieldState.invalid} disabled />
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            )}
          />
        )}

        <Button className="col-span-2" type="submit">
          {edit ? "Update User" : "Create User"}
        </Button>
      </FieldGroup>
    </form>
  );
}

export { TableUserForm };
