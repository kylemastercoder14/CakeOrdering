"use client";

import React, { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  MessageCircle,
  Send,
  Square,
  X,
  XCircle,
  Bot,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useCustomChat } from "@/hooks/use-custom-chat";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useCustomChat();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const linkify = (text: string) => {
    // Enhanced regex to catch more link patterns
    const urlRegex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))/g;
    return text.replace(urlRegex, (match, fullMatch, linkText, url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-200">${linkText}</a>`;
    });
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-gradient-to-r from-[#0F2A1D] to-[#375534] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-1">
              <Button
                ref={chatIconRef}
                onClick={toggleChat}
                size="lg"
                className="h-16 w-16 rounded-full bg-white hover:bg-gray-50 text-[#0F2A1D] hover:text-[#0F2A1D]/90 shadow-md hover:shadow-lg transition-all duration-300"
                variant="ghost"
              >
                {!isChatOpen ? (
                  <div className="flex items-center flex-col gap-1">
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-xs font-medium">Chat</span>
                  </div>
                ) : (
                  <div className="flex items-center flex-col gap-1">
                    <XCircle className="w-6 h-6" />
                    <span className="text-xs font-medium">Close</span>
                  </div>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-50 w-[95%] max-w-[450px] lg:max-w-[500px]"
          >
            <Card className="border-2 border-emerald-800 shadow-2xl bg-white/95 backdrop-blur-sm">
              {/* Header */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-[#0F2A1D] to-[#375534] text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">
                      Marian&apos;s Homebakeshop
                    </CardTitle>
                    <p className="text-sm text-white font-medium">
                      AI Assistant
                    </p>
                  </div>
                </div>
                <Button
                  onClick={toggleChat}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                  <span className="sr-only">Close Chat</span>
                </Button>
              </CardHeader>

              {/* Chat Content */}
              <CardContent className="p-0">
                <ScrollArea className="h-[350px] p-4">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-emerald-100 rounded-full flex items-center justify-center mb-4">
                        <Bot className="w-8 h-8 text-emerald-800" />
                      </div>
                      <p className="text-gray-600 font-medium mb-2">
                        Welcome to Marian&apos;s Homebakeshop! 🎂
                      </p>
                      <p className="text-sm text-gray-500">
                        Ask me about our cakes, pricing, or services!
                      </p>
                    </div>
                  )}

                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-6 flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex gap-3 max-w-[85%] ${
                          message.role === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-blue-500 to-blue-600"
                              : "bg-gradient-to-r from-emerald-500 to-emerald-500"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div
                          className={`relative rounded-2xl px-4 py-3 shadow-sm ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                              : "bg-gray-50 border border-gray-200 text-gray-800"
                          }`}
                        >
                          {/* Message Content */}
                          {message.isLink ? (
                            <div
                              className={`pemerald pemerald-sm max-w-none ${
                                message.role === "user" ? "pemerald-invert" : ""
                              }`}
                              dangerouslySetInnerHTML={{
                                __html: linkify(message.content),
                              }}
                            />
                          ) : (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                h1: ({ children }) => (
                                  <h1 className="text-lg font-bold mb-2 mt-0">
                                    {children}
                                  </h1>
                                ),
                                h2: ({ children }) => (
                                  <h2 className="text-base font-semibold mb-2 mt-3">
                                    {children}
                                  </h2>
                                ),
                                h3: ({ children }) => (
                                  <h3 className="text-sm font-semibold mb-1 mt-2">
                                    {children}
                                  </h3>
                                ),
                                p: ({ children }) => (
                                  <p className="mb-2 last:mb-0 leading-relaxed">
                                    {children}
                                  </p>
                                ),
                                strong: ({ children }) => (
                                  <strong
                                    className={`font-semibold ${
                                      message.role === "user"
                                        ? "text-blue-100"
                                        : "text-emerald-700"
                                    }`}
                                  >
                                    {children}
                                  </strong>
                                ),
                                code: ({ children, ...props }) => (
                                  <code
                                    className={`px-2 py-1 rounded text-xs font-mono ${
                                      message.role === "user"
                                        ? "bg-blue-400/30 text-blue-100"
                                        : "bg-gray-200 text-gray-700"
                                    }`}
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                ),
                                ul: ({ children }) => (
                                  <ul className="list-disc ml-4 space-y-1 my-2">
                                    {children}
                                  </ul>
                                ),
                                ol: ({ children }) => (
                                  <ol className="list-decimal ml-4 space-y-1 my-2">
                                    {children}
                                  </ol>
                                ),
                                li: ({ children }) => (
                                  <li className="leading-relaxed">
                                    {children}
                                  </li>
                                ),
                                a: ({ href, children }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`underline font-medium hover:no-underline transition-all duration-200 ${
                                      message.role === "user"
                                        ? "text-blue-100 hover:text-white"
                                        : "text-emerald-600 hover:text-emerald-800"
                                    }`}
                                  >
                                    {children}
                                  </a>
                                ),
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          )}

                          {/* Message Tail */}
                          <div
                            className={`absolute top-4 ${
                              message.role === "user"
                                ? "right-[-6px] border-l-8 border-l-blue-500 border-t-4 border-b-4 border-t-transparent border-b-transparent"
                                : "left-[-6px] border-r-8 border-r-gray-50 border-t-4 border-b-4 border-t-transparent border-b-transparent"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Loading Indicator */}
                  {isLoading && (
                    <div className="flex justify-start mb-6">
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                          <div className="flex items-center gap-2">
                            <Loader2 className="animate-spin w-4 h-4 text-emerald-600" />
                            <span className="text-sm text-gray-600">
                              Typing...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={scrollRef}></div>
                </ScrollArea>
              </CardContent>

              {/* Input Footer */}
              <CardFooter className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="flex w-full items-center space-x-3">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      className="flex-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-full px-4 py-2 bg-white shadow-sm"
                      placeholder="Ask about our cakes, pricing, services..."
                      disabled={isLoading}
                    />
                    {isLoading ? (
                      <Button
                        className="h-10 w-10 rounded-full bg-gray-400 hover:bg-gray-500 shadow-sm"
                        type="button"
                        size="icon"
                        aria-label="Stop generating"
                        onClick={() => stop()}
                      >
                        <Square
                          className="h-4 w-4 animate-pulse"
                          fill="currentColor"
                        />
                      </Button>
                    ) : (
                      <Button
                        className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-500 hover:from-emerald-600 hover:to-emerald-600 shadow-sm hover:shadow-md transition-all duration-200"
                        type="submit"
                        size="icon"
                        disabled={isLoading || input.trim() === ""}
                        aria-label="Send message"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
