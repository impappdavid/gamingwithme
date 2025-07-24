
import CreateService from "@/components/mycomponents/createService/content"
import Sidebar from "@/components/mycomponents/global/sidebar"

function CreateServicePage() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <CreateService />
            </div>
        </>
    )
}
export default CreateServicePage