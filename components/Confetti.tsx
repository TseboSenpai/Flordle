"use client"
import React from "react";
import confetti from "canvas-confetti";

export default function CelebratePage() {
  const handleConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 } // Adjust origin to change where it shoots from
    });
  };
}
