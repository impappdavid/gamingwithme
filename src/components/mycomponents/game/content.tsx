import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Footer from "../global/footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getGameBySlug, getGameNews, getGameEvents, getGameEasterEggs } from "@/api/admin"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchGameFromRAWG } from "@/api/games"

function Content() {
    const { t } = useTranslation()
    const { slug } = useParams<{ slug: string }>()
    const [game, setGame] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    // Tab data for this game
    const [news, setNews] = useState<any[]>([])
    const [events, setEvents] = useState<any[]>([])
    const [easterEggs, setEasterEggs] = useState<any[]>([])
    // Track loading for each tab
    const [tabLoading, setTabLoading] = useState({ news: false, events: false, eggs: false })
    // Used to display a RAWG image fallback if needed
    const [rawgImage, setRawgImage] = useState<string | null>(null)

    // Load game by slug (from URL)
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

    // Try getting a better cover image from RAWG if fallback is needed
    useEffect(() => {
        const getRawg = async () => {
            if (!game?.name) return
            // Use RAWG if missing or likely low-res/placeholder image
            let shouldFetch = false
            if (!game.thumbnailUrl) shouldFetch = true
            else {
                // Simple check for "pixelated" by filename/substrings
                if (/pixel|small|icon|64|128|256|32|16|\.ico|\.svg/i.test(game.thumbnailUrl)) shouldFetch = true
            }
            if (shouldFetch) {
                const rawg = await fetchGameFromRAWG(game.name)
                if (rawg && rawg.background_image) setRawgImage(rawg.background_image)
                else setRawgImage(null)
            } else {
                setRawgImage(null)
            }
        }
        getRawg()
    }, [game?.thumbnailUrl, game?.name])

    // Load all tab content for this game
    useEffect(() => {
        if (!game?.id) return
        setTabLoading(t => ({ ...t, news: true }))
        getGameNews(game.id)
            .then(data => setNews(Array.isArray(data) ? data : []))
            .catch(() => setNews([]))
            .finally(() => setTabLoading(t => ({ ...t, news: false })))
        setTabLoading(t => ({ ...t, events: true }))
        getGameEvents(game.id)
            .then(data => setEvents(Array.isArray(data) ? data : []))
            .catch(() => setEvents([]))
            .finally(() => setTabLoading(t => ({ ...t, events: false })))
        setTabLoading(t => ({ ...t, eggs: true }))
        getGameEasterEggs(game.id)
            .then(data => setEasterEggs(Array.isArray(data) ? data : []))
            .catch(() => setEasterEggs([]))
            .finally(() => setTabLoading(t => ({ ...t, eggs: false })))
    }, [game?.id])

    return (
        <>
            <div className="w-full h-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Games")} />
                    </div>
                    <div className="w-full flex justify-center ">
                        <div className="w-full max-w-3xl h-full sm:h-screen">
                            {loading ? (
                                <Skeleton className="w-full h-64 rounded-2xl mb-4" />
                            ) : error ? (
                                <div className="text-red-500 p-4">{error}</div>
                            ) : game ? (
                                <>
                                    {(rawgImage || game.thumbnailUrl) ? (
                                        <img
                                            src={rawgImage || game.thumbnailUrl}
                                            alt={game.name}
                                            className="w-full h-80 object-cover  mb-4"
                                            style={{ minWidth: '100%', minHeight: '20rem', background: '#222' }}
                                        />
                                    ) : (
                                        <div className="w-full h-80 rounded-2xl mb-4 flex items-center justify-center bg-zinc-800 text-zinc-400">No picture</div>
                                    )}
                                    <div className="text-3xl font-bold mb-2">{game.name}</div>
                                    <div className="text-zinc-400 mb-4">{game.description}</div>
                                    <Tabs defaultValue="news" >
                                        <TabsList className="grid grid-cols-3 w-full sticky top-17.5 bg-black/40 backdrop-blur-2xl">
                                            <TabsTrigger value="news">News</TabsTrigger>
                                            <TabsTrigger value="events">Events</TabsTrigger>
                                            <TabsTrigger value="eastereggs">Easter eggs</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="news" className="min-h-[500px]">
                                            {tabLoading.news ? <Skeleton className="w-full h-32 " /> : (
                                                <div className="flex flex-col gap-4">
                                                    {news.length === 0 && <div className="text-zinc-400">No news yet.</div>}
                                                    {news.map((n: any) => (
                                                        <div key={n.id} className="border-b w-full flex flex-col gap-2 p-4 px-4 bg-black ">
                                                            <div className="flex justify-between items-center">
                                                                <div className="text-2xl">{n.title}</div>
                                                                <div className="text-xs text-zinc-400">{n.publishedAt}</div>
                                                            </div>
                                                            <div className=" text-sm text-zinc-300">{n.content}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </TabsContent>
                                        <TabsContent value="events" className="min-h-[500px]">
                                            {tabLoading.events ? <Skeleton className="w-full h-32 " /> : (
                                                <div className="flex flex-col gap-4">
                                                    {events.length === 0 && <div className="text-zinc-400">No events yet.</div>}
                                                    {events.map((ev: any) => (
                                                        <div key={ev.id} className="w-full p-4 border-b border-l-4 border-l-green-500 flex flex-col gap-2 bg-black">
                                                            <div className="flex justify-between items-center">
                                                                <div className="text-2xl">{ev.title}</div>
                                                                <div className=" p-1 px-2 bg-green-500/40 h-fit rounded-md text-xs">{ev.status || "EVENT"}</div>
                                                            </div>
                                                            <div className="grid sm:grid-cols-4 gap-4">
                                                                <div className="flex flex-col">
                                                                    <div className="text-xs text-zinc-400">Date</div>
                                                                    <div className="text-sm">{ev.startDate} - {ev.endDate}</div>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <div className="text-xs text-zinc-400">Prize pool</div>
                                                                    <div className="text-sm">{ev.prizePool}</div>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <div className="text-xs text-zinc-400">Teams</div>
                                                                    <div className="text-sm">{ev.numberOfTeams}</div>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <div className="text-xs text-zinc-400">Location</div>
                                                                    <div className="text-sm">{ev.location}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </TabsContent>
                                        <TabsContent value="eastereggs" className="min-h-[500px]">
                                            {tabLoading.eggs ? <Skeleton className="w-full h-32 " /> : (
                                                <div className="flex flex-col gap-4">
                                                    {easterEggs.length === 0 && <div className="text-zinc-400">No easter eggs yet.</div>}
                                                    {easterEggs.map((egg: any) => (
                                                        <div key={egg.id} className="p-4 w-full flex flex-col gap-2 border-b bg-zinc-900/40 rounded-xl">
                                                            <div>{egg.description}</div>
                                                            {egg.imageUrl && <img src={egg.imageUrl} alt="easteregg" className="rounded-2xl w-64 h-32 object-cover" />}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </TabsContent>
                                    </Tabs>
                                </>
                            ) : null}
                            <div className=" sm:mt-24">
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Content
