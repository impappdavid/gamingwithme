
import Content from "@/components/mycomponents/game/content"
import Sidebar from "@/components/mycomponents/global/sidebar"

function Game() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}
export default Game