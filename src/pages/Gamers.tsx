import Sidebar from "@/components/mycomponents/global/sidebar"
import Content from "@/components/mycomponents/players/content"

function Gamers() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}
export default Gamers