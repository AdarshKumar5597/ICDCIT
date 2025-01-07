import React from 'react';
import ChatHeader from './ChatHeader';
import MessagesArea from './MessagesArea';
import MessageInput from './MessageInput';
import { Community } from '@/types/types';

interface ChatAreaProps {
    currentCommunity: Community;
    message: string;
    setMessage: (message: string) => void;
    showEmoji: boolean;
    setShowEmoji: (show: boolean) => void;
    handleSendMessage: () => void;
    handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setIsRightSidebarOpen: (isOpen: boolean) => void;
    isRightSidebarOpen: boolean;
    addEmoji: (emojiData: any) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
    currentCommunity,
    message,
    setMessage,
    showEmoji,
    setShowEmoji,
    handleSendMessage,
    handleImageSelect,
    setIsRightSidebarOpen,
    isRightSidebarOpen,
    addEmoji,
}) => {
    return (
        <div className={`flex-1 flex flex-col bg-white min-w-0`}>
            <ChatHeader
                communityImage={currentCommunity.image}
                communityName={currentCommunity.name}
                memberCount={currentCommunity.members.length}
                toggleSidebar={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            />
            <MessagesArea
                messages={currentCommunity.messages.map(msg => ({ ...msg, type: msg.isImage ? 'image' : 'text' }))}
                currentUserId={1}
            />
            <MessageInput
                message={message}
                setMessage={setMessage}
                showEmoji={showEmoji}
                toggleEmojiPicker={() => setShowEmoji(!showEmoji)}
                handleSendMessage={handleSendMessage}
                handleImageSelect={handleImageSelect}
                addEmoji={addEmoji}
            />
        </div>
    );
};
export default ChatArea;
