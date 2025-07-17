import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Bell, X} from "lucide-react"
import { useTranslation } from "react-i18next"

function Notifications() {
    const { t } = useTranslation()
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="relative rounded-lg h-9 w-9 bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                        <Bell className="w-5 h-5" />
                        <div className="absolute -top-1 -right-1">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500/80"></span>
                            </span>
                        </div>
                    </div>

                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] sm:min-h-[800px] min-h-[700px] max-h-[800px] flex flex-col ">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between">

                            {t("Notification")}
                            <DialogClose>
                                <X className="w-5 h-5 cursor-pointer" />
                            </DialogClose>
                        </DialogTitle>

                        <DialogDescription>
                            <div className="flex flex-col border-t">
                                <div className=" hover:bg-zinc-900/40 cursor-pointer flex flex-col gap-2 p-2 py-3 border-b">
                                    <div className="flex justify-between">
                                        <div className="flex gap-2 items-center">
                                            <img src="/profile/25.jpg" alt="" className="w-13 h-13 rounded-md" />
                                            <div className="flex flex-col">
                                                <div className="text-white text-lg text-start">Ethan</div>
                                                <div className="text-sm text-start">
                                                    <span className="text-blue-500">Ethan</span> {t("bought")}
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className=" hover:bg-zinc-900/40 cursor-pointer flex flex-col gap-2 p-2 py-3 border-b">
                                    <div className="flex justify-between">
                                        <div className="flex gap-2 items-center">
                                            <img src="/profile/95.jpg" alt="" className="w-13 h-13 rounded-md" />
                                            <div className="flex flex-col">
                                                <div className="text-white text-lg text-start">GamingWithMe</div>
                                                <div className="text-sm text-start">
                                                    {t("update")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </DialogDescription>

                    </DialogHeader>

                </DialogContent>
            </Dialog >
        </>
    )
}
export default Notifications