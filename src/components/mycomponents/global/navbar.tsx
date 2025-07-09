import { BadgeCheck, Bell, CircleQuestionMark, Download, Headset, House, Info, Languages, LogOut, Menu, MessageSquare, MessagesSquare, Music, Play, Plus, Settings, Swords, User, Users, X, Youtube } from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useNavigate, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"

import { useTranslation } from "react-i18next"
import { useState } from "react"

// User type
type User = {
    name: string;
    profilePic: string;
    games: string[];
    cost: string;
    active: boolean;
};

type NavbarProps = {
    page: string;
};

function Navbar({ page }: NavbarProps) {
    let loggedin = localStorage.getItem('signedin')
    const navigate = useNavigate();
    const baseClass = "flex gap-2 items-center  p-2 rounded-lg transition-all duration-200"

    const [isCreator, setIsCreator] = useState(false);

    const { t, i18n } = useTranslation()

    return (
        <>
            <div className="flex justify-between p-4 items-center bg-zinc-950 border-b border-zinc-800">
                <div className="text-xl font-semibold hidden sm:flex">{page}</div>


                <div className="flex sm:hidden">
                    <Drawer direction="left">
                        <DrawerTrigger asChild >
                            <div className="sm:w-60 rounded-lg h-9 w-9 bg-zinc-900/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                                <Menu className="w-5 h-5" />
                            </div>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                                <DrawerHeader className="flex justify-between items-center">
                                    <DrawerTitle className="text-md flex gap-2 items-center">
                                        <Play className="w-5 h-5 text-green-500" />
                                        <h1 className="text-xl">GamingWithMe</h1>
                                    </DrawerTitle>
                                    <DrawerDescription className="flex items-center">
                                        <DrawerClose>
                                            <X className="w-5 h-5" />
                                        </DrawerClose>
                                    </DrawerDescription>
                                </DrawerHeader>
                                <div className=" flex flex-col gap-1">
                                    <NavLink to="../" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                            : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`
                                    }><House className="w-5 h-5 text-[#2856F4]" /> <div className="text-md font-medium">{t("home")}</div></NavLink>
                                    <NavLink to="../players" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                            : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`
                                    }>
                                        <Users className="w-5 h-5 text-[#2856F4]" />
                                        <div className="text-md font-medium ">{t("Players")}</div>
                                    </NavLink>
                                    <NavLink to="../just-chatting" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                            : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`
                                    }>
                                        <MessagesSquare className="w-5 h-5 text-[#2856F4]" />
                                        <div className="text-md font-medium">{t("JustChatting")}</div>
                                    </NavLink>
                                    <NavLink to="../music" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                            : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`
                                    }>
                                        <Music className="w-5 h-5 text-[#2856F4]" />
                                        <div className="text-md font-medium ">{t("Music")}</div>
                                    </NavLink>
                                    <NavLink to="../tiktok" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                            : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0] fill-[#19FF00] hover:fill-[#1aff00c0]`
                                    }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-[#2856F4]">
                                            <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48" />
                                        </svg>
                                        <div className="text-md font-medium ">Tiktok</div>
                                    </NavLink>
                                    <NavLink to="../youtube" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                            : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`}>
                                        <Youtube className="w-5 h-5 text-[#2856F4]" />
                                        <div className="text-md font-medium ">Youtube</div>
                                    </NavLink>
                                    <NavLink to="../games" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                            : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`
                                    }><Swords className="w-5 h-5 text-[#2856F4]" /> <div className="text-md font-medium  ">{t("Games")}</div></NavLink>
                                    <div className="px-2 py-1.5">
                                        <div className="h-[2px] w-full bg-zinc-900"></div>
                                    </div>
                                    <div className="flex flex-col gap-1 p-2 ">
                                        {isCreator ? (
                                            <NavLink to={"/create-listing"} className={`${baseClass} bg-[#1aff00c0] cursor-pointer border border-dashed border-green-500/50 text-black hover:bg-[#19FF00]`}>
                                                <Plus className="w-5 h-5" />
                                                <div className="text-md font-medium hidden xl:flex">Crete listing</div>
                                            </NavLink>
                                        ) : (
                                            <NavLink to="" onClick={() => setIsCreator(!isCreator)} className={`${baseClass} bg-[#1aff00c0] border border-dashed border-green-500/50 text-black hover:bg-[#19FF00]`}><BadgeCheck className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">{t("Become")}</div></NavLink>

                                        )}

                                    </div>
                                    <div className="px-2 py-1.5">
                                        <div className="h-[2px] w-full bg-zinc-900"></div>
                                    </div>
                                    <NavLink to="../faq" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                            : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`
                                    }><CircleQuestionMark className="w-5 h-5 text-[#2856F4]" /> <div className="text-md font-medium ">FAQ</div></NavLink>

                                    <NavLink to="../about-us" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                            : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`
                                    }><Info className="w-5 h-5 text-[#2856F4]" /> <div className="text-md font-medium">{t("About")}</div></NavLink>

                                </div>

                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>


                <div className="flex gap-2">


                    {loggedin?.length != undefined ? (
                        <>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="relative rounded-lg h-9 w-9 bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                                        <Bell className="w-5 h-5" />
                                        <div className="absolute -top-1 -right-1">
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500/80"></span>
                                            </span>
                                        </div>
                                    </div>

                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[700px] sm:min-h-[800px] min-h-[700px] max-h-[800px] flex flex-col ">
                                    <DialogHeader>
                                        <DialogTitle className="flex justify-between">

                                            {t("Notification")}
                                            <DialogClose>
                                                <X className="w-5 h-5 cursor-pointer" />
                                            </DialogClose>
                                        </DialogTitle>

                                        <DialogDescription>
                                            <div className="flex flex-col border-t">
                                                <div className=" hover:bg-zinc-900/40 cursor-pointer flex flex-col gap-2 p-2 py-3 border-b">
                                                    <div className="flex justify-between">
                                                        <div className="flex gap-2 items-center">
                                                            <img src="/profile/25.jpg" alt="" className="w-13 h-13 rounded-md" />
                                                            <div className="flex flex-col">
                                                                <div className="text-white text-lg text-start">Ethan</div>
                                                                <div className="text-sm text-start">
                                                                    <span className="text-blue-500">Ethan</span> {t("bought")}
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className=" hover:bg-zinc-900/40 cursor-pointer flex flex-col gap-2 p-2 py-3 border-b">
                                                    <div className="flex justify-between">
                                                        <div className="flex gap-2 items-center">
                                                            <img src="/profile/95.jpg" alt="" className="w-13 h-13 rounded-md" />
                                                            <div className="flex flex-col">
                                                                <div className="text-white text-lg text-start">GamingWithMe</div>
                                                                <div className="text-sm text-start">
                                                                    {t("update")}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </DialogDescription>

                                    </DialogHeader>

                                </DialogContent>
                            </Dialog >

                            <div className="relative rounded-lg h-9 w-9 bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                                <MessageSquare className="w-5 h-5" />
                                <div className="absolute -top-1 -right-1">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500/80"></span>
                                    </span>
                                </div>
                            </div>


                            <div className="relative rounded-lg h-9 w-9 bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                                <Download className="w-5 h-5" />

                            </div>

                            <div className="relative rounded-lg h-9 w-9 bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                                <Headset className="w-5 h-5" />

                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="relative rounded-lg h-9 w-9 bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                                        <Languages className="w-5 h-5" />

                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1" onClick={() => i18n.changeLanguage('en')}>
                                            {t("English")}
                                            <DropdownMenuShortcut>En</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1" onClick={() => i18n.changeLanguage('hu')}>
                                            {t("Hungary")}
                                            <DropdownMenuShortcut>Hu</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1" onClick={() => i18n.changeLanguage('de')}>
                                            {t("Deutsch")}
                                            <DropdownMenuShortcut>De</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1" onClick={() => i18n.changeLanguage('sp')}>
                                            {t("Spanish")}
                                            <DropdownMenuShortcut>Sp</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="flex items-center">
                                    <img src="/profile/9.jpg" className=" rounded-lg h-9.5 w-9.5 border flex gap-2 text-zinc-400 items-center  cursor-pointer transition-all duration-200" />

                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-36" align="end">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1 items-center" onClick={() => navigate('/profile/james')}>
                                            <User className="w-5 h-5" />
                                            {t("profile")}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1" onClick={() => navigate('/settings/general')}>
                                            <Settings />
                                            {t("settings")}
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => { localStorage.clear(); navigate('/') }} className="text-red-500 hover:text-red-500 hover:bg-red-500/20 flex gap-2">
                                            <LogOut className="text-red-500" />
                                            {t("logout")}
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                </DropdownMenuContent>
                            </DropdownMenu>


                        </>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <Button onClick={() => navigate('/login')} className="h-9 bg-green-500/10 border border-green-500/60 text-green-500 hover:border-green-500/80 hover:bg-green-500/20 cursor-pointer" >Login</Button>
                            <Button onClick={() => navigate('/registration')} className="h-9 bg-green-500  text-black  hover:bg-green-500/80 cursor-pointer">Registration</Button>
                        </div>
                    )}
                </div>

            </div>

        </>
    )
}
export default Navbar