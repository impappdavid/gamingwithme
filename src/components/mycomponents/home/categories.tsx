
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"


function Categories() {
    const { t } = useTranslation()

    return (
        <>
            <div className="flex flex-row gap-2 p-4 ">
                <Link to={`/just-chatting`} className="flex flex-col gap-1">
                    <img src="/categories/just-chatting.png" alt="just-chatting" className="max-w-36 rounded-lg"/>
                    <div className="text-sm text-zinc-200">Just Chatting</div>
                </Link>
                <Link to={`/players`} className="flex flex-col gap-1">
                    <img src="/categories/gamers.png" alt="gamers" className="max-w-36 rounded-lg"/>
                    <div className="text-sm text-zinc-200">Gamers</div>
                </Link>
            </div>
        </>
    )
}
export default Categories