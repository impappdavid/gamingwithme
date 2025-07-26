import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import SettingsSidebar from "./settingsSidebar"
import { useEffect, useState, useMemo } from "react"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getBills, GetUpcomingServices, type ServiceOrder } from "@/api/settings";
import type { Bill } from "@/api/types";
import { Skeleton } from "@/components/ui/skeleton";

type UnifiedBillOrService =
  | ({ type: "bill" } & Bill)
  | ({ type: "service" } & ServiceOrder);

function BillHistory() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")
    const [bills, setBills] = useState<Bill[]>([]);
    const [services, setServices] = useState<ServiceOrder[]>([]);
    const [loadingBills, setLoadingBills] = useState(true);
    const [loadingServices, setLoadingServices] = useState(true);
    const [billError, setBillError] = useState<string | null>(null);
    const [serviceError, setServiceError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBills = async () => {
            setLoadingBills(true);
            try {
                const apiBills = await getBills();
                setBills(apiBills ?? []);
            } catch (err) {
                setBillError("Failed to fetch billing history");
                setBills([]);
            } finally {
                setLoadingBills(false);
            }
        };
        fetchBills();
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            setLoadingServices(true);
            try {
                const apiServices = await GetUpcomingServices(false); // Implement or adjust this fetch function to get service billing history
                setServices(apiServices ?? []);
            } catch (err) {
                setServiceError("Failed to fetch service history");
                setServices([]);
            } finally {
                setLoadingServices(false);
            }
        };
        fetchServices();
    }, []);

    // Unify and sort by billing date
    const unified: UnifiedBillOrService[] = useMemo(() => {
        const mappedBills: UnifiedBillOrService[] = bills.map(b => ({ ...b, type: "bill" }));
        const mappedServices: UnifiedBillOrService[] = services.map(s => ({ ...s, type: "service" }));
        // For services, use completedDate (or orderDate) as the bill date; adjust as needed
        return [...mappedBills, ...mappedServices].sort((a, b) => {
            const getDate = (item: UnifiedBillOrService) => item.type === "bill"
                ? new Date(item.transactionDate)
                : new Date(item.completedDate || item.orderDate);
            return getDate(b).getTime() - getDate(a).getTime(); // Newest first
        });
    }, [bills, services]);

    // Filter by username or (optional) service title
    const filtered = useMemo(() => {
        const s = search.trim().toLowerCase();
        if (!s) return unified;
        return unified.filter(item => {
            if (item.type === "bill") {
                return item.otherPartyUsername.toLowerCase().includes(s);
            } else {
                return (
                    item.customerUsername.toLowerCase().includes(s) ||
                    item.providerName.toLowerCase().includes(s) ||
                    (item.serviceTitle && item.serviceTitle.toLowerCase().includes(s))
                );
            }
        });
    }, [unified, search]);

    const isLoading = loadingBills || loadingServices;
    const anyError = billError || serviceError;

    return (
        <div className="w-full h-screen sm:p-2">
            <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 relative flex flex-col">
                <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                    <Navbar page={t("settings")} />
                </div>
                <div className="flex w-full flex-1">
                    <SettingsSidebar />
                    <div className="w-full p-4 flex flex-col gap-2">
                        <div className="text-2xl font-bold mb-2">Billing History</div>
                        <div className="flex flex-col gap-0.5 mb-3">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="h-5 w-5 text-zinc-500" />
                                </div>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Search by username or service title"
                                    className="pl-10 h-10 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            {isLoading ? (
                                Array.from({ length: 4 }).map((_, idx) => (
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
                            ) : anyError ? (
                                <div className="flex items-center justify-center mt-14">
                                    <div className="text-sm text-red-400">{anyError}</div>
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="flex items-center justify-center mt-14">
                                    <div className="text-sm text-zinc-400">You don't have any billing or service history.</div>
                                </div>
                            ) : (
                                filtered.map((item) =>
                                    item.type === "bill" ? (
                                        <div key={"bill-" + (item.bookingId || item.bookingId)} className="flex items-center justify-between bg-zinc-800/20 rounded-xl p-1.5 px-2 border border-zinc-800 shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <img src={item.otherPartyAvatarUrl} alt="profile" className="w-12 h-12 rounded-lg border" />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-white">{item.otherPartyUsername}</span>
                                                    <div className="flex gap-1 items-center">
                                                        <span className="font-semibold text-zinc-400 text-xs">${item.amount}</span>
                                                        <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                                                        <span className="text-zinc-400 text-xs">{item.transactionDate}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 min-w-[120px]">
                                                <span className={
                                                    "text-xs font-bold p-2 px-4 rounded-xl transition-all duration-300 " +
                                                    (item.transactionType === "refund"
                                                        ? "bg-red-900 text-red-200"
                                                        : "bg-zinc-800/40 text-white")
                                                }>
                                                    {item.transactionType}
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={"service-" + item.id} className="flex items-center justify-between bg-zinc-800/20 rounded-xl p-1.5 px-2 border border-zinc-800 shadow-sm">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-white">{item.serviceTitle}</span>
                                                <div className="flex gap-1 items-center">
                                                    <span className="font-semibold text-zinc-400 text-xs">${item.price}</span>
                                                    <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                                                    <span className="text-zinc-400 text-xs">{item.completedDate || item.orderDate}</span>
                                                </div>
                                                <span className="text-zinc-400 text-xs">{item.customerUsername} → {item.providerName}</span>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 min-w-[120px]">
                                                <span className={
                                                    "text-xs font-bold p-2 px-4 rounded-xl transition-all duration-300 " +
                                                    (item.isOverdue
                                                        ? "bg-red-900 text-red-200"
                                                        : "bg-zinc-800/40 text-white")
                                                }>
                                                    Service
                                                </span>
                                            </div>
                                        </div>
                                    )
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillHistory
