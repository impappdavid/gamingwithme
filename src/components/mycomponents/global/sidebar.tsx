import { CircleQuestionMark, House, Info, Languages, MessagesSquare, MonitorSmartphone, Music, Play, Swords, Users, Youtube } from "lucide-react"
import { NavLink } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

function Sidebar() {
    const baseClass = "flex gap-2 items-center  hover:text-white  p-2 rounded-lg transition-all duration-200";
    return (
        <>
            <div className="  xl:min-w-60 h-screen hidden sm:flex flex-col justify-between py-4">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center p-3 px-4">
                        <Play  className="w-5 h-5 text-green-500" />
                        <h1 className="text-lg font-semibold hidden xl:flex">GamingWithMe</h1>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <Tooltip>
                            <TooltipTrigger asChild className={`${baseClass} `}>
                                <NavLink to="../" className={({ isActive }) =>
                                    isActive
                                        ? `${baseClass} bg-zinc-800/80 hover:bg-zinc-800/80 text-white`
                                        : `${baseClass} text-zinc-400 hover:bg-zinc-800/80 hover:text-white`
                                }><House className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">Home</div></NavLink>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="xl:hidden">
                                <p>Home</p>
                            </TooltipContent>
                        </Tooltip>


                        <NavLink to="../players" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-zinc-800/80 hover:bg-zinc-800/80 text-white`
                                : `${baseClass} text-zinc-400 hover:bg-zinc-900 hover:text-white`
                        }>
                            <Users className="w-5 h-5" />
                            <div className="text-md font-medium hidden xl:flex">Players</div>
                        </NavLink>
                        <NavLink to="../just-chatting" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-zinc-800/80 hover:bg-zinc-800/80 text-white`
                                : `${baseClass} text-zinc-400 hover:bg-zinc-900 hover:text-white`
                        }>
                            <MessagesSquare className="w-5 h-5" />
                            <div className="text-md font-medium hidden xl:flex">Just Chatting</div>
                        </NavLink>
                        <NavLink to="../music" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-zinc-800/80 hover:bg-zinc-800/80 text-white`
                                : `${baseClass} text-zinc-400 hover:bg-zinc-900 hover:text-white`
                        }>
                            <Music className="w-5 h-5" />
                            <div className="text-md font-medium hidden xl:flex">Music</div>
                        </NavLink>
                        <NavLink to="../tiktok" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-zinc-800/80 hover:bg-zinc-800/80 text-white fill-white`
                                : `${baseClass} text-zinc-400 fill-zinc-400 hover:bg-zinc-900 hover:text-white`
                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="">
                                <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48" />
                            </svg>
                            <div className="text-md font-medium hidden xl:flex">Tiktok</div>
                        </NavLink>
                        <NavLink to="../youtube" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-zinc-800/80 hover:bg-zinc-800/80 text-white fill-white`
                                : `${baseClass} text-zinc-400 fill-zinc-400 hover:bg-zinc-900 hover:text-white`
                        }>
                            <Youtube className="w-5 h-5" />
                            <div className="text-md font-medium hidden xl:flex">Youtube</div>
                        </NavLink>
                        <NavLink to="../games" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-zinc-800/80 hover:bg-zinc-800/80 text-white fill-white`
                                : `${baseClass} text-zinc-400 fill-zinc-400 hover:bg-zinc-900 hover:text-white`
                        }><Swords className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">Games</div></NavLink>
                        
                    </div>
                    <div className="px-2">
                        <div className="h-[1.5px] w-full bg-zinc-900"></div>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <NavLink to="../app" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-zinc-800/80 hover:bg-zinc-800/80 text-white fill-white`
                                : `${baseClass} text-zinc-400 fill-zinc-400 hover:bg-zinc-900 hover:text-white`
                        }><MonitorSmartphone className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">App</div></NavLink>
                        <NavLink to="../faq" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-zinc-800/80 hover:bg-zinc-800/80 text-white fill-white`
                                : `${baseClass} text-zinc-400 fill-zinc-400 hover:bg-zinc-900 hover:text-white`
                        }><CircleQuestionMark className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">FAQ</div></NavLink>

                        <NavLink to="../about-us" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-zinc-800/80 hover:bg-zinc-800/80 text-white fill-white`
                                : `${baseClass} text-zinc-400 fill-zinc-400 hover:bg-zinc-900 hover:text-white`
                        }><Info className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">About us</div></NavLink>
                    </div>
                </div>
                <div className="p-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex gap-2 items-center cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-900 p-2 rounded-lg transition-all duration-200"><Languages className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">Languages</div></div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuGroup>
                                <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1">
                                    English
                                    <DropdownMenuShortcut>En</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1">
                                    Hungary
                                    <DropdownMenuShortcut>Hu</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1">
                                    Deutsch
                                    <DropdownMenuShortcut>De</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1">
                                    Spanish
                                    <DropdownMenuShortcut>Sp</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    )
}
export default Sidebar