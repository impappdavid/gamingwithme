
import Sidebar from "@/components/mycomponents/global/sidebar"
import DangerSettings from "@/components/mycomponents/settings/danger"

function Danger() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <DangerSettings />
            </div>
        </>
    )
}
export default Danger