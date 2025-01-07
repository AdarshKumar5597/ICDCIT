import React, { useRef } from 'react';
import { Send, Smile, Image as ImageIcon } from 'lucide-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface MessageInputProps {
    message: string;
    setMessage: (message: string) => void;
    showEmoji: boolean;
    toggleEmojiPicker: () => void;
    handleSendMessage: () => void;
    handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addEmoji: (emojiData: any) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
    message,
    setMessage,
    showEmoji,
    toggleEmojiPicker,
    handleSendMessage,
    handleImageSelect,
    addEmoji,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="bg-white p-4 border-t">
            <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-50 rounded-xl flex items-center p-3 border focus-within:border-blue-500 transition-all relative">
                    <Smile
                        className="w-6 h-6 text-gray-400 mx-2 cursor-pointer hover:text-gray-600 transition-colors"
                        onClick={toggleEmojiPicker}
                    />
                    {showEmoji && (
                        <div className="absolute bottom-12 left-0">
                            <Picker
                                data={data}
                                onEmojiSelect={addEmoji}
                                emojiSize={20}
                                emojiButtonSize={28}
                                maxFrequentRows={1}
                                theme="light"
                            />
                        </div>
                    )}
                    <input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent focus:outline-none text-gray-700"
                    />
                    <label className="cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                        />
                        <ImageIcon className="w-6 h-6 text-gray-400 mx-2 hover:text-gray-600 transition-colors" />
                    </label>
                </div>
                <button
                    onClick={handleSendMessage}
                    className="p-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <Send className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
