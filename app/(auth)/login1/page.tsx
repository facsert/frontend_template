"use client"

import { useState, ChangeEvent } from "react"
// import { toast } from "sonner"

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
  FieldDescription,
  // FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  type User,
  newUser,
  loginUser,
  signUpUser,
} from "./apis"

export default function SignUpPage() {
  const [user, setUser] = useState<User>(newUser())

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setUser({...user, [name]:value})
  }

  const handleReset = async () => {
    setUser(newUser())
  }

  const handleSignUp = async () => {
    await signUpUser(user)
  }
  
  const submitAction = async () => {
    await loginUser(user)
  }

  return (
    <div className="w-full h-full grid place-content-center">
      <Card className="w-96 sm:max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            please create user for your self.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" action={submitAction}>
            <FieldGroup>
              <Field>
                <FieldLabel>
                  Email
                </FieldLabel>
                <Input
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={onChange}
                  placeholder="user@example.com"
                />
                <FieldDescription>Enter your email</FieldDescription>
              </Field>
  
              <Field>
                <FieldLabel>
                  Username
                </FieldLabel>
                <Input
                  name="username"
                  type="text"
                  value={user.username}
                  onChange={onChange}
                  placeholder="username"
                />
              </Field>
  
              <Field>
                <FieldLabel >
                  Password
                </FieldLabel>
                <Input
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={onChange}
                  placeholder="password"
                />
              </Field>
  
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="login-form">
              Submit
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSignUp}>
              signUp
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}>
              Reset
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};
