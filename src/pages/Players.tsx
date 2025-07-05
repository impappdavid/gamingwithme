import Sidebar from "@/components/mycomponents/global/sidebar"
import Content from "@/components/mycomponents/players/content"

function Players() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}
export default Players