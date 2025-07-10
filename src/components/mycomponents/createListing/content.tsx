import Navbar from "../global/navbar"
import { useTranslation } from "react-i18next"
import AvailabilityCalendar from "./calendar"
import Footer from "../global/footer"


function Content() {
    const { t } = useTranslation()
    return (
        <>
            <div className="w-full h-full xl:h-screen sm:p-2">
                <div className="w-full h-full min-h-screen sm:max-h-screen bg-zinc-950 sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Create Listing")} />
                    </div>
                    <div className="w-full flex justify-center p-4">
                        <AvailabilityCalendar />

                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Content