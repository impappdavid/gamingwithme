import { GetAllGames, type TypeGames } from "@/api/game";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGameFromRAWG } from "@/api/games";

function Games({ filterText }: { filterText: string }) {
    const [allGames, setAllGames] = useState<TypeGames[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    // Stores mapping of game name to image from RAWG if needed
    const [rawgImages, setRawgImages] = useState<{ [name: string]: string }>({});
    // Tracks loading state for each game when fetching from RAWG
    const [rawgLoading, setRawgLoading] = useState<{ [name: string]: boolean }>({});

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

    // If a game has no thumbnail, try to get one from RAWG (only do so once per game name)
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

    // Controlled input: filter to games whose name includes `filterText`, ignoring case
    const filteredGames = allGames.filter(game =>
        game.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <>
            <div className="flex flex-col gap-4 p-4 ">
                {error ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Error</h3>
                        <p className="text-zinc-400 max-w-md">{error}</p>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4">
                        {/* Show skeletons while loading */}
                        {Array.from({ length: 12 }).map((_, idx) => (
                            <Skeleton key={idx} className="w-full h-44 rounded-2xl" />
                        ))}
                    </div>
                ) : allGames.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4">
                        {filteredGames.length > 0 ? (
                            <>
                                {filteredGames.map(game => (
                                    <Link to={`/games/${game.slug}`} key={game.slug}>
                                        {/* Show fallback logic: RAWG image if missing, else skeleton or text if RAWG still loading */}
                                        {(!game.thumbnailUrl || game.thumbnailUrl === "") ? (
                                            rawgImages[game.name] ? (
                                                <img src={rawgImages[game.name]} className="bg-cover h-24 w-fit  rounded-2xl hover:scale-105  cursor-pointer transition-all duration-300" />
                                            ) : (
                                                rawgLoading[game.name] ? (
                                                    <Skeleton className="w-full h-18 rounded-2xl" />
                                                ) : (
                                                    <div className="w-full h-18 rounded-2xl flex items-center justify-center bg-zinc-800 text-zinc-400">No picture</div>
                                                )
                                            )
                                        ) : (
                                            <img src={game.thumbnailUrl} className="bg-cover max-h-42 rounded-2xl hover:scale-105  cursor-pointer transition-all duration-300" />
                                        )}
                                    </Link>
                                ))}
                            </>
                        ) : (
                            // No games found for this filter
                            <div className="flex flex-col items-center justify-center h-18 text-center">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-zinc-200 mb-2">No game found</h3>
                                <p className="text-zinc-400 max-w-md">
                                    Try adjusting your search criteria or filters to find more game.
                                </p>
                            </div>
                        )}
                    </div >
                ) : (
                    // No games at all in the server
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="text-6xl mb-4 animate-bounce">👀</div>
                        <h3 className="text-xl font-semibold text-zinc-200 mb-2">There is nothing to see here yet.</h3>
                    </div>
                )
                }
            </div >
        </>
    )
}
export default Games
