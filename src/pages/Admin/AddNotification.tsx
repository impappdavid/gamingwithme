
import AddNewNoti from "@/components/mycomponents/admin/addNoti"
import Sidebar from "@/components/mycomponents/global/sidebar"

function AddNewNotificationsPage() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <AddNewNoti />
            </div>
        </>
    )
}
export default AddNewNotificationsPage