import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import SettingsSidebar from "./settingsSidebar"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getUpcomingBookings } from "@/api/settings";
import { Skeleton } from "@/components/ui/skeleton";

type Book = {
    bookingId: string,
    startTime: Date,
    duration: string,
    otherPartyUsername: string,
    otherPartyAvatarUrl: string
  };

// Helper to get time until booking in human readable form
function getTimeUntil(startTime: Date | string): { label: string, canRefund: boolean } {
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = start.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    if (diffMinutes >= 60) {
        const hours = Math.floor(diffMinutes / 60);
        return { label: `${hours} hour${hours > 1 ? 's' : ''}`, canRefund: true };
    } else if (diffMinutes > 0) {
        return { label: `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`, canRefund: false };
    } else {
        return { label: 'Started', canRefund: false };
    }
}

function ActiveHistory() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")
    const [books, setBooks] = useState<Book[]>([]);

    const filtered = books.filter(t => t.otherPartyUsername.toLowerCase().includes(search.toLowerCase()))
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchUsers = async () => {
          setLoading(true);
          try {
            const apiUsers = await getUpcomingBookings();
            if (apiUsers && Array.isArray(apiUsers)) {
                setBooks(apiUsers);
            } else {
                setBooks([]);
            }
          } catch (err) {
            setError("Failed to fetch users");
            setBooks([]);
          } finally {
            setLoading(false);
          }
        };
        fetchUsers();
      }, []);


    return (
        <>
            <div className="w-full h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 relative flex flex-col">
                    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("settings")} />
                    </div>
                    <div className="flex w-full flex-1">
                        <SettingsSidebar />
                        <div className="w-full p-4 flex flex-col gap-2">
                            <div className="text-2xl font-bold mb-2">Active History</div>
                            <div className="flex flex-col gap-0.5">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Search className="h-5 w-5 text-zinc-500" />
                                    </div>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Search by username"
                                        className="pl-10 h-10 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300  "
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                {loading ? (
                                    Array.from({ length: 3 }).map((_, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-zinc-800/20 rounded-xl p-1.5 px-2 border border-zinc-800 shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <Skeleton className="w-12 h-12 rounded-lg" />
                                                <div className="flex flex-col gap-2">
                                                    <Skeleton className="w-24 h-4" />
                                                    <Skeleton className="w-16 h-3" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 min-w-[120px]">
                                                <Skeleton className="w-20 h-4 mb-1" />
                                                <Skeleton className="w-16 h-6" />
                                            </div>
                                        </div>
                                    ))
                                ) : error ? (
                                    <div className="flex flex-col items-center justify-center h-24 text-center">
                                        <div className="text-md mb-1">❌</div>
                                        <h3 className="text-md font-semibold text-red-400 mb-1">Error</h3>
                                        <p className="text-zinc-400 max-w-md text-xs">{error}</p>
                                    </div>
                                ) : filtered.length === 0 ? (
                                    <div className="w-full flex justify-center mt-14">
                                        <div className="text-sm text-zinc-400">You dont have active transaction.</div>
                                    </div>
                                ) : (
                                    filtered.map((item) => {
                                        const { label, canRefund } = getTimeUntil(item.startTime);
                                        return (
                                            <div key={item.bookingId} className="flex items-center justify-between bg-zinc-800/20 rounded-xl p-1.5 px-2 border border-zinc-800 shadow-sm">
                                                <div className="flex items-center gap-4">
                                                    <img src={item.otherPartyAvatarUrl} alt="profile" className="w-12 h-12 rounded-lg border" />
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-white">{item.otherPartyUsername}</span>
                                                        <div className="flex gap-1 items-center">
                                                            <span className="font-semibold text-zinc-400 text-xs">$19</span>
                                                            <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                                                            <span className="text-zinc-400 text-xs">{item.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1 min-w-[120px]">
                                                    <span className="text-xs text-zinc-400 mb-1">{label} left</span>
                                                    {canRefund ? (
                                                        <span className={`text-xs font-bold p-3 px-6 cursor-pointer rounded-xl transition-all duration-300 bg-zinc-800 hover:bg-zinc-700/80`}>Refund</span>
                                                    ) : (
                                                        <span className={`text-xs font-bold p-3 px-6 rounded-xl transition-all duration-300 bg-zinc-800/40 `}>Final</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ActiveHistory