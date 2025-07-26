import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getUserCommonInfos } from "@/api/user"
import type { UserCommonInfos } from "@/api/types"
import DrawerMenu from "./drawerMenu"
import Notifications from "./notifications"
import LanguageSelector from "./languageSelector"
import UserMenu from "./userMenu"
import { Download, Headset } from "lucide-react"

type NavbarProps = {
    page: string;
};

function Navbar({ page }: NavbarProps) {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserCommonInfos | null>(null);
    const [loading, setLoading] = useState(true);

    // On mount, check if user is authenticated
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true);
                const data = await getUserCommonInfos();
                setUserInfo(data);
            } catch (err) {
                console.error("Failed to check authentication:", err);
                setUserInfo(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <div className="flex justify-between p-4 items-center bg-black/60 border-b border-zinc-800">
            <div className="text-xl font-semibold hidden sm:flex">{page}</div>

            <div className="flex sm:hidden">
                <DrawerMenu />
            </div>
            
            <div className="flex gap-2">
                {/* Authenticated navbar buttons */}
                {!loading && userInfo ? (
                    <>
                        <Notifications />
                        <div className="relative rounded-lg h-9 w-9 bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                            <Download className="w-5 h-5" />
                        </div>
                        <div className="relative rounded-lg h-9 w-9 bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                            <Headset className="w-5 h-5" />
                        </div>
                        <LanguageSelector/>
                        <UserMenu userInfo={userInfo} setUserInfo={setUserInfo} />
                    </>
                ) : !loading ? (
                    // Not authenticated: show login/register
                    <div className="flex gap-2 items-center">
                        <Button 
                            onClick={() => navigate('/login')} 
                            className="h-9 bg-green-500/10 border border-green-500/60 text-green-500 hover:border-green-500/80 hover:bg-green-500/20 cursor-pointer"
                        >
                            Login
                        </Button>
                        <Button 
                            onClick={() => navigate('/registration')} 
                            className="h-9 bg-green-500 text-black hover:bg-green-500/80 cursor-pointer"
                        >
                            Registration
                        </Button>
                    </div>
                ) : (
                    // Loading state: pulsing bar
                    <div className="h-9 w-20 bg-zinc-800/50 rounded-lg animate-pulse"></div>
                )}
            </div>
        </div>
    )
}

export default Navbar
