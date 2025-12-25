"use client"

// import * as React from "react"
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  loginUser,
  // useLoginUser,
  // newUser,
  // type User,
} from "../apis";

const formSchema = z.object({
  email: z
    .email()
    .min(5, "email must be at least 5 characters.")
    .max(32, "email must be at most 32 characters."),
  username: z
    .string()
    .min(3, "username must be at least 3 characters.")
    .max(20, "username must be at most 20 characters."),
  password: z
    .string()
    .min(3, "password must be at least 3 characters.")
    .max(20, "password must be at most 20 characters."),
});

export default function BugReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "root@example.com",
      username: "root",
      password: "admin",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    loginUser(data);
  };

  return (
    <div className="w-full h-full grid place-content-center">
      <Card className="w-96 sm:max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <FieldDescription>
            Already have an account? <Link href="/sign">SignUp</Link>
          </FieldDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="root@mail.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
  
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="username"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
  
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal" className="grid grid-cols-2">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo">
              Login
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
