import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import SettingsSidebar from "./settingsSidebar"
import { Input } from "@/components/ui/input"
import { CaseLower, KeyRound, User } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


function General() {
    const { t } = useTranslation()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");
    return (
        <>
            <div className="w-full h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-zinc-950 sm:rounded-2xl border border-zinc-800 relative flex flex-col">
                    <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("settings")} />
                    </div>
                    <div className="flex w-full flex-1">
                        <SettingsSidebar />
                        <div className="w-full p-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <div className="text-xl font-bold mb-2">Change username</div>
                                    <div className="flex justify-between gap-2">
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <User className="h-4 w-4 text-zinc-500" />
                                            </div>
                                            <Input
                                                id="username"
                                                type="text"
                                                placeholder="James"
                                                className="pl-10 h-10 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300  "
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />

                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                <div className="text-xl font-bold mb-2">Bio</div>
                                    <div className="relative">
                                        <div className="absolute top-3 left-0 flex items-center pl-3 pointer-events-none">
                                            <CaseLower className="h-4 w-4 text-zinc-500" />
                                        </div>
                                        <Textarea
                                            id="title"
                                            placeholder="Enter your project description"
                                            className="pl-10 h-24 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <Button className="h-10 rounded-xl bg-[#19FF00] text-black hover:bg-green-500/80 transition-all duration-300 cursor-pointer">Save</Button>
                                <div className="flex flex-col">
                                    <div className="text-xl font-bold mb-2">Change password</div>
                                    <div className="flex justify-between gap-2">
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <KeyRound className="h-4 w-4 text-zinc-500" />
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                className="pl-10 h-10 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300  "
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />

                                        </div>
                                        <Button className="h-10 rounded-xl bg-[#2856F4] text-white hover:bg-blue-500/80 transition-all duration-300 cursor-pointer">Send email</Button>

                                    </div>
                                </div>

                                {/* 2FA Auth
                                <div className="flex flex-col">
                                    <div className="text-xl font-bold mb-2">Two-factor authentication</div>
                                    <div className="flex justify-between gap-2 border rounded-2xl p-2">
                                        <div className="w-full   flex justify-betweeen items-center ">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="w-10 h-10 text-green-500/50" />
                                                <div className="flex flex-col">
                                                    <div className="text-xl">Authenticator App</div>
                                                    <div className="text-zinc-400 text-xs">Receive a code via an authenticator app.</div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="">
                                            <Button className="h-full rounded-xl bg-transparent border text-zinc-100 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer">Enable</Button>

                                        </div>
                                    </div>
                                </div>*/}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default General