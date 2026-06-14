'use client';

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSubmitted(true);
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--surface)',
    border: '1px solid var(--muted)',
    borderRadius: '8px',
    color: 'var(--foreground)',
    padding: '10px 14px',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: 'var(--muted)',
    fontSize: '13px',
    marginBottom: '6px',
    fontFamily: "'Playfair Display', serif",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(3px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          background: 'var(--bg-0)',
          border: '1px solid var(--highlight)',
          borderRadius: '20px',
          padding: '48px 36px 36px',
          width: 'min(92vw, 420px)',
          overflow: 'hidden',
        }}
      >
       

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '14px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'var(--muted)',
            fontSize: '22px',
            lineHeight: 1,
            cursor: 'pointer',
            padding: '4px 6px',
          }}
        >
          ×
        </button>

        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
          <img
            src="/avatar.png"
            alt="T-Senpai pixel avatar"
            style={{
              width: '88px',
              height: '88px',
              objectFit: 'cover',
              objectPosition: 'top',
              borderRadius: '50%',
              border: '2px solid var(--highlight)',
              imageRendering: 'pixelated',
            }}
          />
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: '24px',
          color: 'var(--flordle-ink)',
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          Get in touch
        </h2>

        {submitted ? (
          <p style={{ textAlign: 'center', color: 'var(--highlight)', fontFamily: "'Playfair Display', serif", fontSize: '17px', padding: '24px 0' }}>
            Thanks! I&apos;ll be in touch 🌸
          </p>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label htmlFor="cf-name" style={labelStyle}>Your name</label>
              <input
                id="cf-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="cf-email" style={labelStyle}>Email</label>
              <input
                id="cf-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="cf-message" style={labelStyle}>Message</label>
              <textarea
                id="cf-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can I help you?"
                rows={5}
                required
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '4px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                padding: '12px 28px',
                fontSize: '15px',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                alignSelf: 'center',
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
