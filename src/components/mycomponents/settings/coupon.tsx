import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import SettingsSidebar from "./settingsSidebar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { AddNewCoupon, GetMyCoupons, type Coupon } from "@/api/settings"
import { Calendar, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

function CouponComponent() {
    const [name, setName] = useState("");
    const [percentOff, setPercentOff] = useState(0);
    const [durationInDays, setDurationInDays] = useState(0);
    const [maxRedemptions, setMaxRedemptions] = useState(0);
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const { t } = useTranslation()
    const [openModal, setOpenModal] = useState(false)

    const fetchServices = async () => {
        const response = await GetMyCoupons();
        if (Array.isArray(response.coupons)) {
            setCoupons(
                response.coupons.map((coupon: any) => ({
                    ...coupon,
                    id: String(coupon.id),
                }))
            );
        } else {
            console.error("Coupons data not found or invalid:", response);
            setCoupons([]);
        }
    };

    useEffect(() => {
        fetchServices()
    }, [])

    const handleAddCoupon = async () => {
        try {
            setOpenModal(false)
            await AddNewCoupon(name, percentOff, durationInDays, maxRedemptions)
            fetchServices() // Optionally reload coupons after creating.
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="w-full h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 relative flex flex-col">
                    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("settings")} />
                    </div>
                    <div className="flex w-full flex-1">
                        <SettingsSidebar />
                        <div className="w-full p-4 flex justify-center">
                            <div className="flex flex-col items-start w-full max-w-2xl gap-4">
                                <div className="flex justify-between w-full">
                                    <div className="flex flex-col">
                                        <div className="text-2xl">{t("Create coupon")}</div>
                                        <div className="text-xs text-zinc-400">{t("Suggestion: Dont apply more then 80%")}</div>
                                    </div>
                                    <div onClick={() => setOpenModal(true)} className="w-fit border max-w-2xl py-1.5 px-4 text-zinc-400 hover:text-green-500 cursor-pointer transition-all flex items-center duration-300 hover:bg-zinc-950/60">
                                        <div className="tex-xs">{t("Create New Coupon")}</div>
                                    </div>
                                </div>
                                <div className="border-x border-t w-full">
                                    {coupons.map((coupon, index) => (
                                        <div key={index} className="w-full border-b p-4">
                                            <div className="flex justify-between w-full">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex flex-col">
                                                        <div className="text-lg">{coupon.name}</div>
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="py-0.5 px-2 bg-green-500/20 border border-green-500/40 rounded-full text-green-500 text-xs">
                                                            -{coupon.percentOff}%
                                                        </div>
                                                        <div className="py-0.5 px-2 bg-orange-500/20 border border-orange-500/40 rounded-full text-orange-500 text-xs flex gap-1 items-center">
                                                            <Calendar className="w-4 h-4" />
                                                            {coupon.valid ? (
                                                                <>
                                                                    {new Date(coupon.expiresAt).toLocaleDateString("en-US", {
                                                                        year: "numeric",
                                                                        month: "short",
                                                                        day: "numeric"
                                                                    })}
                                                                </>
                                                            ) : (
                                                                <div>{t("Ended")}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="py-0.5 px-2 h-fit bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-500 text-xs flex gap-1 items-center">
                                                    <Users className="w-4 h-4" />
                                                    {coupon.timesRedeemed}
                                                    /
                                                    {coupon.maxRedemptions}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Create coupon modal dialog */}
                <Dialog open={openModal} onOpenChange={setOpenModal}>
                    <DialogContent className="sm:max-w-[500px] realtive">
                        <DialogHeader>
                            <DialogTitle>{t("Add Service")}</DialogTitle>
                            <DialogDescription>{t("Please fill all the inputs.")}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t("Enter coupon name")}
                                className="h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800"
                                required
                                autoComplete="off"
                            />

                            <div className="flex flex-col gap-0">
                                <label htmlFor="">{t("Percent")}</label>
                                <Input
                                    type="number"
                                    value={percentOff}
                                    onChange={(e) => setPercentOff(Number(e.target.value))}
                                    placeholder={t("Set the percent")}
                                    className="h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="flex flex-col gap-0">
                                <label htmlFor="">{t("Duration(day)")}</label>
                                <Input
                                    type="number"
                                    value={durationInDays}
                                    onChange={(e) => setDurationInDays(Number(e.target.value))}
                                    placeholder={t("Set the coupon duration")}
                                    className="h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="flex flex-col gap-0">
                                <label htmlFor="">{t("Max redeem")}</label>
                                <Input
                                    type="number"
                                    value={maxRedemptions}
                                    onChange={(e) => setMaxRedemptions(Number(e.target.value))}
                                    placeholder={t("Total redeem")}
                                    className="h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800"
                                    required
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <DialogFooter className="grid grid-cols-2">
                            <Button onClick={() => setOpenModal(false)} className="border bg-black text-zinc-400 cursor-pointer hover:bg-zinc-950/40 rounded-lg">
                                {t("Cancel")}
                            </Button>
                            <Button
                                className="bg-green-500 hover:bg-green-600 cursor-pointer"
                                onClick={handleAddCoupon}
                            >
                                {t("Save changes")}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}
export default CouponComponent
