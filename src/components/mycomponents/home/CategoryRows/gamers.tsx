import { type TopCreators, GetRandomsByTagAndTop } from "@/api/home"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchGame } from "@/api/rawg";

function Gamers() {
    const { t } = useTranslation()
    const [topcreators, setTopCreators] = useState<TopCreators[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    // Store up to 2 RAWG images for each username
    const [gameImages, setGameImages] = useState<{ [username: string]: string[] }>({});

    useEffect(() => {
        const getTopCreators = async () => {
            try {
                const data = await GetRandomsByTagAndTop("Gamer", 8);
                if (Array.isArray(data)) {
                    setTopCreators(data as TopCreators[]);
                } else {
                    setTopCreators([]);
                    setError("Invalid data format received from server");
                }
            } catch (err: any) {
                setError(err?.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        }
        getTopCreators()
    }, [])

    // Fetch RAWG images for up to 2 games per user
    useEffect(() => {
        const fetchImages = async () => {
            const images: { [username: string]: string[] } = {};
            await Promise.all(topcreators.map(async (creator) => {
                const games = creator.games ? creator.games.slice(0, 2) : [];
                const imgArr: string[] = [];
                for (const gameName of games) {
                    const game = await fetchGame(gameName);
                    imgArr.push(game && game.background_image ? game.background_image : "/profile/6.jpg");
                }
                images[creator.username] = imgArr;
            }));
            setGameImages(images);
        };
        if (topcreators.length > 0) {
            fetchImages();
        }
    }, [topcreators]);

    if (loading) {
        return (
            <div className="flex flex-col gap-4 ">
                <div className="flex w-full justify-between items-center">
                    <div className="text-xl font-medium">
                        <Skeleton className="w-32 h-6" />
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 gap-1 2xl:gap-2">
                    {Array.from({ length: 7 }).map((_, idx) => (
                        <Skeleton key={idx} className="h-40 rounded-2xl w-full" />
                    ))}
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="flex flex-col gap-4 ">
                <div className="flex w-full justify-between items-center">
                    <div className="text-xl font-medium">{t("Gamers")}</div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-1 2xl:gap-2">
                    {topcreators.length > 0 ? (
                        <>
                            {topcreators.map((element: TopCreators) => (
                                <div key={element.username} className="p-1.5 relative bg-gradient-to-br group from-zinc-900 to-zinc-950  cursor-pointer rounded-2xl border border-zinc-800 flex flex-col gap-2 w-full ">
                                    <div className="flex flex-col relative w-full overflow-hidden rounded-2xl">
                                        {element.avatarurl.length > 0 ? (
                                            <img src={element.avatarurl} alt={element.username} className="w-full rounded-xl object-cover  ease-in-out group-hover:scale-105 transition-all duration-300" />
                                        ) : (
                                            <img src="/profile/6.jpg" alt={element.username} className="w-full rounded-xl object-cover  ease-in-out group-hover:scale-105 transition-all duration-300" />
                                        )}
                                        <div className="flex flex-col gap-0.5 px-1 pt-1 rounded-b-2xl w-full" >
                                            <div className="flex gap-1 items-center">
                                                <div className="text-lg">{element.username}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="grid grid-cols-4 gap-1">
                                                    {gameImages[element.username] && gameImages[element.username].length > 0 && (
                                                        <>
                                                            <img
                                                                src={gameImages[element.username][0]}
                                                                alt={element.games[0] || "game"}
                                                                className="w-6 h-6 rounded-md object-cover "
                                                            />
                                                            {element.games.length > 2 ? (
                                                                <div className="w-6 h-6 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-semibold text-white">
                                                                    +{element.games.length - 1}
                                                                </div>
                                                            ) : element.games.length === 2 && gameImages[element.username][1] ? (
                                                                <img
                                                                    src={gameImages[element.username][1]}
                                                                    alt={element.games[1] || "game"}
                                                                    className="w-6 h-6 rounded-md object-cover"
                                                                />
                                                            ) : null}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="py-2 w-full">
                                                <Link to={`/profile/${element.username}`} className="py-1.5 justify-center bg-[#19FF00] hover:bg-[#1aff0096] transition-all duration-200 px-3 rounded-lg flex items-center text-sm text-black font-semibold">BOOK</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </>
                    ) : error ? (
                        <div className="flex flex-col items-start  justify-center h-24 text-center">
                            <div className="text-md mb-1">❌</div>
                            <h3 className="text-md font-semibold text-red-400 mb-1">Error</h3>
                            <p className="text-zinc-400 max-w-md text-xs">{error}</p>
                        </div>
                    ) : (
                        <div className="h-24 rounded-2xl flex text-zinc-400 items-center justify-start ">
                            <div className="text-sm">{t('No gamers yet.')}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Gamers
