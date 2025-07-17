import { useState, useEffect } from "react";

export const useTypewriter = (text: string, speed = 30) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;

    setIsTyping(true);
    setDisplayedText("");
    let index = 0;

    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;

      if (index >= text.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isTyping };
};
