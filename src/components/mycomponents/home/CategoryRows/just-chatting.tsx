import { type TopCreators, GetTopCreators } from "@/api/home"
import { Button } from "@/components/ui/button"
import { MessagesSquare, Music } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"



function JustChatting() {
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
        return <div >Loading...</div>
    }
    return (
        <>
            <div className="flex flex-col gap-4 ">
                <div className="flex w-full justify-between items-center">
                    <div className="text-xl font-medium">{t("Just Chatting")}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-1 2xl:gap-2">
                    {topcreators.length > 0 ? (
                        <>
                            {topcreators.map((element: TopCreators, index: number) => (
                                <div  key={index} className="p-1.5 relative bg-gradient-to-br group flex justify-between from-zinc-900 to-zinc-950  cursor-pointer rounded-2xl border border-zinc-800 gap-2 w-full ">
                                    <div className="flex gap-2 justify-center w-full overflow-hidden rounded-2xl">
                                        {element.avatarurl.length > 0 ? (
                                            <img src={element.avatarurl} alt={element.username} className="w-full max-w-16 rounded-2xl object-cover  ease-in-out group-hover:scale-105 transition-all duration-300" />

                                        ) : (
                                            <img src="/profile/6.jpg" alt={element.username} className="w-full max-w-16 rounded-2xl object-cover  ease-in-out group-hover:scale-105 transition-all duration-300" />

                                        )}

                                        {/* Remove cost badge since 'cost' is not in TopCreators */}
                                        {/* <div className="absolute top-1 right-1 p-1 px-1.5 bg-[#19FF00] backdrop-blur-2xl rounded-full text-xs text-black font-semibold drop-shadow-2xl flex items-center">{element.cost}</div> */}
                                        <div className="flex flex-col backdrop-blur-sm w-full" >
                                            <div className="flex items-center">
                                                <div className="text-lg">{element.username}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="text-xs text-zinc-400">I will make you a youtube video. :)</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex flex-wrap gap-1">
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-2 pr-1 flex flex-1">
                                        <Link to={`/profile/${element.username}`} className="h-full bg-[#19FF00] hover:bg-[#1aff0096] transition-all duration-200 px-3 rounded-lg flex items-center text-sm text-black font-semibold">$2.19</Link>
                                    </div>

                                </div>
                            ))
                            }
                        </>
                    ) : (
                        <div className="h-40 rounded-2xl flex text-zinc-400 items-center justify-center ">
                            <div className="text-sm">No just chattings users yet.</div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}
export default JustChatting