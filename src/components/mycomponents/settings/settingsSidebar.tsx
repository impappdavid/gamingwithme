import { SettingsIcon, History, TriangleAlert, TicketPercent, LibraryBig, ShieldCheck } from "lucide-react"
import { NavLink } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { getUserCommonInfos, updateUserAvatar } from "@/api/settings"
import { Skeleton } from "@/components/ui/skeleton"
import type { UserProfile } from "@/api/types"
import { getUserProfile } from "@/api/user"

function SettingsSidebar() {
    // State for current profile picture
    const [profilePic, setProfilePic] = useState("/profile/6.jpg")
    const [user, setUser] = useState<UserProfile | null>(null);

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
                    const apiUser = await getUserProfile(common.username);
                    setUser(apiUser);
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
        const result = await updateUserAvatar(file);
        if (result) {
            // Create a preview URL for immediate display
            const previewUrl = URL.createObjectURL(file);
            setProfilePic(previewUrl);
        }
    };

    return (
        <div className="w-fit sm:max-w-62 sm:w-full h-full flex flex-col gap-2 border-r">
            <div className="flex flex-col gap-2 p-4">
                {loading ? (
                    <div className="flex flex-col gap-2 items-center">
                        <Skeleton className="sm:w-24 w-8 h-24 rounded-lg" />
                        <Skeleton className="w-20 h-6" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-24 text-center">
                        <div className="text-md mb-1">❌</div>
                        <h3 className="text-md font-semibold text-red-400 mb-1">Error</h3>
                        <p className="text-zinc-400 max-w-md text-xs">{error}</p>
                    </div>
                ) : (
                    <>
                        <div className="relative group sm:w-24 ">
                            <div className="bg-black/40 backdrop-blur-sm z-50 w-24 h-24 absolute rounded-lg text-center text-sm text-zinc-200 hidden group-hover:flex justify-center items-center transition-all duration-300 cursor-pointer" onClick={handleProfilePicClick}>
                                {/* Button overlay for changing the profile picture */}
                                Change Picture
                            </div>
                            {user?.avatarurl && user.avatarurl.length > 0 ? (
                                <img
                                    src={user.avatarurl}
                                    alt="profile"
                                    className="sm:w-24 w-8 z-1 rounded-lg border"
                                    onClick={handleProfilePicClick}
                                    style={{ cursor: 'pointer' }}
                                />
                            ) : (
                                <img
                                    src={profilePic}
                                    alt="profile"
                                    className="sm:w-24 w-8 z-1 rounded-lg border"
                                    onClick={handleProfilePicClick}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="px-0.5 text-xl sm:flex hidden">{username}</div>
                    </>
                )}
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
                    <LibraryBig className="w-4 h-4" />
                    <div className="sm:flex hidden">Upcoming bookings</div>
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
                    to="/settings/coupon"
                    className={({ isActive }) =>
                        `flex gap-2 items-center py-2 px-2 rounded-xl transition-all duration-300 hover:bg-zinc-800/60 ${isActive ? "text-white" : "text-zinc-400 hover:text-white"
                        }`
                    }
                >
                    <TicketPercent className="w-4 h-4" />
                    <div className="sm:flex hidden">Coupons</div>
                </NavLink>
                <NavLink
                    to="/settings/security"
                    className={({ isActive }) =>
                        `flex gap-2 items-center py-2 px-2 rounded-xl transition-all duration-300 hover:bg-zinc-800/60 ${isActive ? "text-white" : "text-zinc-400 hover:text-white"
                        }`
                    }
                >
                    <ShieldCheck className="w-4 h-4" />
                    <div className="sm:flex hidden">Security</div>
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