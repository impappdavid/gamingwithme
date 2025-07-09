import Navbar from "../global/navbar"
import { useTranslation } from "react-i18next"
import SettingsSidebar from "./settingsSidebar"
import { useState } from "react"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const transactions = [
    {
        id: 1,
        profile: "/profile/9.jpg",
        name: "James",
        other: "Alex",
        type: "From",
        amount: "$25.00",
        ago: "2 hours ago",
        status: "Received",
        statusColor: "text-green-500",
        statusBg: "bg-green-500/10 hover:bg-green-500/20",
    },
    {
        id: 2,
        profile: "/profile/10.jpg",
        name: "Alex",
        other: "James",
        type: "To",
        amount: "$12.00",
        ago: "1 day ago",
        status: "Sent",
        statusColor: "text-blue-400",
        statusBg: "bg-blue-500/10 hover:bg-blue-500/20",
    },
    {
        id: 3,
        profile: "/profile/11.jpg",
        name: "James",
        other: "Alex",
        type: "From",
        amount: "$25.00",
        ago: "3 days ago",
        status: "Received",
        statusColor: "text-green-500",
        statusBg: "bg-green-500/10 hover:bg-green-500/20",
    }
];

function BillHistory() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")
    const filtered = transactions.filter(t => t.name.toLowerCase().includes(search.toLowerCase()))
    return (
        <>
            <div className="w-full h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-zinc-900 sm:rounded-2xl border border-zinc-800 relative flex flex-col">
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
                                {filtered.length === 0 && <div className="text-zinc-400">No transactions found.</div>}
                                {filtered.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between bg-zinc-800/20 rounded-xl p-1.5 px-2 border border-zinc-800 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <img src={item.profile} alt="profile" className="w-12 h-12 rounded-lg border" />
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-white">{item.name}</span>
                                                <div className="flex gap-1 items-center">
                                                    <span className="font-semibold text-zinc-400 text-xs">{item.amount}</span>
                                                    <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                                                    <span className="text-zinc-400 text-xs">{item.ago}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 min-w-[120px]">
                                            <span className={`text-xs font-bold p-3 px-6 cursor-pointer rounded-xl transition-all duration-300 ${item.statusColor} ${item.statusBg}`}>{item.status}</span>
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