'use client'
import { baseURL } from "@/axios.config";
import moment from "moment";
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface Message {
    _id: string;
    sender: string;
    message: string;
}

const ChatSocket: React.FC = () => {
    const [messages, setMessages] = useState<any>([]);
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

    const handleMessages = (data: { message: string; messages: any }) => {
        setMessages([...data.messages, message]);
    };

    const handleSocketError = (error: any) => {
        console.error("WebSocket error:", error);
    };

    const handleGetMessages = () => {
        if (socket) {
            socket.emit("getMessages");
        }
    };

    const sendMessage = async () => {
        if (socket && message.trim() !== "") {
            socket.emit("sendMessage", {
                sender: "65bfbe2faecd8c9efc906200",
                message: message,
                message_type: "text",
                contact_id: "65c1fa406709e451bc22f928"
            });
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
                                justifyContent: message.sender?._id === sender ? "end" : "start",
                            }}
                        >
                            <div
                                key={message._id}
                                className="p-2 text-white bg-blue-500 rounded w-[25%]"
                            >
                                <p>{message.message}</p>
                                <div className="flex justify-end">
                                    <p>{moment(message.created_at).calendar()}</p>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
            <div className="flex items-center w-full gap-2 p-2">
                <input
                    type="text"
                    placeholder="Message"
                    className="p-2 border rounded w-full"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button
                    className="p-2 text-white w-20 bg-blue-500 rounded"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatSocket;
