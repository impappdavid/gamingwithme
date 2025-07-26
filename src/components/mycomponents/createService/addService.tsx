import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Textarea } from "@/components/ui/textarea"
import { AddNewService } from "@/api/service"
import { CircleAlert, X } from "lucide-react"

function AddService({ onServiceAdded }: { onServiceAdded: () => void }) {
    const { t } = useTranslation()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState<number>(0)
    const [deadline, setDeadline] = useState(1)
    const [error, setError] = useState("")
    const [openModal, setOpenModal] = useState(false)

    // Submits form if all fields are filled and valid
    const handleSubmit = async () => {
        if (title && description && price > 0 && deadline > 0) {
            try {
                await AddNewService(title, description, price, deadline)
                setOpenModal(false)
                onServiceAdded()
                setTitle("")
                setDescription("")
                setPrice(0)
                setDeadline(1)
            } catch (err) {
                console.log(err)
            }
        } else {
            setError("Please fill the inputs")
        }
    }

    return (
        <>
            {/* Trigger for the modal */}
            <div onClick={() => setOpenModal(true)} className="w-fit border max-w-2xl py-1.5 px-4 text-zinc-400 hover:text-green-500 cursor-pointer transition-all duration-300 hover:bg-zinc-950/60">
                <div className="tex-xs">Create New Service</div>
            </div>
            {/* Dialog/modal for adding a service */}
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-[500px] realtive">
                    <DialogHeader>
                        <DialogTitle>Add Service</DialogTitle>
                        <DialogDescription>Please fill all the inputs.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={t("Enter service title") || "Enter service title"}
                            className="h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800"
                            required
                            autoComplete="off"
                        />
                        <Textarea
                            className="h-20 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={t("Enter service description") || "Enter service description"}
                            required
                        />
                        <div className="flex flex-col gap-0">
                            <label>Price</label>
                            <Input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                placeholder="Enter service price"
                                className="h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex flex-col gap-0">
                            <label>Deadline(day)</label>
                            <Input
                                type="number"
                                value={deadline}
                                onChange={(e) => setDeadline(Number(e.target.value))}
                                placeholder="Enter delivery deadline"
                                className="h-11 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800"
                                required
                                autoComplete="off"
                            />
                        </div>
                        {error && (
                            <div className="absolute top-4 p-4 bg-red-500/20 rounded-xl border border-red-500 backdrop-blur-2xl flex justify-between items-center w-md">
                                <div className="flex items-center gap-2 text-sm text-red-500">
                                    <CircleAlert className="w-4 h-4" />
                                    {error}
                                </div>
                                {/* Clear the error */}
                                <div className="cursor-pointer" onClick={() => setError("")}>
                                    <X className="w-4 h-4" />
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Action buttons */}
                    <DialogFooter className="grid grid-cols-2">
                        <Button onClick={() => setOpenModal(false)} className="border bg-black text-zinc-400 cursor-pointer hover:bg-zinc-950/40 rounded-lg">
                            Cancel
                        </Button>
                        <Button
                            className="bg-green-500 hover:bg-green-600 cursor-pointer"
                            onClick={handleSubmit}
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddService
