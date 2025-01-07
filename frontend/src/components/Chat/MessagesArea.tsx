import React, { useRef } from 'react';
import Image from 'next/image';
import { formatTime } from '@/utils/utils';
import { Message } from 'postcss';


interface MessagesAreaProps {
    messages: Message[];
    currentUserId: number;
}

const MessagesArea: React.FC<MessagesAreaProps> = ({ messages, currentUserId }) => {
    const msgContainer = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={msgContainer}
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 flex flex-col"
        >
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex items-start space-x-3 ${msg.userId === currentUserId ? 'justify-end' : 'justify-start'
                        }`}
                >
                    {msg.userId !== currentUserId && (
                        <Image
                            src={msg.userAvatar}
                            alt={msg.userName}
                            width={1000}
                            height={1000}
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                        />
                    )}
                    <div
                        className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${msg.userId === currentUserId
                            ? 'bg-blue-500 text-white ml-auto'
                            : 'bg-white border border-gray-100'
                            }`}
                    >
                        <div className="flex items-center space-x-2 mb-2">
                            <span
                                className={`text-sm font-medium ${msg.userId === currentUserId
                                    ? 'text-blue-50'
                                    : 'text-gray-700'
                                    }`}
                            >
                                {msg.userName}
                            </span>
                            <span
                                className={`text-xs ${msg.userId === currentUserId
                                    ? 'text-blue-200'
                                    : 'text-gray-400'
                                    }`}
                            >
                                {formatTime(msg.timestamp)}
                            </span>
                        </div>
                        {msg.isImage ? (
                            <Image
                                src={msg.content}
                                width={1000}
                                height={1000}
                                alt="Shared image"
                                className="rounded-lg max-w-60 h-auto object-cover"
                            />
                        ) : (
                            <p
                                className={`text-sm ${msg.userId === currentUserId
                                    ? 'text-white'
                                    : 'text-gray-800'
                                    }`}
                            >
                                {msg.content}
                            </p>
                        )}
                    </div>
                    {msg.userId === currentUserId && (
                        <Image
                            src={msg.userAvatar}
                            alt={msg.userName}
                            width={1000}
                            height={1000}
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default MessagesArea;
