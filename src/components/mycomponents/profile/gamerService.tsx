import { GetServicesById, type Service } from "@/api/service"
import { Calendar, CaseLower } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PaymentWithStripe, ValidateCoupon } from "@/api/stripe";
import { Textarea } from "@/components/ui/textarea";

function GamerServices(userId: any) {
    const [services, setServices] = useState<Service[]>([])
    const [coupon, setCoupon] = useState('');
    const [error, setError] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [serviceId, setServiceId] = useState("");
    const [servicePrice, setServicePrice] = useState(0);
    const [percent, setPercent] = useState(0);
    const [customerNotes, setNotes] = useState('');
    const [isValid, setIsValid] = useState(false);
    const paymentType = "Service";



    const fetchServices = async () => {
        const response = await GetServicesById(userId)
        if (response) {
            setServices(
                response.map((service: any) => ({
                    ...service,
                    id: String(service.id),
                }))
            )
        }else{
            setError("Failed to get services")
        }
    }

    useEffect(() => {
        fetchServices()
    }, [])


    const handlePayment = async (serviceId: string) => {
        try {
            const data = await PaymentWithStripe(
                userId?.userId,
                paymentType,
                serviceId,
                customerNotes,
                coupon
            )
            if (data) {
                window.open(data.checkoutUrl, '_blank')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCouponValidate = async () => {
        try {
             const data = await ValidateCoupon(coupon)
             if(data.valid){
                setIsValid(true)
                setCoupon(data.couponId)
                setPercent(data.percentOff)
             }else{
                setIsValid(false)
                setCoupon("")
             }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="text-2xl">Services</div>
                <div className="grid grid-cols-2">
                    {services.map((service, index) => (
                        <div onClick={() => { setOpenModal(true); setServiceId(service.id); setServicePrice(service.price) }} key={index} className={`p-4 bg-zinc-950 border flex flex-col gap-2 rounded-lg  transition-all duration-300 ${service.status === 0 ? "cursor-pointer hover:border-green-500/40" : "cursor-not-allowed hover:border-red-500/40"}`}>
                            <div className="flex flex-col">
                                <div className="text-lg">{service.title}</div>
                                <div className="text-xs text-zinc-400">{service.description}</div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="py-0.5 px-2 bg-green-500/20 border border-green-500/40 rounded-full text-green-500 text-sm">
                                    ${service.price}
                                </div>
                                <div className="py-0.5 px-2 bg-orange-500/20 border border-orange-500/40 rounded-full text-orange-500 text-sm flex gap-1 items-center">
                                    <Calendar className="w-4 h-4" />
                                    {service.deliveryDeadline} day
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <Dialog open={openModal}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Payment Summary</DialogTitle>
                        <DialogDescription>
                            Review your total and apply a coupon if you have one.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="total" className="text-right">
                                Total to Pay

                            </Label>
                            <div id="total" className="col-span-3 font-bold text-lg flex justify-between items-center">
                                ${servicePrice.toFixed(2)}
                                {isValid ? (
                                    <div className="text-green-500 text-sm">-{percent}%</div>
                                ) : (
                                    <div className=""></div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="coupon" className="text-right">
                                Coupon
                            </Label>
                            <div className="col-span-3 flex gap-2">
                                <Input
                                    id="coupon"
                                    value={coupon}
                                    disabled={isValid}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    className="border-zinc-800 hover:border-zinc-700 transition-all duration-300"
                                    placeholder="Enter coupon code"
                                />
                                <Button type="button" className="bg-blue-500 text-black border hover:bg-blue-600 cursor-pointer transition-all duration-300" onClick={handleCouponValidate} disabled={isValid}>
                                    Apply
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4 w-full">
                            <Label htmlFor="coupon" className="text-right">
                                Message
                            </Label>
                            <div className="relative flex-1 w-full col-span-3">
                                <CaseLower className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                                <Textarea
                                    placeholder="Send a message for the seller..."
                                    className="pl-10 h-20  rounded-xl  border-zinc-800 hover:border-zinc-700 transition-all duration-300 resize-none"
                                    value={customerNotes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    <DialogFooter>
                        <div className="grid grid-cols-2 gap-2 w-full">
                                <Button onClick={()=> setOpenModal(false)} className="bg-black w-full border text-zinc-400 hover:bg-zinc-900/60 cursor-pointer transition-all duration-300" variant="default">
                                    Cancel
                                </Button>
                            <Button onClick={() => handlePayment(serviceId)} className="bg-green-500 hover:bg-green-600 cursor-pointer transition-all duration-300" variant="default">
                                Proceed to Pay
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default GamerServices