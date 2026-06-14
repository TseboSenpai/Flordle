'use client';

import { observer, useLocalObservable } from "mobx-react-lite";
import Guess from "../../components/Guess";
import Qwerty from "../../components/Qwerty";
import PuzzleStore from "../../stores/PuzzleStore";
import { useEffect, useState } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import ContactModal from "../../components/ContactModal";

export default observer(function Home() {
  const store = useLocalObservable(() => PuzzleStore())
  const [isContactOpen, setIsContactOpen] = useState(false)
  useEffect(() => {
    store.init()
    const handler = (e: KeyboardEvent) => store.handleKeyup(e)
    window.addEventListener('keyup', handler)

    // debug: log available store keys
    // eslint-disable-next-line no-console
    console.log('store keys:', Object.keys(store))

    return () => {
      window.removeEventListener('keyup', handler)
    }
  }, [])

  return <div
    className="flex h-screen w-screen flex-col items-center justify-center"
    style={{
      backgroundImage: 'var(--page-bg-image)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <ThemeToggle />
    {store.error && (
      <div className="mt-4 rounded bg-red-800/60 px-4 py-2 text-red-100">
        {store.error}
      </div>
    )}
    <h1 style={{
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      position: 'relative',
      padding: '14px 26px',
      fontWeight: 800,
      fontSize: '92px',
      lineHeight: 1,
      letterSpacing: '-0.01em',
      color: 'var(--flordle-ink)',
      fontFamily: "'Playfair Display', serif",
    }}>
      <span className="flordle-deco" style={{ position: 'absolute', top: '-10px', left: '-30px', transform: 'rotate(-18deg)' }}>
        <svg width="64" height="64" viewBox="-50 -50 100 100" aria-hidden="true">
          <path d="M-32,42 C-10,28 6,4 14,-26" fill="none" stroke="#9aa85a" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M-12,22 C-26,18 -34,6 -30,-6 C-16,-2 -8,8 -12,22 Z" fill="#9aa85a" />
          <path d="M2,2 C-4,-12 2,-26 14,-30 C16,-16 12,-2 2,2 Z" fill="#9aa85a" />
          <g transform="translate(14,-30) scale(0.42)">
            <path transform="rotate(0)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round" />
            <path transform="rotate(72)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round" />
            <path transform="rotate(144)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round" />
            <path transform="rotate(216)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round" />
            <path transform="rotate(288)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round" />
            <circle r="6" fill="#ecc85a" />
          </g>
        </svg>
      </span>
      <span className="flordle-deco" style={{ position: 'absolute', bottom: '-14px', left: '-26px', transform: 'rotate(150deg)' }}>
        <svg width="26" height="26" viewBox="-50 -50 100 100" aria-hidden="true"><path d="M0,42 C-28,18 -28,-24 0,-46 C28,-24 28,18 0,42 Z" fill="#9aa85a"/><path d="M0,40 L0,-40" stroke="rgba(0,0,0,0.14)" strokeWidth="2.4" fill="none" strokeLinecap="round"/></svg>
      </span>
      <span className="flordle-deco" style={{ position: 'absolute', bottom: '-18px', right: '-22px', transform: 'rotate(20deg) scaleX(-1)' }}>
        <svg width="58" height="58" viewBox="-50 -50 100 100" aria-hidden="true"><path d="M-32,42 C-10,28 6,4 14,-26" fill="none" stroke="#9aa85a" strokeWidth="3.2" strokeLinecap="round"/><path d="M-12,22 C-26,18 -34,6 -30,-6 C-16,-2 -8,8 -12,22 Z" fill="#9aa85a"/><path d="M2,2 C-4,-12 2,-26 14,-30 C16,-16 12,-2 2,2 Z" fill="#9aa85a"/><g transform="translate(14,-30) scale(0.42)"><path transform="rotate(0)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round"/><path transform="rotate(72)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round"/><path transform="rotate(144)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round"/><path transform="rotate(216)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round"/><path transform="rotate(288)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round"/><circle r="6" fill="#ecc85a"/></g></svg>
      </span>
      <span style={{ marginRight: '0.005em' }}>Fl</span>
      <span style={{ display: 'inline-flex', margin: '0 0.005em', transform: 'translateY(0.02em)' }}>
        <svg width="70" height="70" viewBox="-50 -50 100 100" aria-hidden="true"><g><path transform="rotate(0)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round"/><path transform="rotate(72)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round"/><path transform="rotate(144)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round"/><path transform="rotate(216)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round"/><path transform="rotate(288)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round"/></g><g stroke="#f0a8c2" strokeWidth="1.3" strokeLinecap="round" fill="#f0a8c2"><g transform="rotate(0.0)"><line y2="-10"/><circle cy="-11" r="1.7"/></g><g transform="rotate(51.4)"><line y2="-10"/><circle cy="-11" r="1.7"/></g><g transform="rotate(102.9)"><line y2="-10"/><circle cy="-11" r="1.7"/></g><g transform="rotate(154.3)"><line y2="-10"/><circle cy="-11" r="1.7"/></g><g transform="rotate(205.7)"><line y2="-10"/><circle cy="-11" r="1.7"/></g><g transform="rotate(257.1)"><line y2="-10"/><circle cy="-11" r="1.7"/></g><g transform="rotate(308.6)"><line y2="-10"/><circle cy="-11" r="1.7"/></g></g><circle r="5" fill="#ecc85a"/></svg>
      </span>
      <span style={{ marginLeft: '0.005em' }}>rdle</span>
    </h1>
    {store.guesses.map((_, i) => (
        <Guess
          key = {i}
          word={store.word}
          guess={store.guesses[i]}
          isGuessed={i < store.currentGuess}
        />
    ))}
  
    {store.won && <h1>You Won!</h1>}
    {store.lost && <p style={{ textAlign: 'center' }}>You Lost!<br/>The word was: {store.word}</p>}
    {(store.won || store.lost) && (
      <button onClick={store.init}>Play Again</button>
    )}
    <Qwerty store={store} />
    {/* word: {store.word}
    guesses: {JSON.stringify(store.guesses)}
    */}

    {/* Fixed Contact button */}
    <button
      onClick={() => setIsContactOpen(true)}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 22px',
        background: 'var(--primary)',
        color: 'var(--flordle-ink)',
        border: 'none',
        borderRadius: '24px',
        backdropFilter: 'blur(6px)',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}
    >
      <svg width="18" height="18" viewBox="-50 -50 100 100" aria-hidden="true">
        <path transform="rotate(0)"   d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round" />
        <path transform="rotate(72)"  d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round" />
        <path transform="rotate(144)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round" />
        <path transform="rotate(216)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round" />
        <path transform="rotate(288)" d="M0,-4 C-11,-15 -13,-31 -4,-38 C-2,-40 -1,-37 0,-35 C1,-37 2,-40 4,-38 C13,-31 11,-15 0,-4 Z" fill="#cf6f93" stroke="#b9517a" strokeWidth="1.4" strokeLinejoin="round" />
        <circle r="6" fill="#ecc85a" />
      </svg>
      Contact
    </button>

    {isContactOpen && <ContactModal onClose={() => setIsContactOpen(false)} />}
  </div>
})