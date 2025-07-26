import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Navbar from "../navbar/navbar"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Link } from "react-router-dom"
import { getAllGames } from "@/api"

interface Game {
    id: string,
    name: string,
    description: string,
    slug: string,
    thumbnailUrl: string
}

function AdminGamesC() {
    const { t } = useTranslation()
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true)
            try {
                // getAllGames returns the list of all games from backend
                const response = await getAllGames()
                if (response) {
                    // Make sure id is string for each game (defensive for legacy data)
                    setGames(response.map((game: any) => ({
                        ...game,
                        id: String(game.id),
                    })))
                }
            } catch (err: any) {
                setError(err.message || "Unknown error")
            } finally {
                setLoading(false)
            }
        }
        fetchGames()
    }, [])

    return (
        <>
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    {/* Navbar at top */}
                    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Admin")} />
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{t("Games")}</h2>
                            <Link to="/admin/games/create">
                                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all">{t("Add Game")}</button>
                            </Link>
                        </div>
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div className="text-red-500">{error}</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t("Name")}</TableHead>
                                        <TableHead>{t("Description")}</TableHead>
                                        <TableHead>{t("Slug")}</TableHead>
                                        <TableHead>{t("Thumbnail")}</TableHead>
                                        <TableHead>{t("Edit")}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {games.length > 0 ? (
                                        <>
                                            {games.map((game) => (
                                                <TableRow key={game.id}>
                                                    <TableCell>{game.name}</TableCell>
                                                    <TableCell>{game.description}</TableCell>
                                                    <TableCell>{game.slug}</TableCell>
                                                    <TableCell>
                                                        {game.thumbnailUrl ? (
                                                            <img src={game.thumbnailUrl} alt={game.name} className="w-16 h-10 object-cover rounded" />
                                                        ) : (
                                                            <span className="text-zinc-400">No image</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link to={`/admin/games/edit/${game.slug}`} className="text-blue-600 hover:underline">{t("Edit")}</Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>
                                    ) : (
                                        <TableRow>
                                            {/* Show a message if no games exist */}
                                            <TableCell colSpan={5}>No added games yet.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminGamesC
