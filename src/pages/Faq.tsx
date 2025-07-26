import Faq from "@/components/mycomponents/faq/faq"
import Sidebar from "@/components/mycomponents/global/sidebar"

function FaqPage() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <Faq />
            </div>
        </>
    )
}
export default FaqPage