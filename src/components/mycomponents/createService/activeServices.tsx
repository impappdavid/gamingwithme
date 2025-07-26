import { DeleteService, EditService } from "@/api/service"
import { Calendar, Pencil, Trash2 } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface Service {
    id: string
    title: string
    description: string
    price: number
    deliveryDeadline: number
    status: number
    username: string
    avatarUrl: string
    createdAt: string
}

function ActiveServices({
    services,
    onServiceUpdate
}: {
    services: Service[]
    onServiceUpdate: () => void
}) {
    // Holds the service currently being edited, or null if none
    const [editingService, setEditingService] = useState<Service | null>(null)
    const [editTitle, setEditTitle] = useState("")
    const [editDescription, setEditDescription] = useState("")
    const [openModal, setOpenModal] = useState(false)

    // Remove service by id
    const handleRemove = async (serviceId: string) => {
        try {
            await DeleteService(serviceId)
            onServiceUpdate()
        } catch (error) {
            console.log(error)
        }
    }

    // Open modal and set state to edit the selected service
    const handleEditClick = (service: Service) => {
        setOpenModal(true)
        setEditingService(service)
        setEditTitle(service.title)
        setEditDescription(service.description)
    }

    // Save changes made in the dialog
    const handleEditSave = async () => {
        if (!editingService) return
        try {
            await EditService(editingService.id, {
                title: editTitle,
                description: editDescription,
                status: 0
            })
            setOpenModal(false)
            onServiceUpdate()
            setEditingService(null)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="flex flex-col w-full max-w-2xl border-x border-t">
            {services.length > 0 ? (
                services.map((service) => (
                    <div key={service.id} className="w-full border-b p-4">
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="text-lg">{service.title}</div>
                                    <div className="text-sm text-zinc-400">{service.description}</div>
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
                            <div className="flex gap-2">
                                <div
                                    onClick={() => handleEditClick(service)}
                                    className="p-1 h-fit px-3 flex gap-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 items-center cursor-pointer"
                                >
                                    <Pencil className="w-4 h-4" />
                                    <div className="text-sm">Edit</div>
                                </div>
                                <div
                                    className="p-1 h-fit px-3 flex gap-1 bg-red-600 hover:bg-red-700 text-black items-center cursor-pointer"
                                    onClick={() => handleRemove(service.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <div className="text-sm">Delete</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-8 flex justify-center text-xs text-zinc-400 border-b">
                    No services yet.
                </div>
            )}

            {/* Single Dialog for editing, triggered via editingService */}
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Service</DialogTitle>
                        <DialogDescription>You can update your service details here.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <Input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Service title"
                        />
                        <Textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Service description"
                            className="resize-none"
                        />
                    </div>
                    <DialogFooter className="grid grid-cols-2 gap-2">
                        <Button
                            onClick={() => setOpenModal(false)}
                            className="border bg-black text-zinc-400 cursor-pointer hover:bg-zinc-950/40 rounded-lg"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-green-500 hover:bg-green-600 cursor-pointer"
                            onClick={handleEditSave}
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ActiveServices
