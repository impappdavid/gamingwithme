import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import SettingsSidebar from "./settingsSidebar"
import { Input } from "@/components/ui/input"
import { CaseLower, KeyRound, Tag, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
    getUserAllInformation, 
    getUserCommonInfos, 
    updateUserBio, 
    updateUsername, 
    updateUserPassword, 
    addGameTag, 
    deleteGameTag, 
    addNewTag, 
    deleteTag 
} from "@/api/settings"
import type { UserProfile } from "@/api/types"
import { fetchPopularGamesFromRAWG } from "@/api/games"
import type { RAWGGame } from "@/api/types"
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
    const [user, setUser] = useState<UserProfile | null>(null);
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<RAWGGame[]>([]);
    const [gameTags, setGameTags] = useState<RAWGGame[]>([]);

    const [inputValue, setInputValue] = useState("")
    const [filteredData, setFilteredData] = useState<RAWGGame[]>([]);
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
                    const full = await getUserAllInformation(common.username);
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
            try {
                const games = await fetchPopularGamesFromRAWG();
                setGameTags(games);
            } catch (err) {
                console.error("Failed to fetch games:", err);
            }
        };
        fetchGames();
    }, []);

    const addTag = async (game: RAWGGame) => {
        // Prevent duplicates
        if (!tags.some(t => t.name === game.name)) {
            try {
                await addGameTag(game.name);
                setTags([...tags, game]);
            } catch (err) {
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
                await deleteGameTag(gameToRemove.name);
                setTags(tags.filter((_, index) => index !== indexToRemove));
            } catch (err) {
                console.error("Failed to remove game tag", err);
            }
        }
    }

    const handleUsernameChange = async () => {
        try {
            await updateUsername(username);
        } catch (err) {
            console.error("Failed to update username", err);
        }
    }

    const handleBioChange = async () => {
        try {
            await updateUserBio(bio);
        } catch (err) {
            console.error("Failed to update bio", err);
        }
    }

    const handlePasswordChange = async () => {
        try {
            await updateUserPassword(currentPassword, newPassword);
        } catch (err) {
            console.error("Failed to update password", err);
        }
    }

    if (loading) {
        return (
            <div className="w-full h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-zinc-950 sm:rounded-2xl border border-zinc-800 relative flex flex-col">
                    <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("settings")} />
                    </div>
                    <div className="flex items-center justify-center flex-1">
                        <div className="text-zinc-400">Loading settings...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-zinc-950 sm:rounded-2xl border border-zinc-800 relative flex flex-col">
                    <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("settings")} />
                    </div>
                    <div className="flex items-center justify-center flex-1">
                        <div className="text-red-400">{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
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
                                                <svg className="w-4 h-4 ml-2 opacity-50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
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
                                                                    try {
                                                                        await addNewTag(opt.value);
                                                                        setSelectedTags(prev => [...prev, opt.value]);
                                                                    } catch (err) {
                                                                        console.error("Failed to add tag", err);
                                                                    }
                                                                } else {
                                                                    try {
                                                                        await deleteTag(opt.value);
                                                                        setSelectedTags(prev => prev.filter(v => v !== opt.value));
                                                                    } catch (err) {
                                                                        console.error("Failed to remove tag", err);
                                                                    }
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
                                    <Popover>
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
                                                <svg className="w-4 h-4 ml-2 opacity-50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
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

                            {/* Username Section */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Username</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <Input
                                            type="text"
                                            placeholder="Username"
                                            className="pl-10 h-11 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <Button onClick={handleUsernameChange} className="h-11 px-4 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300">
                                        Update
                                    </Button>
                                </div>
                            </div>

                            {/* Bio Section */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Bio</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <CaseLower className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                                        <Textarea
                                            placeholder="Tell us about yourself..."
                                            className="pl-10 h-20 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300 resize-none"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                        />
                                    </div>
                                    <Button onClick={handleBioChange} className="h-11 px-4 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300">
                                        Update
                                    </Button>
                                </div>
                            </div>

                            {/* Password Section */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Change Password</label>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="relative">
                                        <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <Input
                                            type="password"
                                            placeholder="Current Password"
                                            className="pl-10 h-11 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="relative">
                                        <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <Input
                                            type="password"
                                            placeholder="New Password"
                                            className="pl-10 h-11 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <Button onClick={handlePasswordChange} className="h-11 px-4 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300">
                                        Update Password
                                    </Button>
                                </div>
                            </div>

                            {/* Game Tags Section */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Game Tags</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <Input
                                            type="text"
                                            placeholder="Search games..."
                                            className="pl-10 h-11 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                        />
                                    </div>
                                    <Button onClick={() => addTag(gameTags[0])} className="h-11 px-4 rounded-xl bg-green-500 hover:bg-green-600 transition-all duration-300">
                                        Add
                                    </Button>
                                </div>
                                
                                {/* Display current tags */}
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <div key={index} className="flex items-center gap-2 bg-zinc-800/40 px-3 py-1 rounded-lg">
                                            <span className="text-sm">{tag.name}</span>
                                            <button
                                                onClick={() => removeTag(index)}
                                                className="text-red-400 hover:text-red-300 text-sm"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default General