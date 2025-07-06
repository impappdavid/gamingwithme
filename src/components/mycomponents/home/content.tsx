import Games from "./games"
import Navbar from "../global/navbar"
import Suggestions from "./suggestion"
import TopCreators from "./topcreators"

function Content() {
    return (
        <>
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-zinc-900 sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={"Home"} />
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