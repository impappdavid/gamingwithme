
import { useTranslation } from "react-i18next"
import Footer from "../global/footer"
import Carousel from "./carousel"
import Navbar from "../navbar/navbar"


function Content() {
    const { t } = useTranslation()
    return (
        <>
            <div className="w-full h-full xl:h-screen sm:p-2">
                <div className="w-full flex flex-col justify-between h-full min-h-screen sm:min-h-0 sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Create Listing")} />
                    </div>
                    <div className="w-full flex justify-center p-4 mb-8">
                        <Carousel />

                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Content