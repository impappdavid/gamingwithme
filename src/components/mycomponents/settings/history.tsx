import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import SettingsSidebar from "./settingsSidebar"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getBills } from "@/api/settings";

type Bill = {
    bookingId: string,
    transactionDate: string,
    amount: number,
    transactionType: string,
    otherPartyUsername: string,
    otherPartyAvatarUrl: string
};

function BillHistory() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")
    const [bills, setBills] = useState<Bill[]>([]);
    const filtered = bills.filter(t => t.otherPartyUsername.toLowerCase().includes(search.toLowerCase()))

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const apiUsers = await getBills();
                if (apiUsers && Array.isArray(apiUsers)) {
                    setBills(apiUsers);
                } else {
                    setBills([]);
                }
            } catch (err) {
                setError("Failed to fetch users");
                setBills([]);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <>
            <div className="w-full h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-zinc-950 sm:rounded-2xl border border-zinc-800 relative flex flex-col">
                    <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("settings")} />
                    </div>
                    <div className="flex w-full flex-1">
                        <SettingsSidebar />
                        <div className="w-full p-4 flex flex-col gap-2">
                            <div className="text-2xl font-bold mb-2">Billing History</div>
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
                                {filtered.length === 0 &&
                                    <div className="w-full flex justify-center mt-14">
                                        <div className="text-sm text-zinc-400">You dont have bill history.</div>
                                    </div>
                                }
                                {filtered.map((item) => (
                                    <div key={item.bookingId} className="flex items-center justify-between bg-zinc-800/20 rounded-xl p-1.5 px-2 border border-zinc-800 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <img src={item.otherPartyAvatarUrl} alt="profile" className="w-12 h-12 rounded-lg border" />
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-white">{item.otherPartyUsername}</span>
                                                <div className="flex gap-1 items-center">
                                                    <span className="font-semibold text-zinc-400 text-xs">{item.amount}</span>
                                                    <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                                                    <span className="text-zinc-400 text-xs">{item.transactionDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 min-w-[120px]">
                                            <span className={`text-xs font-bold p-3 px-6 cursor-pointer rounded-xl transition-all duration-300 ${item.transactionType} ${item.transactionType}`}>{item.transactionType}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BillHistory