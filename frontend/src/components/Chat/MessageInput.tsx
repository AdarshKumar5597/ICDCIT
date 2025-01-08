import React, { useRef, useEffect } from 'react';
import { Send, Smile, Image as ImageIcon } from 'lucide-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { Community } from '@/types/types';

interface MessageInputProps {
    currentCommunity: Community;
    message: string,
    setMessage: (message: string) => void;
    showEmoji: boolean;
    toggleEmojiPicker: () => void;
    handleSendMessage: () => void;
    handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addEmoji: (emojiData: any) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
    currentCommunity,
    message,
    setMessage,
    showEmoji,
    toggleEmojiPicker,
    handleSendMessage,
    handleImageSelect,
    addEmoji,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.value = '';
        }
    }, [currentCommunity.messages]);

    return (
        <div className="bg-white p-2 sm:p-4 border-t w-full">
            <div className="flex items-center space-x-2 sm:space-x-3 max-w-full">
                <div className="flex-1 bg-gray-50 rounded-xl flex items-center p-2 sm:p-3 border focus-within:border-blue-500 transition-all relative min-w-0">
                    <Smile
                        className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mx-1 sm:mx-2 cursor-pointer hover:text-gray-600 transition-colors flex-shrink-0"
                        onClick={toggleEmojiPicker}
                    />
                    {showEmoji && (
                        <div className="absolute bottom-12 left-0 z-50">
                            <div className="max-w-[90vw] sm:max-w-none">
                                <Picker
                                    data={data}
                                    onEmojiSelect={addEmoji}
                                    emojiSize={20}
                                    emojiButtonSize={28}
                                    maxFrequentRows={1}
                                    theme="light"
                                />
                            </div>
                        </div>
                    )}
                    <input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent focus:outline-none text-gray-700 min-w-0 text-sm sm:text-base"
                    />
                    <label className="cursor-pointer flex-shrink-0">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                        />
                        <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mx-1 sm:mx-2 hover:text-gray-600 transition-colors" />
                    </label>
                </div>
                <button
                    onClick={handleSendMessage}
                    className="p-2 sm:p-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
                >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
            </div>
        </div>
    );
};

export default MessageInput;