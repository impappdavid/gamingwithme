
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"


function Categories() {
    const { t } = useTranslation()

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex w-full justify-between items-center">
                    <div className="text-xl font-medium">{t("Categories")}</div>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-2 ">
                    <Link to={`/just-chatting`} className="flex flex-col gap-1 group">
                        <div className="overflow-hidden rounded-lg">
                            <img src="/categories/just-chatting.png" alt="just-chatting" className="w-36 xl:min-w-36 rounded-lg transition-transform duration-300 group-hover:scale-105 transform-gpu" />
                        </div>
                        <div className="text-sm text-zinc-200 group-hover:text-blue-400 transition-colors duration-300">{t("Just Chatting")}</div>
                    </Link>
                    <Link to={`/gamers`} className="flex flex-col gap-1 group">
                        <div className="overflow-hidden rounded-lg">
                            <img src="/categories/gamers.png" alt="gamers" className="w-36 xl:min-w-36 rounded-lg transition-transform duration-300 group-hover:scale-105 transform-gpu" />
                        </div>
                        <div className="text-sm text-zinc-200 group-hover:text-green-500 transition-colors duration-300">{t("Gamers")}</div>
                    </Link>
                    <Link to={`/music`} className="flex flex-col gap-1 group">
                        <div className="overflow-hidden rounded-lg">
                            <img src="/categories/music.png" alt="gamers" className="w-36 xl:min-w-36 rounded-lg transition-transform duration-300 group-hover:scale-105 transform-gpu" />
                        </div>
                        <div className="text-sm text-zinc-200 group-hover:text-orange-500 transition-colors duration-300">{t("Music")}</div>
                    </Link>
                    <Link to={`/tiktok`} className="flex flex-col gap-1 group">
                        <div className="overflow-hidden rounded-lg">
                            <img src="/categories/tiktok.png" alt="gamers" className="w-36 xl:min-w-36 rounded-lg transition-transform duration-300 group-hover:scale-105 transform-gpu" />
                        </div>
                        <div className="text-sm text-zinc-200 group-hover:text-white transition-colors duration-300">Tiktok</div>
                    </Link>
                    <Link to={`/youtube`} className="flex flex-col gap-1 group">
                        <div className="overflow-hidden rounded-lg">
                            <img src="/categories/youtube.png" alt="gamers" className="w-36 xl:min-w-36 rounded-lg transition-transform duration-300 group-hover:scale-105 transform-gpu" />
                        </div>
                        <div className="text-sm text-zinc-200 group-hover:text-red-400 transition-colors duration-300">Youtube</div>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Categories