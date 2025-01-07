import React from 'react';
import { Community } from '@/types/types';
import { ArrowRight, Copy } from 'lucide-react';
import { ActivityOverview } from './ActivityOverview';
import { DiscussionSummary } from './DiscussionSummary';
import { MembersSection } from './MembersSection';

interface RightSidebarProps {
    isRightSidebarOpen: boolean;
    setIsRightSidebarOpen: (isOpen: boolean) => void;
    currentCommunity: Community;
    handleCopyLink: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
    isRightSidebarOpen,
    setIsRightSidebarOpen,
    currentCommunity,
    handleCopyLink,
}) => {
    return (
        <div className={`fixed lg:relative lg:block right-0 top-16 lg:top-0 h-[calc(100vh-4rem)] lg:h-full bg-white border-l overflow-y-auto transition-all duration-300 ease-in-out ${isRightSidebarOpen ? 'w-80 translate-x-0' : 'w-0 lg:w-80 translate-x-full lg:translate-x-0'}`}
        >

            <div className="p-6 space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800">Community Info</h3>
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <Copy className="w-4 h-4" />
                        Share
                    </button>
                    <button
                        onClick={() => setIsRightSidebarOpen(false)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowRight className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
                <ActivityOverview currentCommunity={currentCommunity} />
                <DiscussionSummary summary={currentCommunity.summary} />
                <MembersSection members={currentCommunity.members} />
            </div>
        </div>
    );
};
