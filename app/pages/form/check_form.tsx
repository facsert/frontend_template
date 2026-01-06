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
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card"
import {
  Field,
  // FieldDescription,
  // FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import {
  // type Project,
  targets,
} from "./apis"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name:z.
    string()
    .min(3, "")
    .max(20, ""),
  public: z.boolean(),
  target: z.array(z.string()),
})

export default function CheckForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      public: true,
      target: [],
    }
  })

  const onSubmit = async (project: z.infer<typeof formSchema>) => {
  // function onSubmit(data: z.infer<typeof formSchema>) {
    // loginUser(user)
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(project, null, 2)}</code>
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
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form id="check-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>

            <Controller
              name="name"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="project name"
                    autoComplete="off"
                  />
                </Field>
              )}
            />

            <Controller
              name="public"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Public</FieldLabel>
                  <Switch
                    name="public"
                    aria-invalid={fieldState.invalid}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Field>
              )}
            />

            <Controller
              name="target"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Target</FieldLabel>
                    {targets.map(target => (
                      <Field key={target} orientation="horizontal">
                        <Checkbox
                          key={target}
                          name={target}
                          aria-invalid={fieldState.invalid}
                          checked={field.value.includes(target)}
                          onCheckedChange={(checked) => {
                            const newTargets = checked
                              ? [...field.value, target]
                              : field.value.filter(v => v !== target)
                            field.onChange(newTargets)
                          }}
                        />
                        <FieldLabel>{target}</FieldLabel>
                      </Field>
                    ))}
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
          <Button type="submit" form="check-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};