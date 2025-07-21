
import Admin from "@/components/mycomponents/admin/admin"
import Sidebar from "@/components/mycomponents/global/sidebar"

function AdminPage() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Admin />
            </div>
        </>
    )
}
export default AdminPage