import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import News from "./news"
import Events from "./events"
import EasterEgg from "./easteregg"
import Footer from "../global/footer"

function Content() {
    const { t } = useTranslation()
    return (
        <>
            <div className="w-full h-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Games")} />
                    </div>
                    <div className="w-full flex justify-center ">
                        <div className="w-full max-w-3xl h-full sm:h-screen">
                            <img src="https://esports-news.co.uk/wp-content/uploads/2023/03/cs2-counter-strike-2.jpg" alt="cs2" />
                            <Tabs defaultValue="news" >
                                <TabsList className="grid grid-cols-3 w-full sticky top-17.5 bg-black/40 backdrop-blur-2xl">
                                    <TabsTrigger value="news">News</TabsTrigger>
                                    <TabsTrigger value="events">Events</TabsTrigger>
                                    <TabsTrigger value="eastereggs">Easter eggs</TabsTrigger>
                                </TabsList>
                                <TabsContent value="news">
                                    <News />
                                </TabsContent>
                                <TabsContent value="events">
                                    <Events />
                                </TabsContent>
                                <TabsContent value="eastereggs">
                                    <EasterEgg />
                                </TabsContent>
                            </Tabs>
                            <div className=" sm:mt-24">
                                <Footer />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
export default Content