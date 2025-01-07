import React from 'react';
import Image from 'next/image';
import { MoreVertical } from 'lucide-react';

interface ChatHeaderProps {
    communityImage: string;
    communityName: string;
    memberCount: number;
    toggleSidebar: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
    communityImage,
    communityName,
    memberCount,
    toggleSidebar,
}) => {
    return (
        <div className="bg-zinc-200 p-3 flex items-center justify-between border-b shadow-sm">
            <div className="flex items-center space-x-3">
                <Image
                    src={communityImage}
                    alt={communityName}
                    width={1000}
                    height={1000}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover"
                />
                <div>
                    <h2 className="font-bold text-lg text-gray-800">{communityName}</h2>
                    <span className="text-sm text-gray-500">{memberCount} members</span>
                </div>
            </div>
            <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <MoreVertical className="w-6 h-6 text-gray-600" />
            </button>
        </div>
    );
};

export default ChatHeader;
