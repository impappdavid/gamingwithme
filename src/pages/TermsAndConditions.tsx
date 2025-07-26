import Sidebar from "@/components/mycomponents/global/sidebar"
import TermsAndConditions from "@/components/mycomponents/terms/terms"

function TermsPage() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <TermsAndConditions />
            </div>
        </>
    )
}
export default TermsPage