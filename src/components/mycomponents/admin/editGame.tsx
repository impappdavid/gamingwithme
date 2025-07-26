import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Navbar from "../navbar/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useParams } from "react-router-dom"
import {
    getGameBySlug,
    updateGame,
    getGameNews,
    addGameNews,
    deleteGameNews,
    getGameEvents,
    addGameEvent,
    deleteGameEvent,
    getGameEasterEggs,
    addGameEasterEgg,
    deleteGameEasterEgg
} from "@/api/admin"

function EditGame() {
    const { t } = useTranslation()
    const { slug } = useParams<{ slug: string }>()
    // Core game editing state
    const [game, setGame] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState("")

    // News state
    const [news, setNews] = useState<any[]>([])
    const [newsTitle, setNewsTitle] = useState("")
    const [newsContent, setNewsContent] = useState("")
    const [newsLoading, setNewsLoading] = useState(false)
    // Events state
    const [events, setEvents] = useState<any[]>([])
    const [eventForm, setEventForm] = useState({ title: "", startDate: "", endDate: "", prizePool: "", numberOfTeams: 2, location: "" })
    const [eventsLoading, setEventsLoading] = useState(false)
    // Easter Eggs state
    const [easterEggs, setEasterEggs] = useState<any[]>([])
    const [eggDescription, setEggDescription] = useState("")
    const [eggImage, setEggImage] = useState<File | null>(null)
    const [eggsLoading, setEggsLoading] = useState(false)

    // Fetch base game data on slug change
    useEffect(() => {
        const fetchGame = async () => {
            setLoading(true)
            setError("")
            try {
                const data = await getGameBySlug(slug!)
                setGame(data)
            } catch (err: any) {
                setError("Failed to fetch game.")
            } finally {
                setLoading(false)
            }
        }
        if (slug) fetchGame()
    }, [slug])

    // When core game (by id) is loaded, fetch all content tabs
    useEffect(() => {
        if (!game?.id) return
        // News
        setNewsLoading(true)
        getGameNews(game.id)
            .then(data => setNews(Array.isArray(data) ? data : []))
            .catch(() => setNews([]))
            .finally(() => setNewsLoading(false))
        // Events
        setEventsLoading(true)
        getGameEvents(game.id)
            .then(data => setEvents(Array.isArray(data) ? data : []))
            .catch(() => setEvents([]))
            .finally(() => setEventsLoading(false))
        // Easter Eggs
        setEggsLoading(true)
        getGameEasterEggs(game.id)
            .then(data => setEasterEggs(Array.isArray(data) ? data : []))
            .catch(() => setEasterEggs([]))
            .finally(() => setEggsLoading(false))
    }, [game?.id])

    // For editing basic fields (input fields use "name" matched to keys in game)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setGame({ ...game, [e.target.name]: e.target.value })
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setSuccess("")
        setError("")
        try {
            await updateGame(game)
            setSuccess("Game updated successfully!")
        } catch (err: any) {
            setError("Failed to update game.")
        } finally {
            setSaving(false)
        }
    }

    // Add News
    const handleAddNews = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newsTitle || !newsContent) return
        await addGameNews(game.id, newsTitle, newsContent)
        setNewsTitle("")
        setNewsContent("")
        const data = await getGameNews(game.id)
        setNews(Array.isArray(data) ? data : [])
    }
    // Delete News
    const handleDeleteNews = async (newsId: string) => {
        await deleteGameNews(newsId)
        const data = await getGameNews(game.id)
        setNews(Array.isArray(data) ? data : [])
    }

    // Add Event
    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault()
        await addGameEvent(game.id, eventForm)
        setEventForm({ title: "", startDate: "", endDate: "", prizePool: "", numberOfTeams: 2, location: "" })
        const data = await getGameEvents(game.id)
        setEvents(Array.isArray(data) ? data : [])
    }
    // Delete Event
    const handleDeleteEvent = async (eventId: string) => {
        await deleteGameEvent(game.id, eventId)
        const data = await getGameEvents(game.id)
        setEvents(Array.isArray(data) ? data : [])
    }

    // Add Easter Egg
    const handleAddEgg = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!eggDescription || !eggImage) return
        await addGameEasterEgg(game.id, eggDescription, eggImage)
        setEggDescription("")
        setEggImage(null)
        const data = await getGameEasterEggs(game.id)
        setEasterEggs(Array.isArray(data) ? data : [])
    }
    // Delete Easter Egg
    const handleDeleteEgg = async (eggId: string) => {
        await deleteGameEasterEgg(game.id, eggId)
        const data = await getGameEasterEggs(game.id)
        setEasterEggs(Array.isArray(data) ? data : [])
    }

    return (
        <>
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Admin")} />
                    </div>
                    <div className="p-4 max-w-xl mx-auto">
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div className="text-red-500">{error}</div>
                        ) : game ? (
                            <form onSubmit={handleSave} className="flex flex-col gap-4 p-6 rounded-xl">
                                <label className="font-semibold">{t("Game Name")}</label>
                                <Input
                                    name="name"
                                    type="text"
                                    value={game.name}
                                    onChange={handleChange}
                                    className="h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300"
                                    required
                                />
                                <label className="font-semibold">{t("Description")}</label>
                                <Textarea
                                    name="description"
                                    className="h-20 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300 resize-none"
                                    value={game.description}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="font-semibold">{t("Slug")}</label>
                                <Input
                                    name="slug"
                                    type="text"
                                    value={game.slug}
                                    onChange={handleChange}
                                    className="h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300"
                                    required
                                />
                                <label className="font-semibold">{t("Thumbnail URL")}</label>
                                <Input
                                    name="thumbnailUrl"
                                    type="text"
                                    value={game.thumbnailUrl}
                                    onChange={handleChange}
                                    className="h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300"
                                />
                                <Button type="submit" disabled={saving} className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                                    {saving ? t("Saving...") : t("Save Changes")}
                                </Button>
                                {success && <div className="text-green-500">{success}</div>}
                                {error && <div className="text-red-500">{error}</div>}
                            </form>
                        ) : null}
                        {/* Tabs for News, Events, Easter Eggs */}
                        <div className="mt-8">
                            <Tabs defaultValue="news">
                                <TabsList className="w-full">
                                    <TabsTrigger value="news">News</TabsTrigger>
                                    <TabsTrigger value="events">Events</TabsTrigger>
                                    <TabsTrigger value="eastereggs">Easter Eggs</TabsTrigger>
                                </TabsList>
                                <TabsContent value="news" className="min-h-[300px]">
                                    <div className="p-4 flex flex-col gap-4">
                                        <form onSubmit={handleAddNews} className="flex flex-col gap-2 mb-4">
                                            <Input value={newsTitle} onChange={e => setNewsTitle(e.target.value)} placeholder="Title" required />
                                            <Textarea value={newsContent} onChange={e => setNewsContent(e.target.value)} placeholder="Content" required />
                                            <Button type="submit" className="w-fit">Add News</Button>
                                        </form>
                                        {newsLoading ? <div>Loading...</div> : (
                                            <div className="flex flex-col gap-2">
                                                {news.length === 0 && <div>No news yet.</div>}
                                                {news.map((n: any) => (
                                                    <div key={n.id} className="border border-zinc-800 rounded p-2 flex flex-col gap-1 bg-zinc-900/40">
                                                        <div className="font-bold">{n.title}</div>
                                                        <div className="text-xs text-zinc-400">{n.publishedAt}</div>
                                                        <div>{n.content}</div>
                                                        <Button variant="destructive" className="w-fit mt-2" onClick={() => handleDeleteNews(n.id)}>Delete</Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value="events" className="min-h-[300px]">
                                    <div className="p-4 flex flex-col gap-4">
                                        <form onSubmit={handleAddEvent} className="flex flex-col gap-2 mb-4">
                                            <Input value={eventForm.title} onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" required />
                                            <Input type="date" value={eventForm.startDate} onChange={e => setEventForm(f => ({ ...f, startDate: e.target.value }))} required />
                                            <Input type="date" value={eventForm.endDate} onChange={e => setEventForm(f => ({ ...f, endDate: e.target.value }))} required />
                                            <Input value={eventForm.prizePool} onChange={e => setEventForm(f => ({ ...f, prizePool: e.target.value }))} placeholder="Prize Pool" required />
                                            <Input type="number" value={eventForm.numberOfTeams} onChange={e => setEventForm(f => ({ ...f, numberOfTeams: Number(e.target.value) }))} placeholder="Number of Teams" required />
                                            <Input value={eventForm.location} onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))} placeholder="Location" required />
                                            <Button type="submit" className="w-fit">Add Event</Button>
                                        </form>
                                        {eventsLoading ? <div>Loading...</div> : (
                                            <div className="flex flex-col gap-2">
                                                {events.length === 0 && <div>No events yet.</div>}
                                                {events.map((ev: any) => (
                                                    <div key={ev.id} className="border border-zinc-800 rounded p-2 flex flex-col gap-1 bg-zinc-900/40">
                                                        <div className="font-bold">{ev.title}</div>
                                                        <div className="text-xs text-zinc-400">{ev.startDate} - {ev.endDate}</div>
                                                        <div>Prize Pool: {ev.prizePool}</div>
                                                        <div>Teams: {ev.numberOfTeams}</div>
                                                        <div>Location: {ev.location}</div>
                                                        <Button variant="destructive" className="w-fit mt-2" onClick={() => handleDeleteEvent(ev.id)}>Delete</Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value="eastereggs" className="min-h-[300px]">
                                    <div className="p-4 flex flex-col gap-4">
                                        <form onSubmit={handleAddEgg} className="flex flex-col gap-2 mb-4">
                                            <Textarea value={eggDescription} onChange={e => setEggDescription(e.target.value)} placeholder="Description" required />
                                            <Input type="file" accept="image/*" onChange={e => setEggImage(e.target.files?.[0] || null)} required />
                                            <Button type="submit" className="w-fit">Add Easter Egg</Button>
                                        </form>
                                        {eggsLoading ? <div>Loading...</div> : (
                                            <div className="flex flex-col gap-2">
                                                {easterEggs.length === 0 && <div>No easter eggs yet.</div>}
                                                {easterEggs.map((egg: any) => (
                                                    <div key={egg.id} className="border border-zinc-800 rounded p-2 flex flex-col gap-1 bg-zinc-900/40">
                                                        <div>{egg.description}</div>
                                                        {egg.imageUrl && <img src={egg.imageUrl} alt="Easter Egg" className="w-32 h-20 object-cover rounded" />}
                                                        <Button variant="destructive" className="w-fit mt-2" onClick={() => handleDeleteEgg(egg.id)}>Delete</Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditGame
