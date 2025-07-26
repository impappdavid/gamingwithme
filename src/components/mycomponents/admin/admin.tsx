import { useTranslation } from "react-i18next"
import Navbar from "../navbar/navbar"
import { Bell, Gamepad2, Settings } from "lucide-react"
import { Link } from "react-router-dom"

// Admin dashboard: lets you jump to Games or Notifications admin panels
function Admin() {
    const { t } = useTranslation()
    return (
        <>
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    {/* Always show Navbar at the top */}
                    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Admin")} />
                    </div>
                    {/* Two admin sections: Games and Notifications */}
                    <div className="grid grid-cols-2 gap-4 p-4">
                        <Link
                            to={`/admin/games`}
                            className="p-4 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 flex gap-2 justify-between items-center hover:scale-101 transition-all duration-300"
                        >
                            <div className="flex gap-2 items-center">
                                <Gamepad2 className="w-5 h-5 sm:w-10 sm:h-10 text-zinc-400" />
                                <div className="text-lg sm:text-3xl">Games</div>
                            </div>
                            {/* Settings icon for consistent UI, even if not interactive here */}
                            <div>
                                <Settings className="w-5 h-5 sm:w-10 sm:h-10 text-zinc-300" />
                            </div>
                        </Link>
                        <Link
                            to={`/admin/notifications`}
                            className="p-4 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 flex gap-2 justify-between items-center hover:scale-101 transition-all duration-300"
                        >
                            <div className="flex gap-2 items-center">
                                <Bell className="w-5 h-5 sm:w-10 sm:h-10 text-zinc-400" />
                                <div className="text-lg sm:text-3xl">Notifications</div>
                            </div>
                            <div>
                                <Settings className="w-5 h-5 sm:w-10 sm:h-10 text-zinc-300" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Admin
