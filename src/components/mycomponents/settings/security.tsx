import { Input } from "@/components/ui/input"
import { KeyRound } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { updateUserPassword } from "@/api/settings"
import Navbar from "../navbar/navbar"
import SettingsSidebar from "./settingsSidebar"
import { useTranslation } from "react-i18next"

function Security() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation()

    const handlePasswordChange = async () => {
        setLoading(true);
        setSuccess("");
        setError("");
        try {
            await updateUserPassword(currentPassword, newPassword);
            setSuccess(t("Password updated successfully."));
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            setError(t("Failed to update password."));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-screen sm:p-2">
            <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 relative flex flex-col">
                <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                    <Navbar page={t("settings")} />
                </div>
                <div className="flex w-full flex-1">
                    <SettingsSidebar />
                    <div className="w-full p-4">
                        <div className="flex flex-col gap-4"></div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold">{t("Change Password")}</label>
                            <div className="grid grid-cols-1 gap-2">
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <Input
                                        type="password"
                                        placeholder={t("Current Password")}
                                        className="pl-10 h-11 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <Input
                                        type="password"
                                        placeholder={t("New Password")}
                                        className="pl-10 h-11 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handlePasswordChange}
                                    className="h-11 px-4 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300"
                                    disabled={loading}
                                >
                                    {loading ? t("Updating...") : t("Update Password")}
                                </Button>
                                {success && <div className="text-green-400 text-sm mt-2">{success}</div>}
                                {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Security
