import React from 'react';
import stonksAvatar from '@/assets/stonks-avatar.jpg';
import { Message } from '@/types';

interface ChatInterfaceProps {
  messages: Message[];
}

const ChatInterface = ({ messages }: ChatInterfaceProps) => {

  return (
    <div className="flex-1 px-4 pb-4 overflow-hidden">
      <div className="bg-card rounded-2xl h-full border border-border overflow-hidden flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="relative">
            <img 
              src={stonksAvatar} 
              alt="Stonks Avatar" 
              className="w-10 h-10 rounded-full chad-glow"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neon-green rounded-full border-2 border-background"></div>
          </div>
          <div>
            <h3 className="font-bold text-card-foreground">Stonks</h3>
            <p className="text-xs text-muted-foreground">Online • Ready to drop alpha</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'stonks' && (
                <img 
                  src={stonksAvatar} 
                  alt="Stonks" 
                  className="w-8 h-8 rounded-full mr-2 mt-1 flex-shrink-0"
                />
              )}
              <div className={message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-stonks'}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;