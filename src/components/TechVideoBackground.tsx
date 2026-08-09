import React from 'react';

export const TechVideoBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
      {/* Loop video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-35 filter brightness-105 contrast-125 scale-105 transition-opacity duration-1000"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-data-41539-large.mp4"
          type="video/mp4"
        />
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-network-connection-lines-and-dots-loop-27471-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Decent Midnight Sapphire & Deep Indigo overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080d1a]/85 via-[#0b1329]/75 to-[#080d1a]/95" />
      
      {/* Dynamic 3D Neon Cyan & Violet Light Beams */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[160px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[160px] animate-pulse pointer-events-none" />

      {/* 3D Cybernetic Grid mesh overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_65%,transparent_100%)] opacity-35" />
    </div>
  );
};

