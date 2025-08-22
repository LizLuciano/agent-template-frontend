"use client";

import { useEffect, useRef, useState } from "react";
import Title from "@/components/Title";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, SendIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages = [
  { role: "assistant" as const, content: "Hello, how can I help you today?" },
  { role: "user" as const, content: "I have a question about the product" },
  { role: "assistant" as const, content: "I'm sorry, I can't help with that. Please contact our support team." },
];


export default function Chat() {
  const [config, setConfig] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (message: string) => {
    setMessages([...messages, { role: "user", content: message }]);
    setInput("");
  };

  useEffect(() => {
    const config = localStorage.getItem("config");
    if (config) {
      setConfig(JSON.parse(config));
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(input);
    }
  };

  return (
    <div className="min-h-screen grid grid-rows-[62px_auto_100px] gap-4 max-h-[100vh]">
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <Title
          label={config?.agent_name}
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <EllipsisVertical className="w-6 h-6 hover:bg-gray-100 rounded-full p-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Reset</DropdownMenuItem>
            <DropdownMenuItem>Delete Chat</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {
        !config && (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold">No configuration found</h1>
            <p className="text-sm text-gray-500 mt-1">Please configure the agent to start chatting</p>
            <Link href="/settings" className="flex items-center gap-2 hover:text-gray-500 mt-4 border border-gray-300 rounded-3xl px-4 py-1">
              <SettingsIcon className="w-4 h-4" /> Configure Agent
            </Link>
          </div>
        )
      }
      {
        config && (
          <div ref={scrollAreaRef} className="overflow-y-scroll flex flex-col gap-4 mr-4 max-h-[calc(100vh-195px)]">
            {messages.map((message, index) => (
              <div key={index} className={`px-4 py-2 max-w-[80%] rounded-full w-fit ${message.role === "assistant" ? "" : "bg-gray-100 ml-auto"}`}>
                {message.content}
              </div>
            ))}
          </div>
        )
      }

      <form onSubmit={() => handleSubmit(input)} className="flex items-center gap-2 border border-gray-300 rounded-3xl mr-4 mb-4 relative">
        <textarea placeholder="Type your message here..."
          disabled={!config}
          onKeyDown={handleKeyDown}
          value={input} onChange={handleInputChange} className="flex-1 h-full rounded-3xl p-3 text-sm resize-none" />
        <Button type="submit" className="px-4 py-2 rounded-3xl absolute right-2 cursor-pointer" disabled={!config}>
          <SendIcon className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
