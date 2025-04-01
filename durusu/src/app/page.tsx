"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileJson2, MailX,  ShieldUser } from "lucide-react";
import ChatWindow from "@/components/layout/chat-window";
import ChatInput from "@/components/forms/input";



interface MessageRole{
  ai?:any,
  user?:any
}

export default function ChatPage() {

  const [messages, setMessages] = useState<MessageRole[]>([]);

  const sendQuery = async (query:string) => {
    try {
      const response = await fetch(
        "http://localhost:8080/admin/userschat/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: query,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Couldn't send the message an error occured please try again"
        );
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { ai: data , user:query }]);
     
    } catch (error) {
      console.log(error);
    }
  };

  console.log(messages)

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      {/* welcome Chat Area */}

      {messages && messages.length > 0 ? (
          <div className="flex-1 flex flex-col h-screen max-h-[100vh] bg-white">
            {/* Main chat window - grows to take up available space */}
            <div className="flex-1 overflow-y-auto px-4 py-8 ">
              <ChatWindow messages={messages} />
            </div>
          
            <div className="flex items-center justify-center ">
              <div className="mb-4">
                <ChatInput sendQuery={sendQuery} />
              </div>
            </div>
          </div>
        ):
        (
          <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          {/* Chat bubble */}
          <div className="w-full max-w-2xl mb-6 flex flex-col items-center">
            <div className="bg-purple-500 w-14 h-14 rounded-full shadow-lg mb-4"></div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-1">
                Good Afternoon, Jason
              </h2>
              <p className="text-lg">
                What's on <span className="text-purple-500">your mind?</span>
              </p>
            </div>
          </div>

          {/* Input area */}
          <ChatInput sendQuery={sendQuery} />

          {/* Example suggestions */}
          <div className="w-full max-w-2xl mt-6">
            <p className="text-xs text-gray-500 mb-2">
              GET STARTED WITH AN EXAMPLE BELOW
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <ExampleCard
                icon={<ShieldUser />}
                text="Write a to-do list for a personal project"
              />
              <ExampleCard
                icon={<ShieldUser />}
                text="Generate an email to reply to a..."
              />
              <ExampleCard
                icon={<MailX />}
                text="Summarize this article in one..."
              />
              <ExampleCard
                icon={<FileJson2 />}
                text="How does..."
              />
            </div>
          </div>
          </main>
        )
      }

     

     

    </div>
  );
}

// Example card component
function ExampleCard({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
      <CardContent className="flex flex-col items-center p-4 text-center">
        <div className="mb-2">{icon}</div>
        <p className="text-sm">{text}</p>
      </CardContent>
    </Card>
  );
}
