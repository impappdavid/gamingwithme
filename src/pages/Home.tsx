import Sidebar from "@/components/mycomponents/global/sidebar"
import Content from "@/components/mycomponents/home/content"

function Home() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Content />
            </div>
        </>
    )
}
export default Home