
import Sidebar from "@/components/mycomponents/global/sidebar"
import BillHistory from "@/components/mycomponents/settings/history"

function History() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <BillHistory />
            </div>
        </>
    )
}
export default History