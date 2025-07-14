import Navbar from "../global/navbar"
import { useTranslation } from "react-i18next"
import { useState } from "react"

import { useNavigate} from "react-router-dom"



function Content() {
    const { t } = useTranslation()
    const navigate = useNavigate()
   

    const [selectedUser, setSelectedUser] = useState("Adam");


    

   

    

   

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
                        

                        {/* User List Sidebar */}
                        <div className="w-full border-l border-zinc-800 bg-zinc-900/30 hidden lg:block overflow-y-auto">
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