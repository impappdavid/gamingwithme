import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

function Infos() {
    const { t } = useTranslation()
    return (
        <>
            <div className="flex flex-row gap-2 w-full">
                <Link to={'aboutus'} className="w-fit flex justify-center items-center text-sm text-zinc-400 hover:bg-zinc-950 p-2 rounded-lg hover:text-white transition-all duration-300">
                    {t("ABOUT US")}
                </Link>
                <Link to={'howitworks'} className="w-fit flex justify-center items-center text-sm text-zinc-400 hover:bg-zinc-950 p-2 rounded-lg hover:text-white transition-all duration-300">
                    {t("HOW IT WORKS?")}
                </Link>
                <Link to={'download'} className="w-fit flex justify-center items-center text-sm text-zinc-400 hover:bg-zinc-950 p-2 rounded-lg hover:text-white transition-all duration-300">
                    {t("DOWNLOAD")}
                </Link>
                <Link to={'news'} className="w-fit flex justify-center items-center text-sm text-zinc-400 hover:bg-zinc-950 p-2 rounded-lg hover:text-white transition-all duration-300">
                    {t("NEWS")}
                </Link>
            </div>
        </>
    )
}
export default Infos