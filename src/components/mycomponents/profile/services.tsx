import { GetServicesById, type Service } from "@/api/service"
import { Calendar } from "lucide-react"
import { useEffect, useState } from "react"

function Services(userId: any) {
    const [services, setServices] = useState<Service[]>([])


    const fetchServices = async () => {
        const response = await GetServicesById(userId)
        if (response) {
            setServices(
                response.map((service: any) => ({
                    ...service,
                    id: String(service.id),
                }))
            )
        }
    }

    useEffect(() => {
        fetchServices()
    }, [])

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="text-2xl">Services</div>
                <div className="grid grid-cols-5">
                    {services.map((service, index) => (
                        <div key={index} className={`p-4 bg-zinc-950 border flex flex-col gap-2 rounded-lg  transition-all duration-300 ${service.status === 0 ? "cursor-pointer hover:border-green-500/40" : "cursor-not-allowed hover:border-red-500/40"}`}>
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
        </>
    )
}
export default Services