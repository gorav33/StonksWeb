import React from 'react';
import stonksAvatar from '@/assets/stonks-avatar.jpg';

interface VideoAvatarProps {
  isSpeaking: boolean;
}

const VideoAvatar = ({ isSpeaking }: VideoAvatarProps) => {
  return (
    <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-8">
      <div className="relative">
        {/* Main Avatar Container */}
        <div className={`
          relative w-80 h-80 rounded-3xl overflow-hidden 
          bg-gradient-to-br from-card via-card to-card/80
          border-2 border-border
          ${isSpeaking ? 'animate-pulse border-neon-green shadow-lg shadow-neon-green/20' : ''}
          transition-all duration-300
        `}>
          {/* Avatar Image */}
          <img 
            src={stonksAvatar}
            alt="Stonks AI Avatar"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay for video effect */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]"></div>
          
          {/* Speaking indicator */}
          {isSpeaking && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 bg-neon-green/20 backdrop-blur-sm rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-neon-green">Speaking...</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Glow effect when speaking */}
        {isSpeaking && (
          <div className="absolute inset-0 rounded-3xl bg-neon-green/10 blur-xl animate-pulse"></div>
        )}
        
        {/* STONKS watermark */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl font-black text-alpha-gold/30 tracking-wider">
            STONKS
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VideoAvatar;