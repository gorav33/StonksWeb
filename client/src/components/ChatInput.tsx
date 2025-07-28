import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const placeholders = [
    "Ask Stonks for some alpha...",
    "Drop your question, king...",
    "What's the play today?",
    "Need some market wisdom?",
    "Ready for some stonks talk?"
  ];

  const placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];

  return (
    <div className="p-4 bg-background border-t border-border">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="bg-card border-border text-card-foreground placeholder:text-muted-foreground rounded-xl py-3 px-4"
          />
        </div>
        <Button 
          type="submit" 
          disabled={!message.trim()}
          className="stonks-button min-w-[100px] h-12 rounded-xl font-bold tracking-wide"
        >
          <Send size={18} className="mr-2" />
          SEND IT
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;