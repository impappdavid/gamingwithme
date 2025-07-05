import { BadgeCheck, Bell, Calendar, CircleQuestionMark, CircleUser, Download, House, Info, Languages, LogOut, Menu, MessageSquare, MessagesSquare, Music, Play, Search, Settings, Swords, User, Users, X, Youtube } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useNavigate, NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"

type NavbarProps = {
    page: string;
  };

function Navbar({ page }: NavbarProps) {
    const [search, setSearch] = useState("");
    let loggedin = localStorage.getItem('signedin')
    const navigate = useNavigate();
    const baseClass = "flex gap-2 items-center  p-2 rounded-lg transition-all duration-200";
    return (
        <>
            <div className="w-full flex justify-between p-4 items-center border-b">
                <div className="text-xl font-semibold hidden sm:flex">{page}</div>


                <div className="flex sm:hidden">
                    <Drawer direction="left">
                        <DrawerTrigger asChild >
                            <div className="sm:w-60 rounded-lg h-9 w-9 bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
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
                                            ? `${baseClass} bg-green-500/20 text-green-500`
                                            : `${baseClass} text-green-500/60 hover:text-green-500`
                                    }><House className="w-5 h-5" /> <div className="text-md font-medium">Home</div></NavLink>
                                    <NavLink to="../players" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-green-500/20 text-green-500`
                                            : `${baseClass} text-green-500/60 hover:text-green-500`
                                    }>
                                        <Users className="w-5 h-5" />
                                        <div className="text-md font-medium ">Players</div>
                                    </NavLink>
                                    <NavLink to="../just-chatting" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-green-500/20 text-green-500`
                                            : `${baseClass} text-green-500/60 hover:text-green-500`
                                    }>
                                        <MessagesSquare className="w-5 h-5" />
                                        <div className="text-md font-medium">Just Chatting</div>
                                    </NavLink>
                                    <NavLink to="../music" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-green-500/20 text-green-500`
                                            : `${baseClass} text-green-500/60 hover:text-green-500`
                                    }>
                                        <Music className="w-5 h-5" />
                                        <div className="text-md font-medium ">Music</div>
                                    </NavLink>
                                    <NavLink to="../tiktok" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-zinc-800/80 hover:bg-zinc-800/80 text-white fill-white`
                                            : `${baseClass} text-green-500/60  hover:text-green-500 fill-green-500/60 hover:fill-green-500`
                                    }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="">
                                            <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48" />
                                        </svg>
                                        <div className="text-md font-medium ">Tiktok</div>
                                    </NavLink>
                                    <NavLink to="../youtube" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-green-500/20 text-green-500`
                                            : `${baseClass} text-green-500/60 hover:text-green-500`}>
                                        <Youtube className="w-5 h-5" />
                                        <div className="text-md font-medium ">Youtube</div>
                                    </NavLink>
                                    <NavLink to="../games" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-green-500/20 text-green-500`
                                            : `${baseClass} text-green-500/60 hover:text-green-500`
                                    }><Swords className="w-5 h-5" /> <div className="text-md font-medium  ">Games</div></NavLink>
                                    <div className="px-2 py-1.5">
                                        <div className="h-[2px] w-full bg-zinc-900"></div>
                                    </div>
                                    <div className="flex flex-col gap-1 px-1">
                                        <NavLink to="../creator" className={`${baseClass} bg-green-500/20 border border-dashed border-green-500/50 text-green-500 hover:bg-green-500/30`}><BadgeCheck className="w-5 h-5" /> <div className="text-md font-medium">Become a creator</div></NavLink>

                                    </div>
                                    <div className="px-2 py-1.5">
                                        <div className="h-[2px] w-full bg-zinc-900"></div>
                                    </div>
                                    <NavLink to="../faq" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-green-500/20 text-green-500`
                                            : `${baseClass} text-green-500/60 hover:text-green-500`
                                    }><CircleQuestionMark className="w-5 h-5" /> <div className="text-md font-medium ">FAQ</div></NavLink>

                                    <NavLink to="../about-us" className={({ isActive }) =>
                                        isActive
                                            ? `${baseClass} bg-green-500/20 text-green-500`
                                            : `${baseClass} text-green-500/60 hover:text-green-500`
                                    }><Info className="w-5 h-5" /> <div className="text-md font-medium">About us</div></NavLink>

                                </div>
                                <DrawerFooter className="p-0">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild className="absolute bottom-3 ">
                                            <div className="flex gap-2 w-full items-center cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-900 p-2 rounded-lg transition-all duration-200"><Languages className="w-5 h-5" /> <div className="text-md font-medium">Languages</div></div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full" align="start">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    English
                                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Hungary
                                                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Deutsch
                                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Spanish
                                                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>


                <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="sm:w-60 rounded-lg h-9  bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                                <Search className="w-5 h-5" />
                                <div className="text-sm hidden sm:flex">Search...</div>
                            </div>

                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px] sm:min-h-[800px] min-h-[700px] max-h-[800px] flex flex-col ">
                            <DialogHeader>
                                <DialogTitle className="flex justify-between gap-4">
                                    <Input type="text" placeholder="Search for user" className="font-normal placeholder:text-sm text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
                                    <DialogClose className="text-sm text-zinc-400 underline cursor-pointer hover:text-white transition-all duration-300">Close</DialogClose>
                                </DialogTitle>
                                <div className="h-[1px] bg-zinc-800"></div>
                                <DialogDescription>
                                    {search.length > 0 ? (
                                        <div className="flex flex-col">
                                            <div className=" hover:bg-zinc-800/40 cursor-pointer flex flex-col gap-4 p-2">
                                                <div className="flex justify-between">
                                                    <div className="flex gap-2 items-center">
                                                        <div className="w-10 h-10 bg-zinc-700 rounded-md"></div>
                                                        <div className="flex flex-col">
                                                            <div className="text-white text-md">Name</div>
                                                            <div className="text-xs">@username</div>
                                                        </div>
                                                    </div>
                                                    <div className="px-2 py-1.5 bg-blue-500/50 text-white h-fit text-xs rounded-lg">$4.99/30m</div>
                                                </div>
                                                <div className="text-xs">
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                                </div>
                                                <div className="flex gap-1 items-center">
                                                    <Calendar className="w-3 h-3" />
                                                    <div className="text-xs">Jun 21, 2025</div>
                                                </div>
                                            </div>
                                            <div className=" hover:bg-zinc-800/40 cursor-pointer flex flex-col gap-4 p-2">
                                                <div className="flex justify-between">
                                                    <div className="flex gap-2 items-center">
                                                        <div className="w-10 h-10 bg-zinc-700 rounded-md"></div>
                                                        <div className="flex flex-col">
                                                            <div className="text-white text-md">Name</div>
                                                            <div className="text-xs">@username</div>
                                                        </div>
                                                    </div>
                                                    <div className="px-2 py-1.5 bg-blue-500/50 text-white h-fit text-xs rounded-lg">$14.99/1h</div>
                                                </div>
                                                <div className="text-xs">
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                                </div>
                                                <div className="flex gap-1 items-center">
                                                    <Calendar className="w-3 h-3" />
                                                    <div className="text-xs">Jun 21, 2025</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <div className="text-start">Top creators</div>
                                            <div className="flex flex-wrap gap-2 items-center">
                                                <div className="p-1 bg-zinc-800 rounded-full px-2 border text-xs cursor-pointer" onClick={() => setSearch("ethan")}>@ethan</div>
                                                <div className="p-1 bg-zinc-800 rounded-full px-2 border text-xs cursor-pointer" onClick={() => setSearch("pacosCS")}>@pacosCS</div>
                                                <div className="p-1 bg-zinc-800 rounded-full px-2 border text-xs cursor-pointer" onClick={() => setSearch("pineapple")}>@pineapple</div>
                                                <div className="p-1 bg-zinc-800 rounded-full px-2 border text-xs cursor-pointer" onClick={() => setSearch("Mark")}>@Mark</div>
                                            </div>
                                        </div>
                                    )}
                                </DialogDescription>

                            </DialogHeader>

                        </DialogContent>
                    </Dialog >

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

                                            Notifications
                                            <DialogClose>
                                                <X className="w-5 h-5 cursor-pointer" />
                                            </DialogClose>
                                        </DialogTitle>
                                        <div className="h-[1px] bg-zinc-800"></div>
                                        <DialogDescription>
                                            <div className="flex flex-col">
                                                <div className=" hover:bg-zinc-800/40 cursor-pointer flex flex-col gap-2 p-2 border-b">
                                                    <div className="flex justify-between">
                                                        <div className="flex gap-2 items-center">
                                                            <div className="w-10 h-10 bg-zinc-700 rounded-md"></div>
                                                            <div className="flex flex-col">
                                                                <div className="text-white text-md">Ethan Wong</div>
                                                                <div className="text-xs">@ethan</div>
                                                            </div>
                                                        </div>
                                                        <div className="px-2 py-1.5 bg-green-500/50 text-white h-fit text-xs rounded-lg">30m</div>
                                                    </div>
                                                    <div className="text-xs">
                                                        <span className="text-blue-500">Ethan</span> bought a session to play with yout.
                                                    </div>
                                                </div>
                                                <div className=" hover:bg-zinc-800/40 cursor-pointer flex flex-col gap-2 p-2 border-b">
                                                    <div className="flex justify-between">
                                                        <div className="flex gap-2 items-center">
                                                            <div className="w-10 h-10 bg-zinc-700 rounded-md"></div>
                                                            <div className="flex flex-col">
                                                                <div className="text-white text-md">GamingWithMe</div>
                                                                <div className="text-xs">@everyone</div>
                                                            </div>
                                                        </div>
                                                        <div className="px-2 py-1.5 bg-green-500/50 text-white h-fit text-xs rounded-lg">Server</div>
                                                    </div>
                                                    <div className="text-xs">
                                                        New <span className="text-blue-500">updates</span> coming in 1 day.
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

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="">
                                    <div className=" rounded-lg h-9 w-9 bg-green-500/20 hover:bg-green-500/30 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                                        <User className="w-5 h-5" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-36" align="end">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1 items-center">
                                            <User className="w-5 h-5" />
                                            Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1">
                                            <Settings />
                                            Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => { localStorage.clear(); navigate('/') }} className="text-red-500 hover:text-red-500 hover:bg-red-500/20 flex gap-2">
                                            <LogOut className="text-red-500" />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <Button onClick={() => navigate('/signin')} className="h-9 bg-green-500/10 border border-green-500/60 text-green-500 hover:border-green-500/80 hover:bg-green-500/20 cursor-pointer" >Sign In</Button>
                            <Button onClick={() => navigate('/signup')} className="h-9 bg-green-500  text-black  hover:bg-green-500/80 cursor-pointer">Sign Up</Button>
                        </div>
                    )}
                </div>

            </div>

        </>
    )
}
export default Navbar