import Games from "./games"
import Navbar from "./navbar"
import Suggestions from "./suggestion"
import TopCreators from "./topcreators"

function Content() {
    return (
        <>
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-zinc-900 sm:rounded-2xl border border-zinc-800 overflow-y-auto">
                    <Navbar />
                    <TopCreators />
                    <Games />
                    <Suggestions />
                </div>
            </div>
        </>
    )
}
export default Content