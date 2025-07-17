import { getUserCommonInfos, Logout } from "@/api/navbar";
import type { UserCommonInfos } from "@/api/navbar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User,} from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

type UserMenuProps = {
  userInfo: UserCommonInfos | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserCommonInfos | null>>;
};

function UserMenu({ userInfo, setUserInfo }: UserMenuProps) {
    const navigate = useNavigate();
    const { t } = useTranslation()
    
    const handlelogout = async () => {
        await Logout();

       
        const data = await getUserCommonInfos();
        setUserInfo(data); 
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="flex items-center">
                    <img src="/profile/9.jpg" className=" rounded-lg h-9.5 w-9.5 border flex gap-2 text-zinc-400 items-center  cursor-pointer transition-all duration-200" />

                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1 items-center" onClick={() => userInfo && userInfo.username && navigate(`/profile/${userInfo.username}`)}>
                            <User className="w-5 h-5" />
                            {t("profile")}
                        </DropdownMenuItem>
                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1" onClick={() => navigate('/settings/general')}>
                            <Settings />
                            {t("settings")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handlelogout} className="text-red-500 hover:text-red-500 hover:bg-red-500/20 flex gap-2">
                            <LogOut className="text-red-500" />
                            {t("logout")}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
export default UserMenu