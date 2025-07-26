import { NavLink } from "react-router-dom"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { BadgeCheck, CircleQuestionMark, House, Info, Menu, MessagesSquare, Music, Play, Plus, Swords, Users, X, Youtube } from "lucide-react"
import { useState } from "react";
import { useTranslation } from "react-i18next";

function DrawerMenu() {
    // Used for highlight toggle of creator button (demo toggler)
    const [isCreator, setIsCreator] = useState(false);
    const { t } = useTranslation()
    const baseClass = "flex gap-2 items-center  p-2 rounded-lg transition-all duration-200"

    return (
        <>
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
                                {/* Tiktok icon */}
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
                                {/* Demo: Become/Listing toggle */}
                                {isCreator ? (
                                    <NavLink to={"/create-listing"} className={`${baseClass} bg-[#1aff00c0] cursor-pointer border border-dashed border-green-500/50 text-black hover:bg-[#19FF00]`}>
                                        <Plus className="w-5 h-5" />
                                        {/* Typo fix: "Create listing" */}
                                        <div className="text-md font-medium hidden xl:flex">Create listing</div>
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
        </>
    )
}
export default DrawerMenu
