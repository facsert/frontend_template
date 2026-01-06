"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  // FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signUser } from "./apis"


const formSchema = z.object({
  email: z
    .email()
    .min(5, "email must be at least 5 characters.")
    .max(32, "email must be at most 32 characters."),
  username: z
    .string()
    .min(4, "username must be at least 4 characters.")
    .max(20, "username must be at most 20 characters."),
  password: z
    .string()
    .min(4, "password must be at least 4 characters.")
    .max(20, "password must be at most 20 characters."),
  confirmPassword: z
    .string()
    .min(4, "password must be at least 4 characters.")
    .max(20, "password must be at most 20 characters."),
})

export default function SignForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "user@example.com",
      username: "user",
      password: "",
      confirmPassword: "",
    },
  })
  
  const onSubmit = async (user: z.infer<typeof formSchema>) => {
  // function onSubmit(data: z.infer<typeof formSchema>) {
    if (user.password !== user.confirmPassword) {
      toast.error("password and confirm password not equal")
      return
    }
    signUser(user)
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(user, null, 2)}</code>
        </pre>
      ),
      position: "top-center",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <Card className="w-80 sm:max-w-md">
      <CardHeader>
        <CardTitle>SignForm</CardTitle>
        <CardDescription>
          login your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@mail.com"
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
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Username
                  </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="username"
                      aria-invalid={fieldState.invalid}
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
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Password
                  </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="password"
                      aria-invalid={fieldState.invalid}
                    />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Confirm Password
                  </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="password"
                      aria-invalid={fieldState.invalid}
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
          <Button type="submit" form="sign-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
