import React, { ReactNode } from 'react';

interface ChatLayoutProps {
    children: ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
    return (
        <div>{children}</div>
    );
}

export default ChatLayout;
