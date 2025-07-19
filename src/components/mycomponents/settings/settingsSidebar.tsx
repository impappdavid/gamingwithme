import { SettingsIcon, History, TriangleAlert } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { getUserCommonInfos, UpdateUserAvatar } from "@/api/settings"

function SettingsSidebar() {
    // State for current profile picture
    const [profilePic, setProfilePic] = useState("/profile/9.jpg")
    // State to control dialog open/close
    const [dialogOpen, setDialogOpen] = useState(false)
    // Generate image paths
    const profileImages = Array.from({ length: 116 }, (_, i) => `/profile/${i + 1}.jpg`)
    const [username, setUsername] = useState("")

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const common = await getUserCommonInfos();
                if (common && common.username) {

                    setUsername(common.username);
                } else {
                    setUsername("");
                }
            } catch (err) {
                setError("Failed to fetch user");
                setUsername("");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Handle file input click
    const handleProfilePicClick = () => {
        fileInputRef.current?.click();
    };

    // Handle file selection and upload
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Call the API with the file directly
        const result = await UpdateUserAvatar(file);
        if (result) {
            // Create a preview URL for immediate display
            const previewUrl = URL.createObjectURL(file);
            setProfilePic(previewUrl);
        }
    };

    return (
        <div className="w-fit sm:max-w-62 sm:w-full h-full flex flex-col gap-2 border-r">
            <div className="flex flex-col gap-2 p-4">

                <div className="relative group sm:w-24 ">
                    <div className="bg-black/40 backdrop-blur-sm z-50 w-24 h-24 absolute rounded-lg text-center text-sm text-zinc-200 hidden group-hover:flex justify-center items-center transition-all duration-300 cursor-pointer" onClick={handleProfilePicClick}>
                        Change Picture
                    </div>
                    <img src={profilePic} alt="profile" className="sm:w-24 w-8 z-1 rounded-lg border " onClick={handleProfilePicClick} style={{ cursor: 'pointer' }} />
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </div>

                <div className="px-0.5 text-xl sm:flex hidden">{username}</div>
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