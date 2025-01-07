'use client'
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { communitiesData } from '@/data/data';
import ChatArea from '@/components/Chat/ChatArea';
import { Community } from '@/types/types';
import { RightSidebar } from '@/components/Chat/RightSidebar';
import LeftSidebar from '@/components/Chat/LeftSidebar';
import { AnimatePresence } from 'framer-motion';
import PopupModal from '@/components/global/PopupModal';
import CommunityPopup from '@/components/Chat/CommunityPopup';

const ChatInterface = () => {
    const [communities, setCommunities] = useState<Community[]>(communitiesData);//all communities
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [userCommunities, setUserCommunities] = useState<Community[]>([]);
    const [currentCommunity, setCurrentCommunity] = useState<Community>(communities[0]);
    const [message, setMessage] = useState<string>("");
    const [showEmoji, setShowEmoji] = useState<boolean>(false);
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState<boolean>(true);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState<boolean>(false);
    const [openCreateCommunityPopup, setOpenCreateCommunityPopup] = useState<boolean>(false);
    const userId = 4; // temp curr user id for testing purposes (my community wgrh determined by if user id 4 msg is there)

    useEffect(() => {
        setUserCommunities(communities.filter((community) => {
            return community.members.some((member) => member.id === userId);
        }));
    }, [communities, userId]);

    useEffect(() => {
        setIsRightSidebarOpen(false);
    }, [currentCommunity])

    const handleSendMessage = () => {

        if (!message.trim()) return;

        const newMessage = {
            id: Date.now(),
            userId: 1,
            userName: "Dr. Sarah Johnson",
            userAvatar: "/images/chat/femaledoctor.png",
            content: message,
            timestamp: new Date().toISOString(),
            isImage: false
        };

        const updatedCommunities = communities.map(comm => {
            if (comm.id === currentCommunity.id) {
                return {
                    ...comm,
                    messages: [...comm.messages, newMessage]
                };
            }
            return comm;
        });

        setCommunities(updatedCommunities);
        setCurrentCommunity(updatedCommunities.find(c => c.id === currentCommunity.id)!);
        setMessage("");
        console.log('Updated Chat Data:', updatedCommunities);
    };

    const handleCopyLink = () => {
        const link = `https://healthconnect.com/community/${currentCommunity.id}`;
        navigator.clipboard.writeText(link);
        toast.success('Community link copied!');
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addEmoji = (emojiData: any) => {
        const emoji = emojiData.native;
        setMessage(message + emoji);
        setShowEmoji(false);
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            const newMessage = {
                id: Date.now(),
                userId: 1,
                userName: "Dr. Sarah Johnson",
                userAvatar: "/images/chat/femaledoctor.png",
                content: imageUrl,
                timestamp: new Date().toISOString(),
                isImage: true
            };

            const updatedCommunities = communities.map(comm => {
                if (comm.id === currentCommunity.id) {
                    return {
                        ...comm,
                        messages: [...comm.messages, newMessage]
                    };
                }
                return comm;
            });

            setCommunities(updatedCommunities);
            setCurrentCommunity(updatedCommunities.find(c => c.id === currentCommunity.id)!);
        }
    };

    return (
        <>
            <AnimatePresence>
                {openCreateCommunityPopup && (
                    <PopupModal setIsOpen={setOpenCreateCommunityPopup}>
                        <CommunityPopup onClose={() => setOpenCreateCommunityPopup(false)} />
                    </PopupModal>
                )}
            </AnimatePresence>

            <div className="flex mt-16 h-[calc(100vh-5rem)] bg-gray-50 max-w-[100vw] overflow-hidden">
                <LeftSidebar
                    communities={communities}
                    userCommunities={userCommunities}
                    currentCommunity={currentCommunity}
                    setCurrentCommunity={setCurrentCommunity}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    isLeftSidebarOpen={isLeftSidebarOpen}
                    setIsLeftSidebarOpen={setIsLeftSidebarOpen}
                    setOpenCreateCommunityPopup={setOpenCreateCommunityPopup}
                />
                <ChatArea
                    currentCommunity={currentCommunity}
                    message={message}
                    setMessage={setMessage}
                    showEmoji={showEmoji}
                    setShowEmoji={setShowEmoji}
                    handleSendMessage={handleSendMessage}
                    handleImageSelect={handleImageSelect}
                    setIsRightSidebarOpen={setIsRightSidebarOpen}
                    isRightSidebarOpen={isRightSidebarOpen}
                    addEmoji={addEmoji}
                />
                <RightSidebar
                    isRightSidebarOpen={isRightSidebarOpen}
                    setIsRightSidebarOpen={setIsRightSidebarOpen}
                    currentCommunity={currentCommunity}
                    handleCopyLink={handleCopyLink}
                />
            </div>
        </>
    );
};

export default ChatInterface;