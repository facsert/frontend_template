
import SignForm from "./sign_form"
import LoginForm from "./login_form"
import SelectForm from "./select_from";
import CheckForm from "./check_form"

export default function FormPage() { 
  return (
    <div className="h-full flex flex-row justify-center items-center gap-2">
      <SignForm />
      <LoginForm />
      <SelectForm />
      <CheckForm />
    </div>
  );
};