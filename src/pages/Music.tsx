import Sidebar from "@/components/mycomponents/global/sidebar"
import Content from "@/components/mycomponents/musician/content"

function Music() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}
export default Music