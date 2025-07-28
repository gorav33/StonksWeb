import React from 'react';
import { TrendingUp } from 'lucide-react';

const AlphaDrop = () => {
  const alphaQuotes = [
    "The market can stay irrational longer than you can stay solvent, but diamond hands stay forever.",
    "Buy the dip, sell the rip, never sell the dream.",
    "In a world of paper hands, be the diamond hands.",
    "The only way is up. Stonks only go up.",
    "Fear is temporary, gains are eternal."
  ];

  const todayQuote = alphaQuotes[Math.floor(Math.random() * alphaQuotes.length)];

  return (
    <div className="mx-4 mb-6">
      <div className="bg-card rounded-2xl p-4 border border-border chad-glow">
        <div className="flex items-center gap-2 mb-3">
          <div className="alpha-badge flex items-center gap-1">
            <TrendingUp size={14} />
            DAILY ALPHA
          </div>
        </div>
        
        <blockquote className="text-alpha text-foreground leading-relaxed">
          "{todayQuote}"
        </blockquote>
        
        <div className="mt-3 text-xs text-muted-foreground">
          — Stonks, Professional Chad
        </div>
      </div>
    </div>
  );
};

export default AlphaDrop;