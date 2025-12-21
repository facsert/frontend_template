
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";

interface UserSignUp  {
  username: string;
  password: string;
  confirmPassword: string
  email: string
}

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "username must be at least 2 characters." }),
    // .default(""),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters." }),
    // .default(""),
  confirmPassword: z
    .string()
    .min(6, { message: "password must be at least 6 characters." }),
    // .default(""),
  email: z
    .email({ message: "invalid email address." }),
    // .default(""),
});


export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    } as z.infer<typeof formSchema>,
    mode: "onChange",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.password !== data.confirmPassword) {
      toast.error("The passwords entered twice do not match")
      return
    }
    const user: UserSignUp = {
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
      email: data.email
    };
    toast.success(`login successful with ${JSON.stringify(user)}!`);
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>SignUP</CardTitle>
          <CardDescription>create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
          >
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Username</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="username"
                      required
                    />
                    {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}  
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="name@example.com"
                      required
                    />
                    {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}  
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="password"
                    />
                    {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}  
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Confirm Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="password"
                    />
                    {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                  </Field>
                )}  
              />
              <Button 
                type="submit" 
                className="w-full mt-4"
              >
                SignUP
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};