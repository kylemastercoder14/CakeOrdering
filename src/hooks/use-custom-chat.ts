import { useState, useRef } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  type?: string;
  isLink?: boolean;
}

interface UseCustomChatReturn {
  messages: ChatMessage[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  stop: () => void;
}

export function useCustomChat(): UseCustomChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Abort controller for cancellation
      controllerRef.current = new AbortController();

      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
        signal: controllerRef.current.signal,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      // Add bot response
      const botMessage: ChatMessage = {
        role: "assistant",
        content: data.response,
        type: data.type,
        isLink: data.isLink,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again later.",
          },
        ]);
      }
    } finally {
      setIsLoading(false);
      controllerRef.current = null;
    }
  };

  const stop = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
  };
}
