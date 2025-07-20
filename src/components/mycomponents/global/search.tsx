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
import { GetAllUser, type UserInfos } from "@/api/sidebar";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

// User type for UI components
type User = {
    name: string;
    profilePic: string;
    games: string[];
    cost: string;
    active: boolean;
};

// Map UserInfos to User for UI components
function mapUserInfosToUser(user: UserInfos): User {
    return {
        name: user.username,
        profilePic: user.avatarurl,
        games: user.games,
        cost: "$0.00", // Adjust if you have pricing info
        active: user.isActive,
    };
}

function SearchBar() {
    const [allUsers, setAllUsers] = useState<UserInfos[]>([]);
    const [filterText, setFilterText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    // Filtering logic
    const filteredUsers: UserInfos[] = useMemo(() => {
        if (filterText.length === 0) {
            // Show only first 16 users from allUsers
            return allUsers.slice(0, 16);
        }
        return allUsers.filter(user =>
            user.username.toLowerCase().includes(filterText.toLowerCase()) ||
            user.games.some(game => game.toLowerCase().includes(filterText.toLowerCase()))
        );
    }, [allUsers, filterText]);

    useEffect(() => {
        // Fetch all users for search dialog
        const fetchAllUsers = async () => {
            try {
                const users = await GetAllUser();
                // If API returns a single object, wrap in array
                setAllUsers(Array.isArray(users) ? users : [users]);
            } catch (err: any) {
                setError(err?.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };
        fetchAllUsers();
    }, []);
    return (
        <>
            <div className="mb-2 ">
                <div className="flex gap-1 ">
                    <Dialog>
                        <DialogTrigger asChild className="">
                            <div className=" rounded-lg h-9  xl:w-full  bg-zinc-950 hover:bg-zinc-900/50 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                                <Search className="w-5 h-5" />
                                <div className="hidden xl:flex">Search between all users...</div>
                            </div>

                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px] sm:min-h-[800px] sm:max-h-[800px] min-h-[700px] max-h-[700px] overflow-y-scroll sm:overflow-hidden flex flex-col ">
                            <DialogHeader>
                                <DialogTitle className="flex justify-between gap-4">
                                    <Input type="text" placeholder={t("Search")} className="font-normal placeholder:text-sm text-sm" value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                                    <DialogClose className="text-sm text-zinc-400 underline cursor-pointer hover:text-white transition-all duration-300">{t("close")}</DialogClose>
                                </DialogTitle>
                                <div className="h-[1px] bg-zinc-800"></div>
                                <DialogDescription className="h-full">
                                    {filterText.length > 0 ? (
                                        <SearchUserCard users={filteredUsers.map(mapUserInfosToUser)} />
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <div className="text-start">{t("TopCreators")}</div>
                                            <TopCreators users={filteredUsers.map(mapUserInfosToUser)} />
                                        </div>
                                    )}
                                </DialogDescription>

                            </DialogHeader>

                        </DialogContent>
                    </Dialog >
                </div>
            </div>

        </>
    )
}
export default SearchBar