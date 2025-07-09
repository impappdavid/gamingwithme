import Games from "./games"
import Navbar from "../global/navbar"
import Suggestions from "./suggestion"
import TopCreators from "./topcreators"
import { useTranslation } from "react-i18next"

function Content() {
    const {t} = useTranslation()
    return (
        <>
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-zinc-950 sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("home")} />
                    </div>
                    <div >
                        <TopCreators />
                        <Games />
                        <Suggestions />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Content