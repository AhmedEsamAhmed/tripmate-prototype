"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import type { ChatMessage, UserRole } from "@/types";

interface ChatProps {
  messages: ChatMessage[];
  currentUserId: string;
  currentUserRole: UserRole;
  onSendMessage: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function Chat({
  messages,
  currentUserId,
  currentUserRole: _currentUserRole,
  onSendMessage,
  placeholder = "Type a message…",
  disabled = false,
}: ChatProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-8">
            No messages yet. Say hello to start the conversation.
          </p>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.senderId === currentUserId;
            const isSystem = msg.type === "system";
            if (isSystem) {
              return (
                <div
                  key={msg.id}
                  className="flex justify-center"
                >
                  <span className="rounded-lg bg-slate-200 px-3 py-2 text-xs text-slate-600 max-w-[85%] text-center">
                    {msg.content}
                  </span>
                </div>
              );
            }
            return (
              <div
                key={msg.id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-2.5
                    ${isOwn
                      ? "bg-primary-600 text-white rounded-br-md"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
                    }
                  `}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`mt-1 text-xs ${isOwn ? "text-primary-100" : "text-slate-400"}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
      {!disabled && (
        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-200 bg-white p-3 safe-bottom"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              maxLength={500}
            />
            <Button type="submit" variant="primary" disabled={!input.trim()}>
              Send
            </Button>
          </div>
          <p className="mt-1 text-xs text-slate-500 text-center">
            Phone and email are not shared. Chat only within ViaJalan.
          </p>
        </form>
      )}
    </div>
  );
}
