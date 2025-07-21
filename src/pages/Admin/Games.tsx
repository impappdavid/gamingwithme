
import AdminGamesC from "@/components/mycomponents/admin/games"
import Sidebar from "@/components/mycomponents/global/sidebar"

function AdminGames() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <AdminGamesC />
            </div>
        </>
    )
}
export default AdminGames