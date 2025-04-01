"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileJson2, MailX, Mic, Paperclip, Search, ShieldUser } from "lucide-react";

interface ChatInputProps {
    sendQuery : (query:string) => void
}

const ChatInput = ({sendQuery}: ChatInputProps) => {

    const [query, setQuery] = useState("");

     const handleQuerySend = (e: React.KeyboardEvent<HTMLTextAreaElement> ) => {
        if (e.key === "Enter") {
          if (e.ctrlKey) {
            setQuery((prev) => prev + "\n");
          } else {
            e.preventDefault();
            if (query.trim()) {
              sendQuery(query);
              setQuery("");
            }
          }
        }
      };

    return (
        <>
            <Card className="min-w-2xl max-w-3xl shadow-none">
                <CardContent className="">
                    <div className="flex items-start p-2">
                    <Button variant="ghost" size="icon">
                        <Paperclip size={20} />
                    </Button>
                    <Textarea
                        className="flex-1 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500 shadow-none border-b border-gray-100"
                        onKeyDown={handleQuerySend}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask AI a question or"
                    />
                    <div className="flex items-center gap-2 ml-auto">
                        <Button variant="ghost" size="icon">
                        <Mic size={20} />
                        </Button>
                    </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default ChatInput;