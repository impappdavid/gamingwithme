import Games from "./games"
import Navbar from "./navbar"
import RecentActivity from "./recentactivity"
import Suggestions from "./suggestion"
import TopCreators from "./topcreators"

function Content() {
    return (
        <>
            <div className="w-full xl:h-screen p-2">
                <div className="w-full h-full bg-zinc-900 rounded-2xl border border-zinc-800">
                    <Navbar />
                    <TopCreators />
                    <Games />
                    <div className="grid xl:grid-cols-2 gap-4">
                        <RecentActivity />
                        <Suggestions />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Content