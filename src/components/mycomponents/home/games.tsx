import { GetAllGames, type TypeGames } from "@/api/game";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchGameFromRAWG } from "@/api/games";

function HomeGames() {
    const { t } = useTranslation();
    const [allGames, setAllGames] = useState<TypeGames[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    // For RAWG fallback images if missing
    const [rawgImages, setRawgImages] = useState<{ [name: string]: string }>({});
    const [rawgLoading, setRawgLoading] = useState<{ [name: string]: boolean }>({});

    // Load all home games on mount
    useEffect(() => {
        const getSuggestedUsersWithConnectedPayment = async () => {
            try {
                const data = await GetAllGames();
                if (Array.isArray(data)) {
                    setAllGames(data as TypeGames[]);
                } else {
                    setAllGames([]);
                    setError("Invalid data format received from server");
                }
            } catch (err: any) {
                setError(err?.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        }
        getSuggestedUsersWithConnectedPayment()
    }, [])

    // For each game with no thumbnailUrl, try to load from RAWG
    useEffect(() => {
        const fetchMissingImages = async () => {
            const missing = allGames.filter(g => !g.thumbnailUrl || g.thumbnailUrl === "");
            for (const game of missing) {
                if (!rawgImages[game.name] && !rawgLoading[game.name]) {
                    setRawgLoading(prev => ({ ...prev, [game.name]: true }));
                    const rawg = await fetchGameFromRAWG(game.name);
                    if (rawg && rawg.background_image) {
                        setRawgImages(prev => ({ ...prev, [game.name]: rawg.background_image }));
                    }
                    setRawgLoading(prev => ({ ...prev, [game.name]: false }));
                }
            }
        };
        if (allGames.length > 0) fetchMissingImages();
        // eslint-disable-next-line
    }, [allGames]);

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex w-full justify-between items-center">
                    <div className="text-xl font-medium">{t("Games")}</div>
                    <Link to={`/games`} className="text-xs text-zinc-400 hover:underline ">{t("View all")}</Link>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-2">
                    {loading ? (
                        Array.from({ length: 9 }).map((_, idx) => (
                            <Skeleton key={idx} className="h-44 rounded-2xl w-full" />
                        ))
                    ) : error ? (
                        <div className="flex flex-col items-start justify-center h-24 text-center">
                            <div className="text-md mb-1">❌</div>
                            <h3 className="text-md font-semibold text-red-400 mb-1">Error</h3>
                            <p className="text-zinc-400 max-w-md text-xs">{error}</p>
                        </div>
                    ) : allGames.length > 0 ? (
                        <>
                            {allGames.map((element) => (
                                <Link key={element.slug || element.name} to={`/games/${element.slug}`}>
                                    {/* Show fallback RAWG image if missing local */}
                                    {(!element.thumbnailUrl || element.thumbnailUrl === "") ? (
                                        rawgImages[element.name] ? (
                                            <img
                                                src={rawgImages[element.name]}
                                                alt={element.name}
                                                className="bg-cover rounded-2xl hover:scale-105 cursor-pointer transition-all duration-300"
                                            />
                                        ) : (
                                            rawgLoading[element.name] ? (
                                                <Skeleton className="h-24 rounded-2xl w-full" />
                                            ) : (
                                                <div className="h-24 rounded-2xl w-full flex items-center justify-center bg-zinc-800 text-zinc-400">No picture</div>
                                            )
                                        )
                                    ) : (
                                        <img
                                            src={element.thumbnailUrl}
                                            alt={element.name}
                                            className="bg-cover max-h-58 rounded-2xl hover:scale-105 cursor-pointer transition-all duration-300"
                                        />
                                    )}
                                </Link>
                            ))}
                        </>
                    ) : (
                        <div className="border h-58 rounded-2xl flex text-zinc-400 items-center justify-center hover:border-green-500 hover:text-green-500 transition-all duration-300 col-span-full">
                            <div className="text-sm">SOON</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default HomeGames
