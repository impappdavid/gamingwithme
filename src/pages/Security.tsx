
import Sidebar from "@/components/mycomponents/global/sidebar"
import Security from "@/components/mycomponents/settings/security"

function SecurityPage() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Security />
            </div>
        </>
    )
}
export default SecurityPage