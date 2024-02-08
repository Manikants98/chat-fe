'use client'
import axio from '@/app/(configs)/axios.config'
import { Avatar } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
interface SelectType {
    _id: string;
}

const Chat = () => {
    const [chatList, setChatList] = useState([])
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [select, setSelect] = useState<SelectType | null>(null);
    const [user, setUser] = useState<SelectType | null>(null);
    const fetchChatFn = async () => {
        try {
            const { data } = await axio.get('/contacts')
            setChatList(data.contacts)
        } catch (error) {
            console.log(error);
        }
    }
    const fetchMessagesFn = async () => {
        try {
            const { data } = await axio.get('/messages', { params: { contact_id: select?._id } });
            setMessages(data.messages);
            setUser(data.user)
        } catch (error) {
            console.log(error);
        }
    };
    const sendMessageFn = async (event: FormEvent) => {
        event.preventDefault()
        try {
            await axio.post('/messages', { contact_id: select?._id, message, message_type: 'text' });
            fetchMessagesFn()
            setMessage("")
        } catch (error) {
            console.log(error);
        }
    };

    console.log(select);

    useEffect(() => {
        fetchChatFn()
    }, [])

    useEffect(() => {
        select && fetchMessagesFn()
    }, [select])

    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <div className="flex flex-col py-8 pl-6 pr-2 w-72 bg-white flex-shrink-0">
                    <div className="flex flex-row items-center justify-center h-12 w-full">
                        <div
                            className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                ></path>
                            </svg>
                        </div>
                        <div className="ml-2 font-bold text-xl">Real Time Chat</div>
                    </div>
                    <div
                        className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
                    >

                        <Avatar alt='M' className="h-20 bg-blue-200 w-20 rounded-full border overflow-hidden" />

                        <div className="text-sm font-semibold mt-2">Mani Kant Sharma</div>
                        <div className="text-xs text-gray-500">ReactJs Developer</div>
                        <div className="flex flex-row items-center mt-3">
                            <div
                                className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
                            >
                                <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                            </div>
                            <div className="leading-none ml-1 text-xs">Active</div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="flex flex-row items-center justify-between text-xs">
                            <span className="font-bold">Active Conversations</span>
                            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">{chatList?.length}</span>
                        </div>
                        <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
                            {chatList?.map((i: any) => {
                                return (
                                    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" onClick={() => setSelect(i)}>
                                        <div className="flex items-center capitalize justify-center h-8 w-8 bg-indigo-200 rounded-full" >
                                            {i.name?.slice(0, 1)}
                                        </div>
                                        <div className="ml-2 text-sm font-semibold">{i.name}</div>
                                    </button>
                                )
                            })}


                        </div>

                    </div>
                </div>
                <div className="flex flex-col flex-auto h-full p-6">
                    <div
                        className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
                    >
                        <div className="flex flex-col h-full overflow-x-auto mb-4">
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-12 gap-y-2">
                                    {messages?.map((i: any) => {
                                        return (
                                            <>{user?._id !== i.sender._id ? <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                <div className="flex flex-row items-center">
                                                    <div
                                                        className="flex capitalize text-white items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                    >
                                                        {i?.sender?.name?.slice(0, 1)}
                                                    </div>
                                                    <div
                                                        className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                    >
                                                        <div>
                                                            {i.message}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> : <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                <div className="flex items-center justify-start flex-row-reverse">
                                                    <div
                                                        className="flex capitalize text-white items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                    >
                                                        {i?.sender?.name?.slice(0, 1)}
                                                    </div>
                                                    <div
                                                        className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                    >
                                                        <div>
                                                            {i.message}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}

                                            </>
                                        )
                                    })}


                                </div>
                            </div>
                        </div>
                        <form onSubmit={sendMessageFn}
                            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
                        >
                            <div>
                                <button
                                    className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex-grow ml-4">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)} />
                                    <button
                                        className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="ml-4">
                                <button
                                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-2 flex-shrink-0"
                                    type='submit'>
                                    <span>Send</span>
                                    <span className="ml-2">
                                        <svg
                                            className="w-4 h-4 transform rotate-45 -mt-px"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat