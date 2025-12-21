

import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
  // FieldSet,
  FieldGroup,
  FieldLabel,
  // FieldContent,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

export default function Form0() { 
  return (
    <Card className="sm:min-w-sm">
      <CardHeader>
        <CardTitle>Form0</CardTitle>
        <CardDescription>input</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input
               name="username"
               type="text"
              />
            </Field>
            
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
               name="password"
               type="password"
              />
            </Field>
            
            <div className="flex flex-row gap-2">
              <Field>
                <FieldLabel>Date</FieldLabel>
                <Input
                type="date"
                />
              </Field>
              <Field>
                <FieldLabel>Time</FieldLabel>
                <Input
                type="time"
                />
              </Field>
            </div>
            
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation={"horizontal"}>
          <Button type="submit">Submit</Button>
          <Button type="button">Reset</Button>
        </Field>
      </CardFooter>
    </Card>
  );
};