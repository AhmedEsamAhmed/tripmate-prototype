"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Chat } from "@/components/chat/Chat";
import { MOCK_CHAT_MESSAGES } from "@/lib/mock-data";
import type { ChatMessage } from "@/types";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);

  const handleSend = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        senderId: "u1",
        senderRole: "traveler",
        type: "user",
        content,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="mobile-container flex h-screen flex-col bg-white">
      <Header title="Chat" backHref="/traveler" />
      <div className="flex-1 min-h-0 overflow-hidden">
        <Chat
          messages={messages}
          currentUserId="u1"
          currentUserRole="traveler"
          onSendMessage={handleSend}
          placeholder="Type a message…"
        />
      </div>
    </div>
  );
}
