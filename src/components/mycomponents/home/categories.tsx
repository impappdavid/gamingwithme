
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
                <div className="flex flex-row gap-2  ">
                    <Link to={`/just-chatting`} className="flex flex-col gap-1 group">
                        <div className="overflow-hidden rounded-lg">
                            <img src="/categories/just-chatting.png" alt="just-chatting" className="max-w-36 rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105" />
                        </div>
                        <div className="text-sm text-zinc-200 group-hover:text-blue-400 duration-300 transition-all">Just Chatting</div>
                    </Link>
                    <Link to={`/players`} className="flex flex-col gap-1 group">
                        <div className="overflow-hidden rounded-lg">
                            <img src="/categories/gamers.png" alt="gamers" className="max-w-36 rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105" />
                        </div>
                        <div className="text-sm text-zinc-200 group-hover:text-green-500 duration-300 transition-all">Gamers</div>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Categories