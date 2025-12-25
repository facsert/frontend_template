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
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  genders,
  languages,
} from "./apis"

const formSchema = z.object({
  name: z
    .string()
    .min(3, "name must be at least 5 characters")
    .max(10, "name must be at most 32 characters"),
  age: z
    .int()
    .min(1, "age must bigger than 1")
    .max(120, "age must smaller than 1"),
  gender: z
    .enum(genders),
  language: z
    .enum(languages),
  birthday: z
    .string()
    // .min(new Date(1900,1,1), "")
    // .max(new Date(), "")
})

export default function SelectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 18,
      gender: "man",
      language: "Chinese",
      birthday: "2000-01-01",
    }
  })

  const onSubmit = async (person: z.infer<typeof formSchema>) => {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(person, null, 2)}</code>
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
        <CardTitle>SelectForm</CardTitle>
        <CardDescription>select form</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="select-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            
            <Controller
              name="name"
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="your name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              <Controller
                name="age"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field>
                    <FieldLabel>Age</FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      value={field.value ?? 0}
                      aria-invalid={fieldState.invalid}
                      placeholder="your age"
                      onChange={(event) => {
                        // field.onChange(event)
                        field.onChange(Number(event.target.value))
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="gender"
                control={form.control}
                render={({field}) => (
                  <Field>
                    <FieldLabel>Gender</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="select" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((gender, index) => (
                          <SelectItem key={index} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>

            <Controller
              name="language"
              control={form.control}
              render={({field}) => (
                <Field>
                  <FieldLabel>Language</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="select" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language, index) => (
                        <SelectItem key={index} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              name="birthday"
              control={form.control}
              render={({field, fieldState}) => (
                <Field>
                  <FieldLabel>Birthday</FieldLabel>
                    <Input
                      {...field}
                      type="date"
                      aria-invalid={fieldState.invalid}
                      placeholder="your birthday"
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
          <Button type="submit" form="select-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};