'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Share, ArrowUp } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import axios from "axios";

const recommendedCommunities = [
    {
        name: 'Health & Wellness',
        description: 'Join our community for discussions on health, fitness, nutrition, and general well-being.',
        link: '/community/health-wellness',
    },
    {
        name: 'Technology Enthusiasts',
        description: 'Connect with fellow tech enthusiasts to discuss the latest trends, gadgets, and innovations.',
        link: '/community/technology-enthusiasts',
    },
    {
        name: 'Mental Health Support',
        description: 'Find support, resources, and a safe space to discuss mental health and well-being.',
        link: '/community/mental-health-support',
    }
];

interface Message {
    id: string
    text: string
    sender: 'user' | 'ai'
    isTyping?: boolean
    communities?: typeof recommendedCommunities;
}


const Page = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            const scrollElement = messagesEndRef.current;
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    }, [messages]);

    const simulateAIResponse = async (flaskMessageBody) => {
        setIsTyping(true);
        const response = await axios.post('http://127.0.0.1:5000/question-answer', flaskMessageBody);
        const dummyResponse = response.data?.message;
        const typingMessage: Message = {
            id: crypto.randomUUID(),
            text: '',
            sender: 'ai',
            isTyping: true,
        };
        setMessages((prev) => [...prev, typingMessage]);

        let tempMessage = '';
        for (let i = 0; i < dummyResponse.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 10));
            tempMessage += dummyResponse[i];

            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === typingMessage.id ? { ...msg, text: tempMessage } : msg
                )
            );
        }

        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === typingMessage.id ? { ...msg, isTyping: false } : msg
            )
        );

        // Step 2: Add the message introducing the communities
        const introMessage: Message = {
            id: crypto.randomUUID(),
            text: "Here are some communities you might find interesting:",
            sender: 'ai',
        };
        await new Promise((resolve) => setTimeout(resolve, 500));
        setMessages((prev) => [...prev, introMessage]);

        // Step 3: Add communities one by one
        for (let i = 0; i < recommendedCommunities.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    sender: 'ai',
                    text: '',
                    communities: [recommendedCommunities[i]],
                },
            ]);
        }

        setIsTyping(false);
    };

    const handleSend = async () => {
        if (!inputMessage.trim()) return;

        const newMessage = {
            id: crypto.randomUUID(),
            text: inputMessage,
            sender: 'user'
        };

        const flaskMessageBody = {
            message: inputMessage,
            chatBotRoomId: 1
        }

        setMessages(prev => [...prev, { ...newMessage, sender: 'user' as const }]);
        setInputMessage('');

        await simulateAIResponse(flaskMessageBody);
    };

    const handleCopyMessage = (text: string, id: string, communities?: typeof recommendedCommunities) => {
        if (communities) {
            const communityLink = communities[0]?.link;
            navigator.clipboard.writeText(communityLink || text);
        } else {
            navigator.clipboard.writeText(text);
        }

        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
        toast.success('Copied to clipboard');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && !isTyping) {
            e.preventDefault();
            handleSend();
        }
    };
    const EmptyChat = () => (
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 text-center overflow-auto">
            <div className="max-w-2xl space-y-4 md:space-y-6">
                <div className="p-3 md:p-4 rounded-full bg-blue-50 w-fit mx-auto">
                    <svg
                        className="w-8 h-8 md:w-12 md:h-12 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>

                <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                    Your Virtual Healthcare Assistant
                </h1>

                <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto px-4">
                    Get reliable medical information and guidance from our advanced healthcare AI system. Available 24/7 to assist with your health-related queries.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm px-4">
                    {[
                        "Symptom Assessment",
                        "Medical Information",
                        "Drug Interactions",
                        "Lifestyle Guidance",
                        "Emergency Guidelines",
                        "Wellness Tips"
                    ].map((feature) => (
                        <div
                            key={feature}
                            className="flex items-center gap-2 p-2.5 md:p-3 rounded-xl bg-white shadow-sm border border-blue-100"
                        >
                            <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-4">
                    <button
                        className="px-5 py-2.5 md:px-6 md:py-3 text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-medium text-sm md:text-base"
                        onClick={() => setMessages([{
                            id: crypto.randomUUID(),
                            text: "Hello! I'm your healthcare assistant. How may I help you with your health-related questions today?",
                            sender: 'ai'
                        }])}
                    >
                        Start Consultation
                    </button>
                </div>
            </div>
        </div>
    );
    const MessageActions = ({ message }: { message: Message }) => (
        <div className={`absolute bottom-[10px] left-0 right-0 translate-y-[100%] pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-center justify-start gap-2 px-2 mb-2">
                {!message.isTyping && (
                    <button
                        onClick={() => handleCopyMessage(message.text, message.id, message.communities)}
                        className={`p-1.5 mb-4 rounded-lg text-gray-500 shadow-sm`}
                    >
                        {copiedId === message.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <div className="sticky top-0 z-10 p-6 border-b bg-white backdrop-blur-lg bg-opacity-80">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Pagal GPT</span>
                        <span className="text-sm text-gray-500 ml-4 italic">our most duffer LLM model ever</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Share className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {messages.length === 0 ? (
                <EmptyChat />
            ) : (
                <div className="flex-1 overflow-y-auto scrollbar-hide" ref={messagesEndRef}>
                    <div className="max-w-4xl mx-auto p-4 space-y-6">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up items-start gap-2`}
                            >
                                {message.sender === 'ai' && (
                                    <Image
                                        src="/icons/chatgptLogo.png"
                                        alt="AI Assistant"
                                        width={1000}
                                        height={1000}
                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    />
                                )}
                                <div className="group relative max-w-[85%] md:max-w-[75%]">
                                    <div
                                        className={`px-6 py-4 ${message.sender === 'user'
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-sm'
                                            : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm shadow-lg border'
                                            } transition-all duration-200 hover:shadow-md`}
                                    >
                                        {message.communities ? (
                                            <div className="space-y-4">
                                                {message.communities.map((community) => (
                                                    <div key={community.name} >
                                                        <h3 className="text-lg font-semibold text-blue-600">
                                                            <a href={community.link}>{community.name}</a>
                                                        </h3>
                                                        <p className="text-gray-600 text-sm">{community.description}</p>
                                                        <a
                                                            href={community.link}
                                                            className="text-blue-500 hover:underline text-sm font-medium"
                                                        >
                                                            Visit Community
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                                        )}
                                    </div>
                                    <MessageActions message={message} />
                                </div>
                                {message.sender === 'user' && (
                                    <Image
                                        src="/icons/userLogo.png"
                                        alt="User"
                                        width={1000}
                                        height={100}
                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    />
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="sticky bottom-0 z-10 p-4 bg-gradient-to-t from-gray-50 pt-6">
                <div className="max-w-4xl mx-auto">
                    <div className="relative flex justify-center align-center gap-2 bg-white rounded-2xl shadow-xl border border-gray-200  hover:border-blue-500 transition-colors">
                        <textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask me anything..."
                            className="flex-1 resize-none p-4 bg-transparent focus:outline-none min-h-[24px] text-zinc-900 max-h-32 rounded-2xl"
                            rows={1}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputMessage.trim() || isTyping}
                            className="self-center p-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:scale-105 active:scale-95 mb-0.5 mr-1"
                        >
                            <ArrowUp className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
