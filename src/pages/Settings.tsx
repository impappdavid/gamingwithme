
import Sidebar from "@/components/mycomponents/global/sidebar"
import General from "@/components/mycomponents/settings/general"

function Settings() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <General />
            </div>
        </>
    )
}
export default Settings