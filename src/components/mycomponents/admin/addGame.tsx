import { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import Navbar from "../navbar/navbar"
import { AddNewGame } from "@/api/admin"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"
import { fetchGameFromRAWG } from "@/api/games"

// Converts a string to a URL-friendly slug
function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Get a random placeholder image
function getRandomThumbnail() {
    return `https://source.unsplash.com/400x200/?game,${Math.floor(Math.random() * 10000)}`;
}

function AddGame() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    // Only 'name' is used, so we just keep 'name' and 'setName'
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [rawgResults, setRawgResults] = useState<any[]>([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [selectedRawg, setSelectedRawg] = useState<any>(null)
    // Only searchTimeout.current is used — keep as is
    const searchTimeout = useRef<NodeJS.Timeout | null>(null)

    // When the user types in the game name field, do a live search (with debounce)
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        setSelectedRawg(null)
        if (searchTimeout.current) clearTimeout(searchTimeout.current)
        const value = e.target.value
        if (value.trim() === "") {
            setRawgResults([])
            setShowDropdown(false)
            return
        }
        // Wait before searching to reduce API load
        searchTimeout.current = setTimeout(async () => {
            const result = await fetchGameFromRAWG(value)
            if (result) {
                setRawgResults([result])
                setShowDropdown(true)
            } else {
                setRawgResults([])
                setShowDropdown(false)
            }
        }, 400)
    }

    // Let user pick a RAWG autocomplete result
    const handleSelectRawg = (game: any) => {
        setName(game.name)
        setSelectedRawg(game)
        setShowDropdown(false)
    }

    // Form submission: call AddNewGame and handle results
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccess("")
        setError("")
        const slug = slugify(name)
        const thumbnailUrl = selectedRawg?.background_image || getRandomThumbnail()
        try {
            await AddNewGame(name, description, slug, thumbnailUrl)
            setSuccess("Game added successfully!")
            navigate("/admin/games")
            setName("")
            setDescription("")
            setSelectedRawg(null)
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
                            <label className="font-semibold">{t("Game Name")}</label>
                            <Input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                placeholder={t("Enter game name") || "Enter game name"}
                                className="h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300"
                                required
                                autoComplete="off"
                            />
                            {/* Dropdown with RAWG results if there are any */}
                            {showDropdown && rawgResults.length > 0 && (
                                <div className="absolute z-10 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg mt-1 w-full max-w-xl">
                                    {rawgResults.map((game, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            className="flex items-center gap-3 w-full px-3 py-2 hover:bg-zinc-800/60 text-left cursor-pointer"
                                            onClick={() => handleSelectRawg(game)}
                                        >
                                            {game.background_image && (
                                                <img src={game.background_image} alt={game.name} className="w-8 h-8 rounded object-cover" />
                                            )}
                                            <span className="text-sm">{game.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                            <label className="font-semibold">{t("Description")}</label>
                            <Textarea
                                className="h-20 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 transition-all duration-300 resize-none"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder={t("Enter game description") || "Enter game description"}
                                required
                            />
                            <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                                {loading ? t("Adding...") : t("Add Game")}
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
export default AddGame
