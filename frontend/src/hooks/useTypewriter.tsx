import { useState, useEffect, useRef, useCallback } from "react";

export const useTypewriter = (text: string, speed = 30) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Use refs to track timer and prevent race conditions
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const isMountedRef = useRef(true);
  const currentTextRef = useRef(text);

  // Cleanup function to clear timer safely
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Reset and start typing animation
  const startTyping = useCallback(() => {
    // Clear any existing timer first
    cleanup();

    if (!text || !isMountedRef.current) return;

    // Reset state
    indexRef.current = 0;
    setDisplayedText("");
    setIsTyping(true);
    currentTextRef.current = text;

    // Start new timer
    timerRef.current = setInterval(() => {
      // Check if component is still mounted and text hasn't changed
      if (!isMountedRef.current || currentTextRef.current !== text) {
        cleanup();
        return;
      }

      const currentIndex = indexRef.current;

      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        indexRef.current = currentIndex + 1;
      } else {
        // Typing complete
        cleanup();
        if (isMountedRef.current) {
          setIsTyping(false);
        }
      }
    }, speed);
  }, [text, speed, cleanup]);

  // Effect to handle text changes
  useEffect(() => {
    currentTextRef.current = text;
    startTyping();
  }, [text, speed, startTyping]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      cleanup();
    };
  }, [cleanup]);

  return { displayedText, isTyping };
};
