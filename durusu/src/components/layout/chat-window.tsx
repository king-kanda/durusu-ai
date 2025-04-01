import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface MessageRole {
    ai?: any;
    user?: any;
  }

interface ChatWindowProps {
    messages : MessageRole[]
}

const ChatWindow = ({messages}:ChatWindowProps) => {
    return (
        <div className="container px-12">
            {messages.map((msg, index) => (
                <div key={index} className="flex flex-col gap-4">
                    {/* user bubble */}
                    <div className="flex items-center gap-4 justify-end bg-gray-200 p-4 rounded-md w-fit mt-6">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        {msg.user}
                    </div>
                    {/* ai bubble */}
                    <div className="flex justify-start">
                        {msg.ai}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChatWindow;