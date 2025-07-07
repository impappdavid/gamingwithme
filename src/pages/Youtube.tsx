import Sidebar from "@/components/mycomponents/global/sidebar"
import Content from "@/components/mycomponents/youtube/content"

function Youtube() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}
export default Youtube