'use client'
import { baseURL } from "@/axios.config";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface Message {
    _id: string;
    sender: string;
    message: string;
}

const ChatSocket: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState("");
    const sender = "65bfbe2faecd8c9efc906200";
    useEffect(() => {
        const newSocket: Socket = io(baseURL, {
            path: "/socket.io",
        });

        newSocket.on("connect", () => {
            setSocket(newSocket);
        });

        newSocket.on("messages", handleMessages);

        newSocket.on("error", handleSocketError);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(
        () => {
            if (socket) {
                handleGetMessages();
            }
        },
        // eslint-disable-next-line
        [socket]
    );

    const handleMessages = (data: { message: string; messages: Message[] }) => {
        setMessages(data.messages);
    };

    const handleSocketError = (error: any) => {
        console.error("WebSocket error:", error);
    };

    const handleGetMessages = () => {
        if (socket) {
            socket.emit("getMessages");
        }
    };

    const sendMessage = () => {
        if (socket && message.trim() !== "") {
            socket.emit(
                "sendMessage",
                {
                    sender: "65bfbe2faecd8c9efc906200",
                    message: message,
                    message_type: "text",
                    contact_id: "65c1fa406709e451bc22f928",
                },
                (response: any) => {
                    console.log("Message sent successfully:", response);
                }
            );
            handleGetMessages();
            setMessage("");
        }
    };

    if (!socket) {
        return <div>Connecting to server...</div>;
    }

    console.log(messages);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 p-5">
                {messages?.map((message: any) => {
                    return (
                        <div
                            className="flex w-full"
                            style={{
                                justifyContent: message.sender._id === sender ? "end" : "start",
                            }}
                        >
                            <p
                                key={message._id}
                                className="p-2 text-white bg-blue-500 rounded max-w-[25%]"
                            >
                                {message.message}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className="flex items-center gap-2 p-2">
                <input
                    type="text"
                    placeholder="Message"
                    className="p-2 border rounded"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button
                    className="p-2 text-white bg-blue-500 rounded"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatSocket;
