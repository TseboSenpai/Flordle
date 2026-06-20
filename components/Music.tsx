import React, { useState, useRef } from 'react';

const ICON_ON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ width: 22, height: 22, display: 'block' }}>
    <path d="M4 9v6h3.5L13 19V5L7.5 9H4Z" fill="currentColor"/>
    <path d="M16 9.5a3.2 3.2 0 0 1 0 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18.5 7a6.5 6.5 0 0 1 0 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ICON_OFF = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ width: 22, height: 22, display: 'block' }}>
    <path d="M4 9v6h3.5L13 19V5L7.5 9H4Z" fill="currentColor"/>
    <path d="M16.5 9.5l5 5M21.5 9.5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const MusicPlayer = () => {
  const [started, setStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    const audio = new Audio('/The_quiet_beauty_of_everyday_life.mp3');
    audio.loop = true;
    audioRef.current = audio;
    return () => { audio.pause(); };
  }, []);

  const handleClick = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!started) {
      audio.play().catch(() => {});
      setStarted(true);
    } else {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  const soundOn = started && !isMuted;

  const style: React.CSSProperties = soundOn
    ? {
        background: hovered ? '#d77c9d' : '#cf6f93',
        color: '#fff',
        boxShadow: hovered
          ? '0 4px 0 #a8416a, 0 6px 14px rgba(168,65,106,.32)'
          : '0 3px 0 #a8416a',
        transform: hovered ? 'translateY(-1px)' : 'none',
        border: 'none',
      }
    : {
        background: hovered ? 'rgba(207,111,147,.28)' : 'rgba(207,111,147,.18)',
        color: '#cf6f93',
        boxShadow: 'none',
        transform: 'none',
        border: '1.5px solid rgba(207,111,147,.5)',
      };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={soundOn ? 'Mute' : 'Unmute'}
      aria-pressed={!soundOn}
      type="button"
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        cursor: 'pointer',
        transition: 'background .2s ease, color .2s ease, box-shadow .2s ease, transform .12s ease, border-color .2s ease',
        WebkitTapHighlightColor: 'transparent',
        ...style,
      }}
    >
      {soundOn ? ICON_ON : ICON_OFF}
    </button>
  );
};
