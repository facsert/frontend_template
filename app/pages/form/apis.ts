
// import { FetchPost } from "@/lib/http";
import { Target } from "lucide-react";
import { toast } from "sonner";

interface User {
    email: string;
    username: string;
    password: string;
}

const newUser = (): User => {
    return {
        email: "user@example.com",
        username: "user",
        password: "password"
    };
};



const signUser = async (user: User) => {
    // const { result, msg } = await FetchPost("/api/auth/sign", {
    //     body: JSON.stringify(user),
    // });
    // if (!result) {
    //     toast.error(msg || "sign failed");
    //     return
    // }
    toast.success(`sign ${user.username} success`)
}

const loginUser = async (user: User) => {
    // const { result, msg } = await FetchPost("/api/auth/login", {
    //     body: JSON.stringify(user),
    // });
    // if (!result) {
    //     toast.error(msg || "login failed");
    //     return
    // }
    toast.success(`login ${user.username} success`)
}


type Gender = "man" | "female"
const genders: Gender[] = [
    "man",
    "female",
]

type Language = "Chinese"|"English"|"French"|"German"|"Spanish"
const languages: Language[] = [
    "Chinese",
    "English",
    "French",
    "German",
    "Spanish",
]

interface Person {
    name: string
    age: number
    gender: Gender
    language: string
    birthday: Date
}

type Target = "Learning"| "Work"| "Research"| "Business"
const targets: Target[] = [
    "Learning",
    "Work",
    "Research",
    "Business",
]

interface Project {
    name: string;
    public: boolean;
    target: Target[];
}

export { 
    loginUser, 
    signUser, 
    newUser,

    languages,
    genders,
    targets,
};
export type { 
    User,
    Person,
    Gender,
    Project,
};