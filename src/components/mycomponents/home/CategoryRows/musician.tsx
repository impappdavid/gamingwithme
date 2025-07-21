import { type TopCreators, GetTopCreators } from "@/api/home"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"



function Musician() {
    const { t } = useTranslation()
    const [topcreators, setTopCreators] = useState<TopCreators[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const getTopCreators = async () => {
            try {
                const data = await GetTopCreators();
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
                    <div className="text-xl font-medium">{t("Music")}</div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 gap-1 2xl:gap-2">
                    {topcreators.length > 0 ? (
                        <>
                            {topcreators.map((element: TopCreators, index: number) => (
                                <Link to={`/profile/${element.username}`} key={index} className="p-2 relative bg-gradient-to-br group from-zinc-900 to-zinc-950  cursor-pointer rounded-3xl border border-zinc-800 flex flex-col gap-2 w-full ">
                                    <div className="flex justify-center relative w-full overflow-hidden rounded-2xl">
                                        {element.avatarurl.length > 0 ? (
                                            <img src={element.avatarurl} alt={element.username} className="w-full rounded-2xl object-cover  ease-in-out group-hover:scale-105 transition-all duration-300" />
                                        
                                        ) : (
                                            <img src="/profile/6.jpg" alt={element.username} className="w-full rounded-2xl object-cover  ease-in-out group-hover:scale-105 transition-all duration-300" />
                                        
                                        )}
                                        
                                        {/* Remove cost badge since 'cost' is not in TopCreators */}
                                        {/* <div className="absolute top-1 right-1 p-1 px-1.5 bg-[#19FF00] backdrop-blur-2xl rounded-full text-xs text-black font-semibold drop-shadow-2xl flex items-center">{element.cost}</div> */}
                                        <div className="flex justify-between  px-2 absolute bottom-0 py-1 rounded-b-2xl backdrop-blur-sm w-full" >
                                            <div className="flex gap-1 items-center">
                                                <div className="text-lg">{element.username}</div>
                                            </div>

                                            <div className="flex items-center">
                                                <div className="flex flex-wrap gap-1">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Link>
                            ))
                            }
                        </>
                    ) : error ? (
                        <div className="flex flex-col items-start justify-center h-24 text-center">
                            <div className="text-md mb-1">❌</div>
                            <h3 className="text-md font-semibold text-red-400 mb-1">Error</h3>
                            <p className="text-zinc-400 max-w-md text-xs">{error}</p>
                        </div>
                    ) : (
                        <div className="h-24 rounded-2xl flex text-zinc-400 items-center justify-center ">
                            <div className="text-sm">No just chattings users yet.</div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}
export default Musician