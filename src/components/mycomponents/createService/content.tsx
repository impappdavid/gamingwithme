import { useTranslation } from "react-i18next"
import Navbar from "../navbar/navbar"
import AddService from "./addService"
import ActiveServices from "./activeServices"
import { GetMyServices } from "@/api/service"
import { useEffect, useState } from "react"

interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    deliveryDeadline: number;
    status: number;
    username: string;
    avatarUrl: string;
    createdAt: string;
}

function CreateService() {
    const { t } = useTranslation()
    const [services, setServices] = useState<Service[]>([])

    const fetchServices = async () => {
        const response = await GetMyServices()
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
            <div className="w-full h-full xl:h-screen sm:p-2">
                <div className="w-full flex flex-col h-full min-h-screen sm:min-h-0 sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Create Service")} />
                    </div>
                    <div className="w-full flex flex-col gap-4 items-center py-4">
                        <div className="flex w-full justify-between max-w-2xl items-center">
                            <div className="text-2xl">Create Service</div>
                            <AddService onServiceAdded={fetchServices} />
                        </div>
                        <ActiveServices services={services} onServiceUpdate={fetchServices} />

                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateService