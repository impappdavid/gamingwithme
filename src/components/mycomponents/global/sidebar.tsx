import { BadgeCheck, CircleQuestionMark, Gamepad2, House, Info, Languages, MessagesSquare, Music, Play, Plus, Swords, Youtube } from "lucide-react"
import { NavLink } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "react-i18next";
import '../../../i18n';
import { useState } from "react";

function Sidebar() {
    const { t, i18n } = useTranslation();
    const [isCreator, setIsCreator] = useState(false);
    const baseClass = "flex gap-2 items-center  p-2 rounded-lg transition-all duration-200";
    return (
        <>
            <div className="  xl:min-w-60 h-screen hidden sm:flex flex-col justify-between py-4">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center p-3 px-4">
                        <Play className="w-5 h-5 text-green-500" />
                        <h1 className="text-lg font-semibold hidden xl:flex">GamingWithMe</h1>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? `${baseClass} bg-green-500/20 text-green-500`
                                    : `${baseClass} text-green-500/60 hover:text-green-500`
                            }
                        >
                            <House className="w-5 h-5" />
                            <div className="text-md font-medium hidden xl:flex">{t("home")}</div>
                        </NavLink>




                        <NavLink to="../players" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-green-500/20 text-green-500`
                                : `${baseClass} text-green-500/60  hover:text-green-500`
                        }>
                            <Gamepad2 className="w-5 h-5" />
                            <div className="text-md font-medium hidden xl:flex">{t("Players")}</div>
                        </NavLink>
                        <NavLink to="../just-chatting" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-green-500/20 text-green-500`
                                : `${baseClass} text-green-500/60  hover:text-green-500`
                        }>
                            <MessagesSquare className="w-5 h-5" />
                            <div className="text-md font-medium hidden xl:flex">{t("JustChatting")}</div>
                        </NavLink>
                        <NavLink to="../music" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-green-500/20 text-green-500`
                                : `${baseClass} text-green-500/60  hover:text-green-500`
                        }>
                            <Music className="w-5 h-5" />
                            <div className="text-md font-medium hidden xl:flex">{t("Music")}</div>
                        </NavLink>
                        <NavLink to="../tiktok" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-green-500/20 text-green-500  fill-green-500`
                                : `${baseClass} text-green-500/60  hover:text-green-500 fill-green-500/60 hover:fill-green-500`
                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="">
                                <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48" />
                            </svg>
                            <div className="text-md font-medium hidden xl:flex">Tiktok</div>
                        </NavLink>
                        <NavLink to="../youtube" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-green-500/20 text-green-500  fill-green-500`
                                : `${baseClass} text-green-500/60  hover:text-green-500`
                        }>
                            <Youtube className="w-5 h-5" />
                            <div className="text-md font-medium hidden xl:flex">Youtube</div>
                        </NavLink>
                        <NavLink to="../games" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-green-500/20 text-green-500  fill-green-500`
                                : `${baseClass} text-green-500/60  hover:text-green-500 `
                        }><Swords className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">{t("Games")}</div></NavLink>

                    </div>
                    <div className="px-2">
                        <div className="h-[1.5px] w-full bg-zinc-900"></div>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        {isCreator ? (
                            <div className={`${baseClass} bg-green-500/20 cursor-pointer border border-dashed border-green-500/50 text-green-500 hover:bg-green-500/30`}>
                                <Plus className="w-5 h-5"/>
                                <div className="text-md font-medium hidden xl:flex">{t("Create listing")}</div>
                            </div>
                        ): (
                            <NavLink to = "" onClick={()=> setIsCreator(!isCreator)} className = {`${baseClass} bg-green-500/20 border border-dashed border-green-500/50 text-green-500 hover:bg-green-500/30`}><BadgeCheck className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">{t("Become")}</div></NavLink>

                        )}

                </div>
                <div className="px-2">
                    <div className="h-[1.5px] w-full bg-zinc-900"></div>
                </div>
                <div className="flex flex-col gap-1 p-2">
                    <NavLink to="../faq" className={({ isActive }) =>
                        isActive
                            ? `${baseClass} bg-green-500/20 text-green-500  fill-green-500`
                            : `${baseClass} text-green-500/60  hover:text-green-500`
                    }><CircleQuestionMark className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">FAQ</div></NavLink>

                    <NavLink to="../about-us" className={({ isActive }) =>
                        isActive
                            ? `${baseClass} bg-green-500/20 text-green-500  fill-green-500`
                            : `${baseClass} text-green-500/60  hover:text-green-500`
                    }><Info className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">{t("About")}</div></NavLink>
                </div>
            </div>
            <div className="p-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex gap-2 items-center cursor-pointer text-green-500/60  hover:text-green-500 hover:bg-zinc-900 p-2 rounded-lg transition-all duration-200"><Languages className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">{t("Languages")}</div></div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
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
            </div>
        </div >
        </>
    )
}
export default Sidebar