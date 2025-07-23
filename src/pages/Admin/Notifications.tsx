

import AdminNotifications from "@/components/mycomponents/admin/notificatons"
import Sidebar from "@/components/mycomponents/global/sidebar"

function AdminNotificationsPage() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <AdminNotifications />
            </div>
        </>
    )
}
export default AdminNotificationsPage