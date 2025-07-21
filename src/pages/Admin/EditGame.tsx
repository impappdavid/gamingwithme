
import EditGame from "@/components/mycomponents/admin/editGame"
import Sidebar from "@/components/mycomponents/global/sidebar"

function EditGamePage() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <EditGame />
            </div>
        </>
    )
}
export default EditGamePage