import { getUserCommonInfos, getUserProfile } from "@/api/user";
import { logout } from "@/api/auth";
import type { UserCommonInfos, UserProfile } from "@/api/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

type UserMenuProps = {
    userInfo: UserCommonInfos | null;
    setUserInfo: React.Dispatch<React.SetStateAction<UserCommonInfos | null>>;
};

function UserMenu({ userInfo, setUserInfo }: UserMenuProps) {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState("/profile/6.jpg");
    const [user, setUser] = useState<UserProfile | null>(null);
    const { t } = useTranslation();

    // On mount, fetch full user info/profile (could depend on userInfo for live-updating avatar)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const common = await getUserCommonInfos();
                if (common && common.username) {
                    const apiUser = await getUserProfile(common.username);
                    setUser(apiUser);
                } else {
                }
            } catch (err) {
            } finally {
            }
        };
        fetchUser();
    }, []); // You could add [userInfo] if you want the avatar to update dynamically

    const handleLogout = async () => {
        try {
            await logout();
            const data = await getUserCommonInfos();
            setUserInfo(data);
            setProfilePic("")
            navigate('/')
        } catch (err) {
            console.error("Failed to logout:", err);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex items-center">
                {user?.avatarurl && user.avatarurl.length > 0 ? (
                    <img
                        src={user.avatarurl}
                        alt="profile"
                        className="w-9.5 h-9.5 z-1 rounded-lg border"
                        style={{ cursor: 'pointer' }}
                    />
                ) : (
                    <img
                        src={profilePic}
                        alt="profile"
                        className="w-9.5 h-9.5 z-1 rounded-lg border"
                        style={{ cursor: 'pointer' }}
                    />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="hover:bg-zinc-500/20 flex gap-1 items-center"
                        onClick={() => userInfo?.username && navigate(`/profile/${userInfo.username}`)}
                    >
                        <User className="w-5 h-5" />
                        {t("Profile")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="hover:bg-zinc-500/20 flex gap-1"
                        onClick={() => navigate('/settings/general')}
                    >
                        <Settings />
                        {t("Settings")}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-500 hover:bg-red-500/20 flex gap-2"
                    >
                        <LogOut className="text-red-500" />
                        {t("Log out")}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserMenu
