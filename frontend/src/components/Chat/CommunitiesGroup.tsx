import React from 'react'
import Image from 'next/image'
import { Community } from '@/types/types'
import { formatTime } from '@/utils/utils'

interface CommunitiesGroupProps {
    communities: Community[]
    currentCommunity: Community
    setCurrentCommunity: (community: Community) => void
    setIsLeftSidebarOpen: (isOpen: boolean) => void
}

const CommunitiesGroup: React.FC<CommunitiesGroupProps> = ({
    communities,
    currentCommunity,
    setCurrentCommunity,
    setIsLeftSidebarOpen,
}) => {
    return (
        <div className="space-y-3">
            {communities.map((community) => (
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
    )
}

export default CommunitiesGroup
