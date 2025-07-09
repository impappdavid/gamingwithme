import Navbar from "../global/navbar"
import { useTranslation } from "react-i18next"
import SettingsSidebar from "./settingsSidebar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function DangerSettings() {
    const { t } = useTranslation()
    return (
        <>
            <div className="w-full h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-zinc-900 sm:rounded-2xl border border-zinc-800 relative flex flex-col">
                    <div className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("settings")} />
                    </div>
                    <div className="flex w-full flex-1">
                        <SettingsSidebar />
                        <div className="w-full p-4">
                            <Dialog>
                                <DialogTrigger asChild>

                                    <Button className="w-full bg-transparent border rounded-xl text-red-400 hover:bg-red-500/10 hover:border-red-500/60 cursor-pointer">Delete  account</Button>
                                </DialogTrigger>
                                <DialogContent className=" flex flex-col ">
                                    <DialogHeader className="flex flex-col gap-4">
                                        <DialogTitle className="flex justify-center text-red-400 ">

                                            Are you sure you want to delete your account?

                                        </DialogTitle>

                                        <DialogDescription>
                                            <div className="grid grid-cols-2 gap-2">
                                                <DialogClose>
                                                    <Button className="bg-transparent w-full border rounded-xl text-zinc-400 hover:bg-zinc-800/60 cursor-pointer">Close</Button>
                                                </DialogClose>
                                                <Button className="bg-red-500 border rounded-xl text-black hover:bg-red-500/80 cursor-pointer">Delete</Button>
                                            </div>

                                        </DialogDescription>

                                    </DialogHeader>

                                </DialogContent>
                            </Dialog >
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DangerSettings