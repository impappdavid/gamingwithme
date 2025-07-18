import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import SettingsSidebar from "./settingsSidebar"
import { Input } from "@/components/ui/input"
import { CaseLower, KeyRound, Tag, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GetUserAllInformation, getUserCommonInfos, UpdateUserBio, UpdateUsername, UpdateUserPassword, type UserAllInfo } from "@/api/settings"

function General() {
    const { t } = useTranslation()
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserAllInfo | null>(null);
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const [inputValue, setInputValue] = useState("")
    const [filteredData, setFilteredData] = useState<string[]>([]);
    const fixedTags = [
        //games
        "valorant", "cs2", "RainbowSixSiege", "Minecraft", "LoL",
        //youtube
        "youtube",
        //tiktok
        "tiktok",
        //music
        "music",
        //just-chatting
        "just-chatting",
    ];

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const common = await getUserCommonInfos();
                if (common && common.username) {
                    const full = await GetUserAllInformation(common.username) as UserAllInfo;
                    setUser(full);
                    setUsername(full.username);
                    setBio(full.bio);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setError("Failed to fetch user");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const addTag = (addName: string) => {
        setTags([...tags, addName]);
        setInputValue("");
        setFilteredData([])
    }

    const removeTag = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index !== indexToRemove))
    }

    const handleUsernameChange = async () => {
        await UpdateUsername(username)
    }

    const handleBioChange = async () => {
        await UpdateUserBio(bio)
    }

    const handlePasswordChange = async () => {
        await UpdateUserPassword(currentPassword, newPassword)
    }
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
                                <form className="flex flex-col gap-2">
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
                                    <Button onClick={handleUsernameChange} className="h-10 rounded-xl bg-[#2856F4] text-white hover:bg-blue-500/80 transition-all duration-300 cursor-pointer">Save</Button>

                                </form>
                                <form className="flex flex-col gap-2">
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
                                                value={bio}
                                                onChange={(e) => setBio(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={handleBioChange} className="h-10 rounded-xl bg-[#2856F4] text-white hover:bg-blue-500/80 transition-all duration-300 cursor-pointer">Save</Button>

                                </form>
                                <div className="flex flex-col">
                                    <div className="text-xl font-bold mb-2">Tags</div>

                                    <div className="w-full transition-all duration-500 bg-zinc-800/20 border-zinc-800/20 hover:border-zinc-800 hover:bg-zinc-800/60 rounded-xl">
                                        <div className="relative transition-all duration-500">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <Tag className="w-4 h-4 text-zinc-500" />
                                            </div>
                                            <Input
                                                type="text"
                                                placeholder="Search and add tags"
                                                className="pl-10 h-10 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                                value={inputValue}
                                                onChange={(e) => {
                                                    setFilteredData(fixedTags.filter(m => m.toLowerCase().includes(inputValue.toLowerCase())))
                                                    setInputValue(e.target.value)
                                                }
                                                }
                                            />
                                        </div>
                                        {tags.length > 0 ? (
                                            <div className="px-1 py-2 transition-all duration-500">
                                                <div className="flex flex-wrap w-full gap-2 transition-all duration-500">
                                                    {tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            onClick={() => removeTag(index)}
                                                            className="bg-[#28a74634] border border-[#238b3b] hover:border-red-500 text-white px-4 py-1.5 rounded-lg text-xs flex items-center hover:bg-red-500/20 cursor-pointer transition-all duration-300"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="transition-all duration-500"></div>
                                        )}
                                        {filteredData.length > 0 ? (
                                            <div className="px-1 py-2 transition-all duration-500">
                                                <div className="flex flex-wrap w-full gap-2 transition-all duration-500">
                                                    {filteredData.slice(0, 6).map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            onClick={() => addTag(tag)}
                                                            className="bg-zinc-900/60 border text-white px-4 py-1.5 rounded-lg text-xs flex items-center hover:bg-[#28a74634] hover:border-[#238b3b] cursor-pointer transition-all duration-300"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="transition-all duration-500"></div>
                                        )}

                                    </div>

                                </div>
                                <Button className="h-10 rounded-xl bg-[#2856F4] text-white hover:bg-blue-500/80 transition-all duration-300 cursor-pointer">Save</Button>
                                <form className="flex flex-col gap-2">
                                        <div className="text-xl font-bold mb-2">Change password</div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-2 w-full">
                                                <div className="relative w-full">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <KeyRound className="h-4 w-4 text-zinc-500" />
                                                    </div>
                                                    <Input
                                                        id="currentPassword"
                                                        type="password"
                                                        placeholder="Current password"
                                                        className="pl-10 h-10 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300  "
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                        required
                                                    />

                                                </div>
                                                <div className="relative w-full">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <KeyRound className="h-4 w-4 text-zinc-500" />
                                                    </div>
                                                    <Input
                                                        id="newpassword"
                                                        type="password"
                                                        placeholder="New password"
                                                        className="pl-10 h-10 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300  "
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        required
                                                    />

                                                </div>
                                            <Button onClick={handlePasswordChange} className="h-10 rounded-xl bg-[#2856F4] text-white hover:bg-blue-500/80 transition-all duration-300 cursor-pointer">Save new password</Button>

                                        </div>
                                    </div>
                                </form>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default General