import { useState } from "react"
import { useTranslation } from "react-i18next"
import Navbar from "../navbar/navbar"
import { AddNewNotification } from "@/api/admin"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"




function AddNewNoti() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [title, setName] = useState("")
    const [content, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccess("")
        setError("")
        // Use RAWG image if selected, else random
        try {
            await AddNewNotification(title, content)
            setSuccess("Game added successfully!")
            navigate("/admin/notifications")
            setName("")
            setDescription("")
        } catch (err: any) {
            setError(err.message || "Failed to add game.")
        } finally {
            setLoading(false)
        }
    }

   

    

    return (
        <>
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Admin")} />
                    </div>
                    <div className="p-4 max-w-xl mx-auto">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 rounded-xl ">
                            <label className="font-semibold">{t("Notification Title")}</label>
                            <Input
                                type="text"
                                value={title}
                                onChange={e => setName(e.target.value)}
                                placeholder={t("Enter notification title") || "Enter notification title"}
                                className="h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300"
                                required
                                autoComplete="off"
                            />
                            <label className="font-semibold">{t("Content")}</label>
                            <Textarea
                                className="h-20 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300 resize-none"
                                value={content}
                                onChange={e => setDescription(e.target.value)}
                                placeholder={t("Enter notification content") || "Enter notification content"}
                                required
                            />
                            <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                                {loading ? t("Adding...") : t("Add Notification")}
                            </Button>
                            {success && <div className="text-green-500">{success}</div>}
                            {error && <div className="text-red-500">{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddNewNoti