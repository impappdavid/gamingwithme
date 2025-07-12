
import Content from "@/components/mycomponents/chat/content"
import Sidebar from "@/components/mycomponents/global/sidebar"

function Chat() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}
export default Chat