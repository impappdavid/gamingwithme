import Content from "@/components/mycomponents/games/content"
import Sidebar from "@/components/mycomponents/global/sidebar"

function Games() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}
export default Games