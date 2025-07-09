
import Sidebar from "@/components/mycomponents/global/sidebar"
import ActiveHistory from "@/components/mycomponents/settings/activeHistory"

function Activehistory() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <ActiveHistory />
            </div>
        </>
    )
}
export default Activehistory