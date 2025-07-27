import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Navbar from "../navbar/navbar"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { DeleteNotification, GetAllNotification, PublishNotification } from "@/api/admin"
import { Trash2 } from "lucide-react"

interface Notifications {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    isPublished: boolean
}

function AdminNotifications() {
    const { t } = useTranslation()
    const [notis, setNotis] = useState<Notifications[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true)
            try {
                const response = await GetAllNotification()
                if (response) {
                    setNotis(response.map((game: any) => ({
                        ...game,
                        id: String(game.id)
                    })))
                }
            } catch (err: any) {
                setError(err.message || t("Unknown error"))
            } finally {
                setLoading(false)
            }
        }
        fetchGames()
        // eslint-disable-next-line
    }, [])

    const handleRemove = async (notiId: string) => {
        setError("")
        try {
            await DeleteNotification(notiId)
            setNotis(prev => prev.filter(noti => noti.id !== notiId))
        } catch (err: any) {
            setError(err.message || t("Failed to delete notification."))
        }
    }

    const formatDate = (isoString: string) => {
        const date = new Date(isoString)
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
    }

    const handlePublish = async (notiId: string) => {
        setError("")
        try {
            await PublishNotification(notiId)
            setNotis(prev =>
                prev.map(noti =>
                    noti.id === notiId ? { ...noti, isPublished: true } : noti
                )
            )
        } catch (err: any) {
            setError(err.message || t("Failed to publish notification."))
        }
    }

    return (
        <div className="w-full xl:h-screen sm:p-2">
            <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                    <Navbar page={t("Admin")} />
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{t("Notifications")}</h2>
                        <Link to="/admin/notifications/create">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all">
                                {t("Add Notification")}
                            </button>
                        </Link>
                    </div>
                    {loading ? (
                        <div>{t("Loading...")}</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t("Title")}</TableHead>
                                    <TableHead>{t("Content")}</TableHead>
                                    <TableHead>{t("Created at")}</TableHead>
                                    <TableHead>{t("Published")}</TableHead>
                                    <TableHead className="text-right">{t("Delete")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {notis.length > 0 ? (
                                    notis.map((noti) => (
                                        <TableRow key={noti.id}>
                                            <TableCell>{noti.title}</TableCell>
                                            <TableCell>{noti.content}</TableCell>
                                            <TableCell>{formatDate(noti.createdAt)}</TableCell>
                                            <TableCell>
                                                {noti.isPublished ? (
                                                    <span className="text-zinc-400">{t("Published")}</span>
                                                ) : (
                                                    <div className="text-orange-500 underline cursor-pointer"
                                                        onClick={() => handlePublish(noti.id)}>
                                                        {t("Publish")}
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    onClick={() => handleRemove(noti.id)}
                                                    className="bg-red-500/20 text-red-500 border border-red-500 hover:bg-red-500/30 cursor-pointer transition-all duration-300"
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell rowSpan={4}>{t("No notification added yet.")}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminNotifications
