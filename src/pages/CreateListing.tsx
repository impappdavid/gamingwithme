
import Content from "@/components/mycomponents/createListing/content"
import Sidebar from "@/components/mycomponents/global/sidebar"

function CreateListing() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}
export default CreateListing