import { Input } from "@/components/ui/input"
import Navbar from "../global/navbar"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"

import SignalRService from "../../../api/signalr"
import { useNavigate, useParams } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Menu } from "lucide-react"


function Content() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    interface ChatMessage {
        id: string;
        content: string;
        sender: string;
        senderId: boolean;
        time: string;
    }
    let params = useParams();



    let receiver = params.userId;

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const latestMessages = useRef<ChatMessage[] | null>(null);
    latestMessages.current = messages;
    const [selectedUser, setSelectedUser] = useState("Adam");

    // Get current user ID from localStorage or use a default for testing
    const [currentUserId, setCurrentUserId] = useState<string>('DF568793-F7F0-4D87-8F9E-E19047AE892C'); // Default for testing

    // Use the receiverId from props, or default to the hardcoded one for testing
    const targetUserId = receiver;

    const [showUserListDialog, setShowUserListDialog] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("This is the page slug", params.userId)
        // Get current user ID from localStorage or auth context
        const storedUserId = localStorage.getItem('currentUserId');
        if (storedUserId) {
            setCurrentUserId(storedUserId);
            console.log("Stored userId", storedUserId)
        }


    }, [currentUserId, targetUserId]);

    useEffect(() => {
        // Fetch chat history
        const fetchHistory = async () => {
            try {

                // Try the conversation endpoint first
                let response = await fetch(`https://localhost:7091/api/Message/conversation/${receiver}`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    console.log('Conversation endpoint failed, trying alternative...');
                    // Try alternative endpoint that might return messages between two users
                    response = await fetch(`https://localhost:7091/api/Message/conversation/${currentUserId}/${receiver}`, {
                        credentials: 'include'
                    });
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();


                // Check if data is an array
                if (!Array.isArray(data)) {
                    console.error('API returned non-array data:', typeof data, data);
                    return;
                }



                // Map the backend data to frontend format
                const mappedMessages = data.map((msg: any) => {
                    const isOwn = msg.senderId === currentUserId;
                    return {
                        id: msg.id,
                        content: msg.content,
                        sender: msg.senderName,
                        senderId: isOwn, // boolean
                        time: new Date(msg.sentAt).toLocaleTimeString(),
                    };
                });

                setMessages(mappedMessages);
            } catch (error) {
                console.error('Error fetching conversation history:', error);
            }
        };
        fetchHistory();

        // Start SignalR connection
        SignalRService.startConnection().then(() => {
            SignalRService.onReceiveMessage((message) => {

                // Handle both string messages (current backend) and full objects (expected)
                let mappedMessage;

                if (typeof message === 'string') {
                    // Backend is sending just the message content as string
                    // We can't determine sender/receiver from just a string, so show it to both users
                    mappedMessage = {
                        id: Date.now().toString(), // temporary ID
                        content: message,
                        sender: 'Unknown', // will be updated when backend sends proper object
                        senderId: false, // not own message
                        time: new Date().toLocaleTimeString(),
                    };

                    // Add the message to the chat immediately for both users
                    const prevMessages = latestMessages.current ?? [];
                    const updatedMessages = [...prevMessages, mappedMessage];
                    setMessages(updatedMessages);
                } else {
                    // Backend is sending full message object (expected behavior)
                    mappedMessage = {
                        id: message.id,
                        content: message.content,
                        sender: message.senderName,
                        senderId: message.senderId === currentUserId, // boolean
                        time: new Date(message.sentAt).toLocaleTimeString(),
                    };

                    const isRelevant =
                        (message.senderId && message.receiverId === targetUserId) ||
                        (message.senderId && message.receiverId === currentUserId);



                    if (isRelevant) {
                        const prevMessages = latestMessages.current ?? [];
                        const updatedMessages = [...prevMessages, mappedMessage];
                        setMessages(updatedMessages);
                    }
                }
            });
        }).catch(error => {
            console.error('SignalR connection failed:', error);
        });

        // Cleanup on component unmount
        return () => {
            SignalRService.stopConnection();
        }
    }, [currentUserId, targetUserId]); // Re-run effect if the recipient changes

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = (e: any) => {
        e.preventDefault();
        if (message.trim() !== "") {
            console.log('Sending message:', {
                content: message,
                receiverId: receiver
            });

            // Add the message immediately to the sender's chat
            const sentMessage = {
                id: Date.now().toString(),
                content: message,
                sender: 'You', // or get actual user name
                senderId: true, // always own message
                time: new Date().toLocaleTimeString(),
            };

            const prevMessages = latestMessages.current ?? [];
            const updatedMessages = [...prevMessages, sentMessage];
            setMessages(updatedMessages);

            if (typeof targetUserId === "string" && typeof message === "string") {
                SignalRService.sendMessage(targetUserId, message);
            }
            setMessage("");
        }
    }

    const users = [
        { id: 'DF568793-F7F0-4D87-8F9E-E19047AE892C', name: "Adam", avatar: "/profile/25.jpg", lastMessage: "Same here! Want to play together later?", time: "2:35 PM", unread: 0, online: true },
        { id: '3406F2AE-3436-4E42-8D93-7F0994526507', name: "Davee", avatar: "/profile/15.jpg", lastMessage: "Are you free tonight?", time: "1:20 PM", unread: 2, online: true },
        { id: 'user3-id', name: "Mike", avatar: "/profile/8.jpg", lastMessage: "Thanks for the game!", time: "12:45 PM", unread: 0, online: false },
        { id: 'user4-id', name: "Emma", avatar: "/profile/32.jpg", lastMessage: "Let's play Valorant", time: "11:30 AM", unread: 1, online: true },
        { id: 'user5-id', name: "John", avatar: "/profile/45.jpg", lastMessage: "Great match!", time: "Yesterday", unread: 0, online: false },
    ]

    return (
        <>
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full h-full max-h-screen bg-zinc-950 sm:rounded-2xl border border-zinc-800 sm:overflow-y-hidden relative">
                    <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Chat")} />
                    </div>
                    <div className="w-full h-full flex ">
                        {/* Main Chat Area */}
                        <div className="flex-1 flex flex-col min-h-0 ">
                            {/* Chat Header */}
                            <div className="p-2 flex gap-3 mt-16 border-b border-zinc-800 bg-zinc-900/50 flex-shrink-0 items-center">
                                {/* Show user list button on small screens */}
                                <button
                                    className="block lg:hidden p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white mr-2"
                                    onClick={() => setShowUserListDialog(true)}
                                    aria-label="Show user list"
                                >
                                    <Menu size={24} />
                                </button>
                                <img src="/profile/25.jpg" alt="profile" className="w-12 h-12 rounded-xl border-2 border-zinc-700" />
                                <div className="flex flex-col justify-center">
                                    <div className="text-xl font-semibold text-white">{selectedUser}</div>
                                    <div className="flex gap-1">
                                        <div className="bg-[#ff4654] p-1 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                                <path fill="#fff" d="M23.792 2.152a.25.25 0 0 0-.098.083q-5.077 6.345-10.15 12.69c-.107.093-.025.288.119.265c2.439.003 4.877 0 7.316.001a.66.66 0 0 0 .552-.25l2.324-2.903a.72.72 0 0 0 .144-.49c-.002-3.077 0-6.153-.003-9.23c.016-.11-.1-.206-.204-.167zM.077 2.166c-.077.038-.074.132-.076.205q.002 4.612.001 9.225a.68.68 0 0 0 .158.463l7.64 9.55c.12.152.308.25.505.247c2.455 0 4.91.003 7.365 0c.142.02.222-.174.116-.265C10.661 15.176 5.526 8.766.4 2.35c-.08-.094-.174-.272-.322-.184z" />
                                            </svg>
                                        </div>
                                        <div className="bg-[#de9b35] p-1 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                                <path fill="#000" d="M21.71 3.235a.02.02 0 0 1-.022-.022c.002-.081.004-.37.005-.424c0-.129-.143-.183-.212-.083l-.229.333a.02.02 0 0 1-.02.01h-6.55a.047.047 0 0 1-.048-.046l-.013-.177a.048.048 0 0 1 .056-.048l.335.032a.06.06 0 0 0 .063-.045l.244-.989a.05.05 0 0 0-.03-.054l-.227-.085a.04.04 0 0 1-.026-.03c-.041-.171-.377-1.323-1.993-1.58c-.787-.125-1.302.21-1.577.478a1.6 1.6 0 0 0-.302.41l-.097.212a2 2 0 0 0-.046.234l.051.982a.11.11 0 0 0 .043.085l.354.153l-.196.325a.055.055 0 0 1-.053.04s-.417.01-.622.02c-.386.015-1.245.485-1.878 1.838l-.724 1.55a.07.07 0 0 1-.068.04l-.578.001c-.035 0-.073.028-.088.06L6.364 9a.11.11 0 0 0 .017.108l.627.392a.06.06 0 0 1 .02.058l-.328.967a.2.2 0 0 1-.023.062l-.435.382a.1.1 0 0 0-.035.06l-.598 1.53a.06.06 0 0 1-.06.045l-.336.002a.163.163 0 0 0-.162.149l-.201 2.288l-.016.121l-.158.908a.13.13 0 0 1-.034.055l-.558.427a4.8 4.8 0 0 0-.767 1.001l-1.86 3.924a.8.8 0 0 0-.078.322l.132.235c.002.084-.032.456-.07.53l-.624 1.09a.1.1 0 0 0-.003.085l.03.07l.094.187L2.829 24c.118.011.247-.14.251-.3l.103-1.297l-.027-.195l3.606-4.232c.095-.114.222-.317.286-.45l1.719-3.79a.17.17 0 0 1 .1-.088l.109-.035a.17.17 0 0 1 .183.053c.15.181.504.781.676 1.032c.143.208.85 1.23 1.158 1.567c.086.093.349.198.466.27a.083.083 0 0 1 .03.112l-1.03 1.808l-.455 2.136a1 1 0 0 0-.036.152l-.412 1.483c.003.188-.14.286-.153.507l-.15 1.084a.06.06 0 0 0 .059.061l2.544.014q.142-.001.286-.006l.075-.007c.124-.016.563-.076.75-.15a.6.6 0 0 0 .227-.13c.185-.194.2-.278.203-.398a.3.3 0 0 0-.028-.105a.12.12 0 0 0-.06-.047l-1.18-.356a.37.37 0 0 1-.19-.134l-.317-.47a.09.09 0 0 1 .018-.097l.618-.609a.2.2 0 0 0 .048-.072l1.904-4.488c.089-.285.059-.605 0-.944c-.044-.25-.686-1.326-.854-1.624l-1.286-2.251c-.079-.138-.19-.133-.228-.276l-.073-1.118a.04.04 0 0 1 .036-.05l.33-.028a.1.1 0 0 0 .075-.048l1.147-2.155a.1.1 0 0 0-.002-.094l-.235-.29a.09.09 0 0 1-.001-.088l.352-.38a.054.054 0 0 1 .073-.02l.934.526a.4.4 0 0 0 .186.05c.26-.001.686-.154.908-.29a.4.4 0 0 0 .139-.148l.458-1.07c.006-.014.027-.012.03.003l.127.595a.064.064 0 0 0 .079.05l1.35-.3a.066.066 0 0 0 .05-.078l-.319-1.344a.07.07 0 0 1 .01-.054l.13-.203a.3.3 0 0 0 .037-.082l.159-.725a.04.04 0 0 1 .04-.032l3.732.005a.09.09 0 0 0 .093-.093v-.634a.02.02 0 0 1 .022-.021h1.439a.047.047 0 0 0 .046-.047V3.28a.047.047 0 0 0-.046-.047h-1.44z" />
                                            </svg>
                                        </div>
                                        <div className="bg-[#FF0000] p-1 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                                <path fill="#fff" d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Messages Area */}
                            <div className="flex-1 p-2 overflow-y-auto bg-zinc-950 min-h-0 max-h-[746px]">
                                <div className="space-y-4">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`flex gap-3 ${msg.senderId ? 'justify-end' : ''}`}>
                                            {!(msg.senderId) && (
                                                <img src="/profile/25.jpg" alt={msg.sender} className="w-10 h-10 rounded-full flex-shrink-0" />
                                            )}
                                            <div className={`rounded-xl p-2 px-3 max-w-xs ${msg.senderId ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                                                <p className="text-white text-sm">{msg.content}</p>
                                                <p className={`text-xs mt-1 ${msg.senderId ? 'text-blue-200' : 'text-zinc-400'}`}>{msg.time}</p>
                                            </div>

                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Message Input Area */}
                            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 flex-shrink-0">
                                <div className="flex gap-3">
                                    <Input
                                        placeholder="Type a message..."
                                        className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <Button
                                        className="bg-blue-600 hover:bg-blue-700"
                                        onClick={handleSendMessage}
                                    >
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* User List Sidebar */}
                        <div className="w-80 border-l mt-16 border-zinc-800 bg-zinc-900/30 hidden lg:block overflow-y-auto">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white mb-4">Conversations</h3>
                                <div className="space-y-2">
                                    {users.map((user) => (
                                        <div
                                            key={user.id}
                                            className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedUser === user.name
                                                ? 'bg-zinc-700 border-l-4 border-blue-500'
                                                : 'bg-zinc-800 hover:bg-zinc-700'
                                                }`}
                                            onClick={() => {
                                                setSelectedUser(user.name);
                                                navigate(`/chat/${user.id}`);
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <img
                                                        src={user.avatar}
                                                        alt={user.name}
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-zinc-900 ${user.online ? 'bg-green-500' : 'bg-gray-500'
                                                        }`}></div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-sm font-medium text-white truncate">{user.name}</h4>
                                                        <span className="text-xs text-zinc-400">{user.time}</span>
                                                    </div>
                                                    <p className="text-xs text-zinc-400 truncate">{user.lastMessage}</p>
                                                </div>
                                                {user.unread > 0 && (
                                                    <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                        {user.unread}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default Content




