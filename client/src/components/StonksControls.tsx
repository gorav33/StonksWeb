import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Volume2, VolumeX, Share } from 'lucide-react';

interface StonksControlsProps {
  onDailyAlpha: () => void;
  lfgMode: boolean;
  onToggleLfgMode: () => void;
}

const StonksControls = ({ onDailyAlpha, lfgMode, onToggleLfgMode }: StonksControlsProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Stonks AI - Daily Alpha',
        text: 'Check out this alpha from Stonks AI!',
        url: window.location.href
      });
    } else {
      // Fallback for desktop
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
        {/* Daily Alpha Button */}
        <Button
          onClick={onDailyAlpha}
          className="flex items-center gap-2 bg-alpha-gold/20 hover:bg-alpha-gold/30 text-alpha-gold border border-alpha-gold/30 rounded-full px-4 py-2 text-sm font-bold transition-colors"
        >
          <Brain size={16} />
          Daily Alpha
        </Button>
        
        {/* LFG Mode Toggle */}
        <Button
          onClick={onToggleLfgMode}
          className={`
            flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors
            ${lfgMode 
              ? 'bg-neon-green/20 hover:bg-neon-green/30 text-neon-green border border-neon-green/30' 
              : 'bg-muted/20 hover:bg-muted/30 text-muted-foreground border border-muted/30'
            }
          `}
        >
          {lfgMode ? <Volume2 size={16} /> : <VolumeX size={16} />}
          LFG Mode
        </Button>
        
        {/* Share Button */}
        <Button
          onClick={handleShare}
          className="flex items-center gap-2 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue border border-neon-blue/30 rounded-full px-4 py-2 text-sm font-bold transition-colors"
        >
          <Share size={16} />
          Share
        </Button>
      </div>
    </div>
  );
};

export default StonksControls;