import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import SettingsSidebar from "./settingsSidebar"
import { useEffect, useState, useMemo } from "react"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { BookingRefund, getUpcomingBookings, GetUpcomingServices } from "@/api/settings";
import { Skeleton } from "@/components/ui/skeleton";

// Bookings type
type Book = {
    bookingId: string,
    startTime: Date | string,
    duration: string,
    otherPartyUsername: string,
    otherPartyAvatarUrl: string
};

// Services type
export interface ServiceOrder {
    id: string,
    serviceId: string,
    serviceTitle: string,
    customerUsername: string,
    providerName: string,
    status: boolean,
    orderDate: string,
    deliveryDeadline: string,
    completedDate: string,
    price: number,
    customerNotes: string,
    providerNotes: string,
    isOverdue: boolean
}

// Helper
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

type UnifiedItem =
    | ({ type: "booking" } & Book)
    | ({ type: "service" } & ServiceOrder);

function ActiveHistory() {
    const { t } = useTranslation()
    const [search, setSearch] = useState("")
    const [books, setBooks] = useState<Book[]>([]);
    const [services, setServices] = useState<ServiceOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Service state
    const [servicesLoading, setServicesLoading] = useState(true);
    const [servicesError, setServicesError] = useState<string | null>(null);

    // Demo provider (replace with real)
    const asProvider = "yourProviderIdOrUsername";

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const apiUsers = await getUpcomingBookings();
                setBooks(apiUsers && Array.isArray(apiUsers) ? apiUsers : []);
            } catch (err) {
                setError("Failed to fetch bookings");
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            setServicesLoading(true);
            setServicesError(null);
            try {
                const upcoming = await GetUpcomingServices(false);
                setServices(upcoming ?? []);
            } catch (e) {
                setServicesError("Failed to fetch services");
                setServices([]);
            } finally {
                setServicesLoading(false);
            }
        };
        fetchServices();
    }, [asProvider]);

    // Unify both lists, add a 'type' field for rendering
    const unified: UnifiedItem[] = useMemo(() => {
        const mappedBookings: UnifiedItem[] = books.map(b => ({
            ...b,
            type: "booking"
        }))
        const mappedServices: UnifiedItem[] = services.map(s => ({
            ...s,
            type: "service"
        }))
        // Sort all together by upcoming date (startTime/orderDate)
        return [...mappedBookings, ...mappedServices].sort((a, b) => {
            const aDate = a.type === "booking" ? new Date(a.startTime) : new Date(a.orderDate);
            const bDate = b.type === "booking" ? new Date(b.startTime) : new Date(b.orderDate);
            return aDate.getTime() - bDate.getTime();
        });
    }, [books, services]);

    // Unified filter search (booking: username, service: customerUsername/providerName)
    const filtered = useMemo(() => {
        const s = search.trim().toLowerCase();
        if (!s) return unified;
        return unified.filter(item => {
            if (item.type === "booking") {
                return item.otherPartyUsername.toLowerCase().includes(s);
            } else {
                return (
                    item.customerUsername.toLowerCase().includes(s) ||
                    item.providerName.toLowerCase().includes(s)
                );
            }
        });
    }, [unified, search]);

    const refundBooking = async (id: string) => {
        try {
            await BookingRefund(id)
        } catch (error) {
            console.log(error)
        }
    }



    const isLoading = loading || servicesLoading;
    const anyError = error || servicesError;

    return (
        <div className="w-full h-screen sm:p-2">
            <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 relative flex flex-col">
                <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                    <Navbar page={t("settings")} />
                </div>
                <div className="flex w-full flex-1">
                    <SettingsSidebar />
                    <div className="w-full p-4 flex flex-col gap-2">
                        <div className="flex flex-col gap-0.5 mb-3">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="h-5 w-5 text-zinc-500" />
                                </div>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Search by username"
                                    className="pl-10 h-10 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    required
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
                                <div className="flex flex-col items-center justify-center h-24 text-center">
                                    <div className="text-md mb-1">❌</div>
                                    <h3 className="text-md font-semibold text-red-400 mb-1">Error</h3>
                                    <p className="text-zinc-400 max-w-md text-xs">{anyError}</p>
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="w-full flex justify-center mt-14">
                                    <div className="text-sm text-zinc-400">No upcoming transactions or services.</div>
                                </div>
                            ) : (
                                filtered.map(item =>
                                    item.type === "booking" ? (
                                        <div key={`b-${item.bookingId}`} className="flex items-center justify-between bg-zinc-800/20 rounded-xl p-1.5 px-2 border border-zinc-800 shadow-sm">
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
                                                <span className="text-xs text-zinc-400 mb-1">{getTimeUntil(item.startTime).label} left</span>
                                                {getTimeUntil(item.startTime).canRefund ? (
                                                    <span className="text-xs font-bold p-3 px-6 cursor-pointer rounded-xl transition-all duration-300 bg-zinc-800 hover:bg-zinc-700/80" onClick={() => refundBooking(item.bookingId)}>Refund</span>
                                                ) : (
                                                    <span className="text-xs font-bold p-3 px-6 rounded-xl transition-all duration-300 bg-zinc-800/40">Final</span>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={`s-${item.id}`} className="flex items-center justify-between bg-zinc-800/20 rounded-xl p-1.5 px-2 border border-zinc-800 shadow-sm">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-white">{item.serviceTitle}</span>
                                                <span className="text-zinc-400 text-xs">{item.customerUsername}</span>
                                                <span className="text-zinc-400 text-xs">Order date: {item.orderDate}</span>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 min-w-[120px]">
                                                <span className="text-zinc-400 text-xs">Price: ${item.price.toFixed(2)}</span>
                                                <span className={`text-xs font-bold p-2 px-4 rounded-xl transition-all duration-300 ${item.isOverdue ? "bg-red-900 text-red-200" : "bg-zinc-800/40 text-white"}`}>
                                                    {item.isOverdue ? "Overdue" : "On time"}
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
    );
}

export default ActiveHistory
