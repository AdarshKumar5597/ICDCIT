import React from 'react';
import Image from 'next/image';
import { formatTime } from '@/utils/utils';

interface MessageBubbleProps {
    userId: number;
    userName: string;
    userAvatar: string;
    content: string;
    timestamp: string;
    isImage: boolean;
    isCurrentUser: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
    userName,
    userAvatar,
    content,
    timestamp,
    isImage,
    isCurrentUser,
}) => (
    <div className={`flex items-start space-x-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
        {!isCurrentUser && (
            <Image
                src={userAvatar}
                alt={userName}
                width={1000}
                height={1000}
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
            />
        )}
        <div
            className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${isCurrentUser ? 'bg-blue-500 text-white ml-auto' : 'bg-white border border-gray-100'
                }`}
        >
            <div className="flex items-center space-x-2 mb-2">
                <span className={`text-sm font-medium ${isCurrentUser ? 'text-blue-50' : 'text-gray-700'}`}>
                    {userName}
                </span>
                <span className={`text-xs ${isCurrentUser ? 'text-blue-200' : 'text-gray-400'}`}>
                    {formatTime(timestamp)}
                </span>
            </div>
            {isImage ? (
                <Image
                    src={content}
                    width={1000}
                    height={1000}
                    alt="Shared image"
                    className="rounded-lg max-w-60 h-auto object-cover"
                />
            ) : (
                <p className={`text-sm ${isCurrentUser ? 'text-white' : 'text-gray-800'}`}>{content}</p>
            )}
        </div>
        {isCurrentUser && (
            <Image
                src={userAvatar}
                alt={userName}
                width={1000}
                height={1000}
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
            />
        )}
    </div>
);
