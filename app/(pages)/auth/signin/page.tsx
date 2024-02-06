'use client';
import { signInFn } from '@/app/services/authentication';
import { Button, Div, Divider, Input } from '@/app/shared/custom';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const route = useRouter();
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const res = await signInFn({ email, password })
        if (res) route.push('/chat')
    };
    return (
        <div style={{ backgroundImage: `url('https://source.unsplash.com/random')` }}>
            <div className="flex h-screen items-center backdrop-blur-sm flex-col justify-center" >
                <Div className="flex w-1/3 mx-auto overflow-hidden rounded-lg backdrop-blur-[25px] !bg-white !bg-opacity-80 shadow-lg" >
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 w-full p-8"
                    >
                        <p className="text-3xl font-bold text-center" > Sign In </p>
                        <p className="text-center" >
                            Welcome back! Let's get you signed in.
                        </p>

                        <Input
                            id="email"
                            label="Email"
                            size="small"
                            className="w-full"
                            type="email"
                            placeholder="manikants157@gmail.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        <div className="flex justify-end" >
                            <a href="#" className="text-xs hover:underline" >
                                Forget Password ?
                            </a>
                        </div>

                        <Input
                            id="password"
                            label="Password"
                            size="small"
                            className="w-full"
                            type="password"
                            placeholder="**********"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        <Button
                            type="submit"
                            size="small"
                            variant="contained"
                            className="w-full bg-black"
                        >
                            Sign In
                        </Button>

                        <Divider />
                        <p className="text-xs text-center">You don't have an account</p>

                        <Button
                            size="small"
                            variant="contained"
                            className="w-full bg-black"
                            onClick={() => route.push('/auth/signup')}
                        >
                            Sign Up
                        </Button>
                    </form>
                </Div>
            </div>
        </div>
    );
}
