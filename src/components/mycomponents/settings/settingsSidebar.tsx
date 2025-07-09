import { SettingsIcon, History, TriangleAlert } from "lucide-react"
import { NavLink } from "react-router-dom"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

function SettingsSidebar() {
    // State for current profile picture
    const [profilePic, setProfilePic] = useState("/profile/9.jpg")
    // State to control dialog open/close
    const [dialogOpen, setDialogOpen] = useState(false)
    // Generate image paths
    const profileImages = Array.from({ length: 116 }, (_, i) => `/profile/${i + 1}.jpg`)
    return (
        <div className="w-fit sm:max-w-62 sm:w-full h-full flex flex-col gap-2 border-r">
            <div className="flex flex-col gap-2 p-4">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <div className="relative group sm:w-24 ">
                            <div className="bg-black/40 backdrop-blur-sm z-50 w-24 h-24 absolute rounded-lg text-center text-sm text-zinc-200 hidden group-hover:flex justify-center items-center transition-all duration-300 cursor-pointer">
                                Change Picture
                            </div>
                            <img src={profilePic} alt="profile" className="sm:w-24 w-8 z-1 rounded-lg border " />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] sm:min-h-[800px] sm:max-h-[800px] min-h-[700px] max-h-[700px] overflow-y-scroll flex flex-col ">
                        <DialogHeader>
                            <DialogTitle className="flex justify-between gap-4">
                                Select a Profile Picture
                            </DialogTitle>
                            <DialogDescription className="h-full">
                                <div className="grid grid-cols-4 gap-4 p-2">
                                    {profileImages.map((img, idx) => (
                                        <button
                                            key={img}
                                            className={`focus:outline-none border-2 rounded-lg transition-all duration-200 cursor-pointer ${profilePic === img ? 'border-blue-500' : 'border-transparent'} hover:border-blue-400`}
                                            onClick={() => {
                                                setProfilePic(img)
                                                setDialogOpen(false)
                                            }}
                                        >
                                            <img src={img} alt={`profile ${idx + 1}`} className="w-full h-20 object-cover rounded-lg" />
                                        </button>
                                    ))}
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog >
                <div className="px-0.5 text-xl sm:flex hidden">James</div>
            </div>
            <div className="w-full h-[1px] bg-zinc-800"></div>
            <div className="p-2 flex flex-col gap-1">
                <NavLink
                    to="/settings/general"
                    className={({ isActive }) =>
                        `flex gap-2 items-center py-2 px-2 rounded-xl transition-all duration-300 hover:bg-zinc-800/60 ${isActive ? "text-white" : "text-zinc-400 hover:text-white"
                        }`
                    }
                >
                    <SettingsIcon className="w-4 h-4" />
                    <div className="sm:flex hidden">General</div>
                </NavLink>


                <NavLink
                    to="/settings/active-history"
                    className={({ isActive }) =>
                        `flex gap-2 items-center py-2 px-2 rounded-xl transition-all duration-300 hover:bg-zinc-800/60 ${isActive ? "text-white" : "text-zinc-400 hover:text-white"
                        }`
                    }
                >
                    <History className="w-4 h-4" />
                    <div className="sm:flex hidden">Active purchases</div>
                </NavLink>

                <NavLink
                    to="/settings/history"
                    className={({ isActive }) =>
                        `flex gap-2 items-center py-2 px-2 rounded-xl transition-all duration-300 hover:bg-zinc-800/60 ${isActive ? "text-white" : "text-zinc-400 hover:text-white"
                        }`
                    }
                >
                    <History className="w-4 h-4" />
                    <div className="sm:flex hidden">Billing History</div>
                </NavLink>
                <NavLink
                    to="/settings/danger"
                    className={({ isActive }) =>
                        `flex gap-2 items-center py-2 px-2 rounded-xl transition-all duration-300 hover:bg-red-500/20 ${isActive ? "text-red-500" : "text-zinc-400 hover:text-red-500"
                        }`
                    }
                >
                    <TriangleAlert className="w-4 h-4" />
                    <div className="sm:flex hidden">Danger</div>
                </NavLink>
            </div>
        </div>
    )
}
export default SettingsSidebar