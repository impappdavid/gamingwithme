import { GetAllGames, type TypeGames } from "@/api/game";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Games({ filterText }: { filterText: string }) {
    const { t } = useTranslation();
    const [allGames, setAllGames] = useState<TypeGames[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

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

    const filteredGames = allGames.filter(game =>
        game.name.toLowerCase().includes(filterText.toLowerCase())
    );
    return (
        <>
            <div className="flex flex-col gap-4 p-4 ">
                {allGames.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4">
                        {filteredGames.length > 0 ? (
                            <>
                                {
                                    filteredGames.map(game => (
                                        <Link to={`/games/${game.slug}`}>
                                            <img src={game.thumbnailUrl} className="bg-cover max-h-58 rounded-2xl hover:scale-105  cursor-pointer transition-all duration-300" />
                                        </Link>
                                    ))
                                }
                            </>
                        ) : (
                            // No users found message
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-zinc-200 mb-2">No game found</h3>
                                <p className="text-zinc-400 max-w-md">
                                    Try adjusting your search criteria or filters to find more game.
                                </p>
                            </div>
                        )}

                    </div >
                ) : (
                    // No users found message
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