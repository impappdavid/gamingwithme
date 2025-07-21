import Games from "./games"
import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import Filter from "./filter"
import { useState } from "react"
import Footer from "../global/footer"

function Content() {
    const {t} = useTranslation()
    const [filterText, setFilterText] = useState("")
    return (
        <>
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Games")} />
                    </div>
                    <div className="min-h-[950px]">
                        <Filter filterText={filterText} setFilterText={setFilterText} />
                        <Games filterText={filterText} />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Content