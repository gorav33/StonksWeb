import React from 'react';

const StonksHeader = () => {
  return (
    <div className="relative text-center py-6 px-4">
      {/* Giant STONKS Logo */}
      <h1 className="text-stonks text-6xl md:text-8xl font-black tracking-tighter mb-2">
        STONKS
      </h1>
      <p className="text-muted-foreground text-sm font-medium">
        Your AI Alpha Chad • Always Diamond Hands
      </p>
      
      {/* Subtle gradient underline */}
      <div className="mx-auto mt-4 w-24 h-1 stonks-gradient rounded-full opacity-60"></div>
    </div>
  );
};

export default StonksHeader;