import { Input } from "@/components/ui/input"
import SearchUserCard from "./searchUsercard"
import TopCreators from "./topCreators"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useMemo, useState } from "react";
import { getAllUsers } from "@/api/user";
import type { UserProfileWithTags } from "@/api/types";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

// User type for UI components
type User = {
    id:string;
    username: string;
    avatarUrl: string;
    games: string[];
    tags: string[];
    cost: string;
    active: boolean;
};

// Map API user to UI user
function mapApiUserToUI(user: UserProfileWithTags): User {
    return {
        id: String(user.id), // Convert id to string for UI User type
        username: user.username,
        avatarUrl: user.avatarurl,
        games: user.games,
        tags: user.tags,
        cost: "$0.00", // Update when pricing is available
        active: user.isActive,
    };
}

function SearchBar() {
    const [allUsers, setAllUsers] = useState<UserProfileWithTags[]>([]);
    const [filterText, setFilterText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    // Filter users based on search text
    const filteredUsers: UserProfileWithTags[] = useMemo(() => {
        if (filterText.length === 0) {
            return allUsers.slice(0, 16);
        }
        return allUsers.filter(user =>
            user.username.toLowerCase().includes(filterText.toLowerCase()) ||
            user.games.some(game => game.toLowerCase().includes(filterText.toLowerCase()))
        );
    }, [allUsers, filterText]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const users = await getAllUsers();
                setAllUsers(users);
            } catch (err: any) {
                setError(err?.message || "Failed to load users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="mb-2">
            <div className="flex gap-1">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="rounded-lg h-9 xl:w-full bg-zinc-950 hover:bg-zinc-900/50 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                            <Search className="w-5 h-5" />
                            <div className="hidden xl:flex">Search between all users...</div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] sm:min-h-[800px] sm:max-h-[800px] min-h-[700px] max-h-[700px] overflow-y-scroll sm:overflow-hidden flex flex-col">
                        <DialogHeader>
                            <DialogTitle className="flex justify-between gap-4">
                                <Input 
                                    type="text" 
                                    placeholder={t("Search")} 
                                    className="font-normal placeholder:text-sm text-sm" 
                                    value={filterText} 
                                    onChange={(e) => setFilterText(e.target.value)} 
                                />
                                <DialogClose className="text-sm text-zinc-400 underline cursor-pointer hover:text-white transition-all duration-300">
                                    {t("close")}
                                </DialogClose>
                            </DialogTitle>
                            <div className="h-[1px] bg-zinc-800"></div>
                            <DialogDescription className="h-full">
                                {loading ? (
                                    <div className="flex items-center justify-center h-32">
                                        <div className="text-zinc-400">Loading users...</div>
                                    </div>
                                ) : error ? (
                                    <div className="flex items-center justify-center h-32">
                                        <div className="text-red-400">{error}</div>
                                    </div>
                                ) : filterText.length > 0 ? (
                                    <SearchUserCard users={filteredUsers.map(mapApiUserToUI)} />
                                ) : (
                                    <div className="flex justify-center pt-8 gap-2">
                                        Start typing to start the search
                                    </div>
                                )}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default SearchBar