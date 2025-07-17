import { GetAllGames, type Games } from "@/api/game";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"

function Games() {
    const { t } = useTranslation();
    const [allGames, setAllGames] = useState<Games[]>([]);
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const getSuggestedUsersWithConnectedPayment = async () => {
            try {
                const data = await GetAllGames();
                if (Array.isArray(data)) {
                    setAllGames(data as Games[]);
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
    return (
        <>
            <div className="flex flex-col gap-4 p-4 ">
                <div className="flex w-full justify-between items-center">
                    <div className="text-xl font-medium">{t("Games")}</div>
                    <Link to={`/games`} className="text-xs text-zinc-400 hover:underline ">View All</Link>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-2">
                    {allGames.length > 0 ? (
                        <>
                            {

                                allGames.map((element, index) => (
                                    <Link key={index} to={`/games/${element.slug}`}>
                                        <img src={element.thumbnailUrl} className="bg-cover max-h-58 rounded-2xl hover:scale-105  cursor-pointer transition-all duration-300" />
                                    </Link>
                                ))
                            }
                        </>
                    ) : (
                        <div className="border h-58 rounded-2xl flex text-zinc-400 items-center justify-center hover:border-green-500 hover:text-green-500 transition-all duration-300">
                            <div className="text-sm">SOON</div>
                        </div>
                    )}


                </div>
            </div>
        </>
    )
}
export default Games