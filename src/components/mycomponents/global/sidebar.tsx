import { BadgeCheck, Gamepad2, House, Info, MessagesSquare, Music, Plus, Search, Swords, Youtube } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useMemo, useState } from "react"
import SearchUserCard from "./searchUsercard"
import TopCreators from "./topCreators"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next";
import '../../../i18n';
import { Input } from "@/components/ui/input"
// User type
type User = {
    name: string;
    profilePic: string;
    games: string[];
    cost: string;
    active: boolean;
};



function Sidebar() {
    const { t } = useTranslation();
    const [isCreator, setIsCreator] = useState(false);
    const baseClass = "flex gap-2 items-center  p-2 rounded-lg transition-all duration-200";
    const users: User[] = useMemo(() => {
        const baseUsers: User[] = [
            { name: "IAmLiam", profilePic: "/profile/7.jpg", games: ["valorant", "csgo", "just-chatting", "minecraft"], cost: "$0.99/game", active: true },
            { name: "Noah", profilePic: "/profile/104.jpg", games: ["youtube"], cost: "$1.99/1h", active: false },
            { name: "Ava", profilePic: "/profile/58.jpg", games: ["fortnite"], cost: "$4.99/30m", active: true },
            { name: "Isla", profilePic: "/profile/35.jpg", games: ["just-chatting"], cost: "$2.99/s", active: false },
            { name: "Ethan", profilePic: "/profile/17.jpg", games: ["just-chatting"], cost: "$4.99/s", active: true },
            { name: "Maya", profilePic: "/profile/48.jpg", games: ["valorant", "minecraft"], cost: "$14.99/1h", active: false },
            { name: "Alex", profilePic: "/profile/15.jpg", games: ["tiktok"], cost: "$9.99/video", active: true },
            { name: "Peter", profilePic: "/profile/77.jpg", games: ["minecraft"], cost: "$5.99/30m", active: false },
            { name: "Ben", profilePic: "/profile/82.jpg", games: ["musician"], cost: "$14.99/s", active: true },
            { name: "Ash", profilePic: "/profile/52.jpg", games: ["musician"], cost: "$14.99/s", active: false },
        ];
        // Add more users up to 116.jpg
        for (let i = 1; i <= 116; i++) {
            baseUsers.push({
                name: `User${i}`,
                profilePic: `/profile/${i}.jpg`,
                games: ["valorant", "minecraft"],
                cost: `$${(Math.random() * 20 + 1).toFixed(2)}/game`,
                active: i % 2 === 0 // alternate active status
            });
        }
        return baseUsers;
    }, []);

    // Filter state
    const [filterText, setFilterText] = useState("");


    // Filtering logic
    const filteredUsers = useMemo(() => {
        let filtered = users.filter(user => {
            // Text filter (name or game)
            const textMatch =
                filterText === "" ||
                user.name.toLowerCase().includes(filterText.toLowerCase()) ||
                user.games.some(game => game.toLowerCase().includes(filterText.toLowerCase()));
            ;
            // Active filter
            const activeOk = user.active;
            return textMatch && activeOk;
        });

        return filtered;
    }, [users, filterText]);
    return (
        <>
            <div className="  xl:min-w-60 h-screen hidden sm:flex flex-col justify-between py-4">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center p-3 px-4">
                        <img src="/logo.png" alt="" className="w-8 h-8" />
                        <h1 className="text-lg font-semibold hidden xl:flex">GamingWithMe</h1>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <div className="mb-2">
                            <Dialog>
                                <DialogTrigger asChild className="">
                                    <div className=" rounded-lg h-9  bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                                        <Search className="w-5 h-5" />
                                        <div className="text-sm hidden sm:flex">{t("Search")}...</div>
                                    </div>

                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[700px] sm:min-h-[800px] sm:max-h-[800px] min-h-[700px] max-h-[700px] overflow-y-scroll sm:overflow-hidden flex flex-col ">
                                    <DialogHeader>
                                        <DialogTitle className="flex justify-between gap-4">
                                            <Input type="text" placeholder={t("Search")} className="font-normal placeholder:text-sm text-sm" value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                                            <DialogClose className="text-sm text-zinc-400 underline cursor-pointer hover:text-white transition-all duration-300">{t("close")}</DialogClose>
                                        </DialogTitle>
                                        <div className="h-[1px] bg-zinc-800"></div>
                                        <DialogDescription className="h-full">
                                            {filterText.length > 0 ? (
                                                <SearchUserCard users={filteredUsers} />
                                            ) : (
                                                <div className="flex flex-col gap-2">
                                                    <div className="text-start">{t("TopCreators")}</div>
                                                    <TopCreators users={users} />
                                                </div>
                                            )}
                                        </DialogDescription>

                                    </DialogHeader>

                                </DialogContent>
                            </Dialog >
                        </div>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? `${baseClass} bg-[#19FF00] text-black`
                                    : `${baseClass} text-[#19FF00] hover:text-green-500`
                            }
                        >
                            <House className="w-5 h-5 text-[#2856F4]" />
                            <div className="text-md font-medium hidden xl:flex">{t("home")}</div>
                        </NavLink>




                        <NavLink to="../players" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black`
                                : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`
                        }>
                            <Gamepad2 className="w-5 h-5 text-[#2856F4]" />
                            <div className="text-md font-medium hidden xl:flex">{t("Players")}</div>
                        </NavLink>
                        <NavLink to="../just-chatting" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black`
                                : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`
                        }>
                            <MessagesSquare className="w-5 h-5 text-[#2856F4]" />
                            <div className="text-md font-medium hidden xl:flex">{t("JustChatting")}</div>
                        </NavLink>
                        <NavLink to="../music" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black`
                                : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`
                        }>
                            <Music className="w-5 h-5 text-[#2856F4]" />
                            <div className="text-md font-medium hidden xl:flex">{t("Music")}</div>
                        </NavLink>
                        <NavLink to="../tiktok" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0] fill-[#19FF00] hover:fill-[#1aff00c0]`
                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-[#2856F4]">
                                <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48" />
                            </svg>
                            <div className="text-md font-medium hidden xl:flex">Tiktok</div>
                        </NavLink>
                        <NavLink to="../youtube" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`
                        }>
                            <Youtube className="w-5 h-5 text-[#2856F4]" />
                            <div className="text-md font-medium hidden xl:flex">Youtube</div>
                        </NavLink>
                        <NavLink to="../games" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0] `
                        }><Swords className="w-5 h-5 text-[#2856F4]" /> <div className="text-md font-medium hidden xl:flex">{t("Games")}</div></NavLink>

                    </div>
                    <div className="px-2">
                        <div className="h-[1.5px] w-full bg-zinc-900"></div>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        {isCreator ? (
                            <NavLink to={"/create-listing"} className={`${baseClass} bg-[#1aff00c0] cursor-pointer border border-dashed border-green-500/50 text-black hover:bg-[#19FF00]`}>
                                <Plus className="w-5 h-5" />
                                <div className="text-md font-medium hidden xl:flex">{t("Create listing")}</div>
                            </NavLink>
                        ) : (
                            <NavLink to="" onClick={() => setIsCreator(!isCreator)} className={`${baseClass} bg-[#1aff00c0] border border-dashed border-green-500/50 text-black hover:bg-[#19FF00]`}><BadgeCheck className="w-5 h-5" /> <div className="text-md font-medium hidden xl:flex">{t("Become")}</div></NavLink>

                        )}

                    </div>
                    <div className="px-2">
                        <div className="h-[1.5px] w-full bg-zinc-900"></div>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <NavLink to="../about-us" className={({ isActive }) =>
                            isActive
                                ? `${baseClass} bg-[#19FF00] text-black  fill-black`
                                : `${baseClass} text-[#19FF00]  hover:text-[#1aff00c0]`
                        }><Info className="w-5 h-5 text-[#2856F4]" /> <div className="text-md font-medium hidden xl:flex">{t("About")}</div></NavLink>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Sidebar