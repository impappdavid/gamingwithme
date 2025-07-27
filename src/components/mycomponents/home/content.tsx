
import Categories from "./categories"
import { useTranslation } from "react-i18next"
import Footer from "../global/footer"
import JustChatting from "./CategoryRows/just-chatting"
import Navbar from "../navbar/navbar"
import HomeGames from "./games"
import Gamers from "./CategoryRows/gamers"
import Musician from "./CategoryRows/musician"
import Tiktok from "./CategoryRows/tiktok"
import Youtube from "./CategoryRows/youtube"
import SearchBar from "../global/search"
import Infos from "./infos"

function Content() {
    const { t } = useTranslation()
    return (
        <>
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-black/10 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Home")} />
                    </div>
                    <div className="min-h-[950px] p-4 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <SearchBar />
                            <Infos />
                        </div>
                        <Categories />
                        <JustChatting />
                        <Gamers />
                        <Musician />
                        <Tiktok />
                        <Youtube />
                        <HomeGames />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Content