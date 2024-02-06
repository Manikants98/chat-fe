'use client'
import { signUpFn } from "@/app/services/authentication";
import { Button, Div } from "@/app/shared/custom";
import { Divider, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const route = useRouter()
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        const res = await signUpFn({ name, email, password })
        if (res) route.push('/chat')
    }
    return (
        <div style={{ backgroundImage: `url('https://source.unsplash.com/random')`, }}>
            <div className="flex h-screen items-center backdrop-blur-sm flex-col justify-center" >
                <Div className="flex w-1/3 mx-auto backdrop-blur-[25px] !bg-white !bg-opacity-80 overflow-hidden rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-8">
                        <p className="text-3xl font-bold text-center">Sign Up</p>
                        <p className="text-center">
                            Ready to get started? Sign up now!
                        </p>
                        <TextField
                            id="name"
                            label="Name"
                            size="small"
                            className="w-full"
                            type="text"
                            placeholder="Mani Kant Sharma"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            size="small"
                            className="w-full"
                            type="email"
                            placeholder="manikants157@gmail.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            size="small"
                            className="w-full"
                            type="password"
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                        <Divider />
                        <p className="text-xs text-center">Already have and account</p>
                        <Button className="w-full" onClick={() => route.push('/auth/signin')}>
                            Sign In
                        </Button>
                    </form>
                </Div>
            </div>
        </div>
    )
}
