

import Content from "@/components/mycomponents/ChatChoose/chatchoose"
import Sidebar from "@/components/mycomponents/global/sidebar"

function ChatChoose() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}
export default ChatChoose