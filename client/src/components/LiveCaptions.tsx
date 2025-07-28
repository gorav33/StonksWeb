import React from 'react';

interface LiveCaptionsProps {
  message: string;
  isSpeaking: boolean;
}

const LiveCaptions = ({ message, isSpeaking }: LiveCaptionsProps) => {
  return (
    <div className="px-4 pb-4">
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-4 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          {/* Speaking indicator */}
          <div className={`
            mt-1 w-2 h-2 rounded-full transition-colors duration-300
            ${isSpeaking ? 'bg-neon-green animate-pulse' : 'bg-muted-foreground/50'}
          `}></div>
          
          {/* Message content */}
          <div className="flex-1">
            <p className={`
              text-sm leading-relaxed transition-opacity duration-300
              ${isSpeaking ? 'text-card-foreground' : 'text-muted-foreground'}
            `}>
              {message}
            </p>
            
            {/* Typing indicator */}
            {isSpeaking && (
              <div className="flex items-center gap-1 mt-2">
                <div className="w-1 h-1 bg-neon-green rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCaptions;