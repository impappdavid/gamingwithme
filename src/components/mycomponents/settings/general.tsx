import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import SettingsSidebar from "./settingsSidebar"
import { Input } from "@/components/ui/input"
import { CaseLower, KeyRound, Tag, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GetUserAllInformation, getUserCommonInfos, UpdateUserBio, UpdateUsername, UpdateUserPassword, type UserAllInfo, AddGameTags, DeleteGameTag, AddNewTag, DeleteTag } from "@/api/settings"
import { fetchPopularGames, type Game } from "@/api/rawg"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectGroup } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

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
    const [tags, setTags] = useState<Game[]>([]);
    const [gameTags, setGameTags] = useState<Game[]>([]);

    const [inputValue, setInputValue] = useState("")
    const [filteredData, setFilteredData] = useState<Game[]>([]);
    const [selectedTag, setSelectedTag] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const languageOptions = [
        { value: "en", label: "English" },
        { value: "es", label: "Spanish" },
        { value: "fr", label: "French" },
        { value: "de", label: "German" },
        { value: "pt", label: "Portuguese" },
        { value: "ru", label: "Russian" },
        { value: "zh", label: "Chinese" },
        { value: "ja", label: "Japanese" },
        
        // ...add more as needed
    ];
    const tagOptions = [
        { value: "gamer", label: "Gamer" },
        { value: "justchatting", label: "Just chatting" },
        { value: "musician", label: "Musician" },
        { value: "tiktoker", label: "Tiktoker" },
        { value: "youtuber", label: "Youtuber" },
    ];
    const [languageSearch, setLanguageSearch] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
        // Fetch games for tags
        const fetchGames = async () => {
            const games = await fetchPopularGames();
            setGameTags(games);
        };
        fetchGames();
    }, []);

    const addTag = async (game: Game) => {
        // Prevent duplicates
        if (!tags.some(t => t.name === game.name)) {
            // Call API to add tag
            try {
                await AddGameTags(game.name);
                setTags([...tags, game]);
            } catch (err) {
                // Optionally handle error
                console.error("Failed to add game tag", err);
            }
        }
        setInputValue("");
        setFilteredData([]);
    }

    const removeTag = async (indexToRemove: number) => {
        const gameToRemove = tags[indexToRemove];
        if (gameToRemove) {
            try {
                await DeleteGameTag(gameToRemove.name);
                setTags(tags.filter((_, index) => index !== indexToRemove));
            } catch (err) {
                // Optionally handle error
                console.error("Failed to remove game tag", err);
            }
        }
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
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Tag Multi-Select Combobox */}
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-sm font-semibold">Tags</label>
                                        <Popover>
                                            <PopoverTrigger asChild className="w-full">
                                                <button
                                                    type="button"
                                                    className="w-full h-11 border rounded-xl bg-zinc-800/40 px-3 flex items-center justify-between text-left"
                                                >
                                                    <span className="truncate text-xs">
                                                        {selectedTags.length > 0
                                                            ? tagOptions.filter(opt => selectedTags.includes(opt.value)).map(opt => opt.label).join(", ")
                                                            : "Select tags..."}
                                                    </span>
                                                    <svg className="w-4 h-4 ml-2 opacity-50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[200px] p-2 rounded-xl">
                                                <div className="overflow-y-auto flex flex-col gap-1">
                                                    {tagOptions.map(opt => (
                                                        <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-xs px-2 py-2 rounded-lg hover:bg-zinc-700/30">
                                                            <Checkbox
                                                                checked={selectedTags.includes(opt.value)}
                                                                onCheckedChange={async checked => {
                                                                    if (checked) {
                                                                        await AddNewTag(opt.value);
                                                                        setSelectedTags(prev => [...prev, opt.value]);
                                                                    } else {
                                                                        await DeleteTag(opt.value);
                                                                        setSelectedTags(prev => prev.filter(v => v !== opt.value));
                                                                    }
                                                                }}
                                                                id={`tag-${opt.value}`}
                                                            />
                                                            <span>{opt.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    {/* Language Multi-Select Combobox */}
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-sm font-semibold">Languages</label>
                                        <Popover >
                                            <PopoverTrigger asChild className="w-full">
                                                <button
                                                    type="button"
                                                    className="w-full h-11 border rounded-xl bg-zinc-800/40 px-3 flex items-center justify-between text-left"
                                                >
                                                    <span className="truncate text-xs">
                                                        {selectedLanguages.length > 0
                                                            ? languageOptions.filter(opt => selectedLanguages.includes(opt.value)).map(opt => opt.label).join(", ")
                                                            : "Select languages..."}
                                                    </span>
                                                    <svg className="w-4 h-4 ml-2 opacity-50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[200px] p-2 rounded-xl">
                                                <div className="overflow-y-auto flex flex-col gap-1">
                                                    {languageOptions.map(opt => (
                                                        <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-xs px-2 py-2 rounded-lg hover:bg-zinc-700/30">
                                                            <Checkbox
                                                                checked={selectedLanguages.includes(opt.value)}
                                                                onCheckedChange={checked => {
                                                                    setSelectedLanguages(prev =>
                                                                        checked
                                                                            ? [...prev, opt.value]
                                                                            : prev.filter(v => v !== opt.value)
                                                                    );
                                                                }}
                                                                id={`lang-${opt.value}`}
                                                            />
                                                            <span>{opt.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
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
                                    <div className="text-xl font-bold mb-2">Games</div>

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
                                                    setFilteredData(gameTags.filter(m => m.name.toLowerCase().includes(inputValue.toLowerCase())))
                                                    setInputValue(e.target.value)
                                                }
                                                }
                                            />
                                        </div>
                                        {tags.length > 0 ? (
                                            <div className="px-1 py-2 transition-all duration-500">
                                                <div className="flex flex-wrap w-full gap-2 transition-all duration-500">
                                                    {tags.map((game, index) => (
                                                        <span
                                                            key={index}
                                                            onClick={() => removeTag(index)}
                                                            className="bg-zinc-900/60 border text-white px-4 py-1.5 rounded-lg text-xs flex items-center hover:bg-red-500/20 hover:border-red-500 cursor-pointer transition-all duration-300"
                                                        >
                                                            <img
                                                                src={game.background_image}
                                                                alt={game.name}
                                                                className="w-10 h-10 rounded mr-2 object-cover"
                                                                onError={(e) => {
                                                                    e.currentTarget.style.display = 'none';
                                                                }}
                                                            />
                                                            {game.name}
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
                                                    {filteredData.slice(0, 6).map((game, index) => (
                                                        <span
                                                            key={index}
                                                            onClick={() => addTag(game)}
                                                            className="bg-zinc-900/60 border text-white px-4 py-1.5 rounded-lg text-xs flex items-center hover:bg-[#28a74634] hover:border-[#238b3b] cursor-pointer transition-all duration-300"
                                                        >
                                                            <img
                                                                src={game.background_image}
                                                                alt={game.name}
                                                                className="w-10 h-10 rounded mr-2 object-cover"
                                                                onError={(e) => {
                                                                    e.currentTarget.style.display = 'none';
                                                                }}
                                                            />
                                                            {game.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="transition-all duration-500"></div>
                                        )}

                                    </div>

                                </div>
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