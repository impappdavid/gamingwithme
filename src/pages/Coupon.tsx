
import Sidebar from "@/components/mycomponents/global/sidebar"
import CouponComponent from "@/components/mycomponents/settings/coupon"

function CouponPage() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <CouponComponent />
            </div>
        </>
    )
}
export default CouponPage