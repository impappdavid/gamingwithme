import { getNotifications } from "@/api/navbar";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Bell, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Notification = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    isPublished: boolean;
};

const mapApiNotificationToUI = (apiNotification: any): Notification => ({
    id: apiNotification.id,
    title: apiNotification.title,
    content: apiNotification.content,
    createdAt: apiNotification.createdAt,
    isPublished: apiNotification.isPublished,
});

function Notifications() {
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            try {
                const apiNotifications = await getNotifications(true);
                if (Array.isArray(apiNotifications)) {
                    setNotifications(apiNotifications.map(mapApiNotificationToUI));
                } else {
                    setNotifications([]);
                }
            } catch (err) {
                setError("Failed to fetch notifications");
                setNotifications([]);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative rounded-lg h-9 w-9 bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                    <Bell className="w-5 h-5" />
                    {/* Always show animated notification badge. If you want to tie to notification count/unread, update here! */}
                    <div className="absolute -top-1 -right-1">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500/80"></span>
                        </span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] sm:min-h-[800px] min-h-[700px] max-h-[800px] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex justify-between">
                        {t("Notification")}
                        <DialogClose>
                            <X className="w-5 h-5 cursor-pointer" />
                        </DialogClose>
                    </DialogTitle>
                </DialogHeader>
                {/* Main notification listing area */}
                <div className="flex-1 overflow-y-auto border-t">
                    {loading ? (
                        <p className="p-4 text-center text-zinc-400">{t("Loading notifications...")}</p>
                    ) : error ? (
                        <p className="p-4 text-center text-red-500">{error}</p>
                    ) : notifications.length === 0 ? (
                        <p className="p-4 text-center text-zinc-400">{t("No notifications yet.")}</p>
                    ) : (
                        notifications.map((noti, index) => (
                            <div
                                key={noti.id ?? index}
                                className="hover:bg-zinc-900/40 cursor-pointer flex flex-col gap-2 p-2 py-3 border-b last:border-b-0"
                            >
                                <div className="flex justify-between">
                                    <div className="flex gap-2 items-center">
                                        {/* Hardcoded profile logo. To make dynamic, use noti.image or similar when available. */}
                                        <img
                                            src="/logo.png"
                                            alt={noti.title ?? "Notification profile"}
                                            className="w-12 h-12 rounded-md object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <div className="text-white text-lg text-start">{noti.title}</div>
                                            <div className="text-sm text-start">
                                                <span className="text-zinc-400">{noti.content}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* Optional: <Button onClick={() => setNotifications([])}>Clear All</Button> */}
            </DialogContent>
        </Dialog>
    );
}

export default Notifications;
