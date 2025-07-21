
import AddGame from "@/components/mycomponents/admin/addGame"
import Sidebar from "@/components/mycomponents/global/sidebar"

function AddGamePage() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <AddGame />
            </div>
        </>
    )
}
export default AddGamePage