import React, { useEffect, useState } from 'react';
import { Search, ArrowLeft, PanelLeft, Plus } from 'lucide-react';
import Image from 'next/image';
import { Community } from '@/types/types';
import { formatTime } from '@/utils/utils';

interface LeftSidebarProps {
    communities: Community[];
    currentCommunity: Community;
    setCurrentCommunity: (community: Community) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isLeftSidebarOpen: boolean;
    setIsLeftSidebarOpen: (isOpen: boolean) => void;
    setOpenCreateCommunityPopup: (isOpen: boolean) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
    communities,
    currentCommunity,
    setCurrentCommunity,
    searchQuery,
    setSearchQuery,
    isLeftSidebarOpen,
    setIsLeftSidebarOpen,
    setOpenCreateCommunityPopup
}) => {

    const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);

    useEffect(() => {
        if (!isLeftSidebarOpen) {
            setSearchQuery("");
        }
    }, [isLeftSidebarOpen]);

    useEffect(() => {
        setFilteredCommunities(
            communities.filter(community =>
                community.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, communities]);

    return (
        <div className={`border-r border-gray-200 flex-shrink-0 overflow-x-hidden shadow-sm bg-white transition-all duration-300 ease-in-out ${!isLeftSidebarOpen ? 'w-16' : 'md:w-80 w-full z-10'}`}>
            {isLeftSidebarOpen ? (
                <div className="p-4 transition-transform duration-300 ease-in-out transform translate-x-0">
                    <div className="flex items-center space-x-3 mb-8">
                        <button
                            onClick={() => setIsLeftSidebarOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="text-gray-600 hover:text-gray-800" />
                        </button>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Communities
                        </h1>
                    </div>

                    <button
                        onClick={() => { setOpenCreateCommunityPopup(true) }}
                        className="w-full m-0 mb-4 group flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold rounded-xl transition-all duration-200"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                        <span>Create Community</span>
                    </button>


                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search communities"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 text-gray-800 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                    </div>

                    <div className="space-y-3">
                        {filteredCommunities.map((community) => (
                            <div
                                key={community.id}
                                onClick={() => {
                                    setCurrentCommunity(community);
                                    if (window.innerWidth < 768) {
                                        setIsLeftSidebarOpen(false);
                                    }
                                }}
                                className={`flex items-center p-4 rounded-xl cursor-pointer transition-all ${currentCommunity.id === community.id
                                    ? 'bg-blue-50 border border-blue-100'
                                    : 'hover:bg-gray-50 border border-transparent'
                                    }`}
                            >
                                <div className="relative">
                                    <Image
                                        src={community.image}
                                        alt={community.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full border-2 border-white shadow-md object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0 ml-3">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-gray-900 truncate">
                                            {community.name}
                                        </span>
                                        {community.messages.length > 0 && (
                                            <span className="text-xs text-gray-500">
                                                {formatTime(community.messages[community.messages.length - 1].timestamp)}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 truncate">
                                        {community.messages.length > 0 &&
                                            `${community.messages[community.messages.length - 1].userName}: ${community.messages[community.messages.length - 1].isImage
                                                ? '🖼️ Shared an image'
                                                : community.messages[community.messages.length - 1].content
                                            }`
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="py-4 flex flex-col items-center space-y-4">
                    <button
                        onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <PanelLeft size={24} className="text-gray-600 hover:text-gray-800" />
                    </button>

                    <button
                        onClick={() => { setOpenCreateCommunityPopup(true) }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Plus color={'blue'} size={24} className="text-gray-600 hover:text-gray-800" />
                    </button>

                    <div className="flex flex-col space-y-4 mt-4">
                        {filteredCommunities.map((community) => (
                            <div
                                key={community.id}
                                onClick={() => setCurrentCommunity(community)}
                                className="relative group"
                            >
                                <div className="relative">
                                    <Image
                                        src={community.image}
                                        alt={community.name}
                                        width={40}
                                        height={40}
                                        className={`rounded-full transition-all duration-200 cursor-pointer ${currentCommunity.id === community.id
                                            ? 'border-2 border-blue-500 shadow-lg ring-2 ring-blue-500/20'
                                            : 'border-2 border-white hover:border-blue-200'
                                            }`}
                                    />
                                </div>
                                <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg border border-gray-200">
                                    {community.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeftSidebar;


/*
import { Search, ArrowLeft, PanelLeft, Plus } from 'lucide-react'; // Add Plus to imports

// In the expanded sidebar view, add this right after the search input div:
<div className="flex items-center justify-between mb-6">
    <button 
        onClick={() => {}} // Add your create community handler here
        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl transition-colors"
    >
        <Plus size={20} />
        <span>Create Community</span>
    </button>
</div>

// For the collapsed sidebar view, add this right after the PanelLeft button:
<button
    onClick={() => {}} // Add your create community handler here
    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
>
    <Plus size={24} className="text-gray-600 hover:text-gray-800" />
</button>
*/