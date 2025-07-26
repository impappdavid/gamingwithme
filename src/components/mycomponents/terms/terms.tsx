import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import Footer from "../global/footer"
import { ScrollArea } from "@/components/ui/scroll-area";

function TermsAndConditions() {
    const { t } = useTranslation()
    return (
        <>
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("Terms and conditions")} />
                    </div>
                    <div className="min-h-[950px] flex justify-center">
                        <div className="w-full max-w-2xl flex flex-col gap-4 py-4">
                            <div className="flex flex-col gap-1">
                                <div className="text-3xl font-semibold">Terms & Conditions</div>
                            </div>
                            <ScrollArea className="h-[800px] w-full border p-6">
                                <h3 className="font-semibold mb-2">1. Introduction</h3>
                                <p className="text-xs text-zinc-400 mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec mauris sit amet erat ultricies consequat.
                                </p>
                                <h3 className="font-semibold mb-2">2. User Obligations</h3>
                                <p className="text-xs text-zinc-400  mb-4">
                                    Pellentesque ut sapien eu augue tristique facilisis. Aenean fermentum, odio id pretium dictum, ipsum augue dictum velit.
                                </p>
                                <h3 className="font-semibold ">3. Intellectual Property</h3>
                                <p className="text-xs text-zinc-400  mb-4">
                                    In hac habitasse platea dictumst. Sed venenatis, urna eu feugiat tincidunt, enim diam feugiat mauris.
                                </p>
                                <h3 className="font-semibold mb-2">4. Limitation of Liability</h3>
                                <p className="text-xs text-zinc-400  mb-4">
                                    Morbi ac lectus a odio cursus pharetra. Suspendisse eu dignissim lectus. Mauris condimentum semper neque.
                                </p>
                                <h3 className="font-semibold mb-2">5. Governing Law</h3>
                                <p className="text-xs text-zinc-400  mb-4">
                                    Nullam volutpat, erat in laoreet dictum, dui odio tempor erat, et dapibus purus nibh nec massa.
                                </p>
                                <h3 className="font-semibold mb-2">6. Governing Law</h3>
                                <p className="text-xs text-zinc-400  mb-4">
                                    Nullam volutpat, erat in laoreet dictum, dui odio tempor erat, et dapibus purus nibh nec massa.
                                </p>
                                <h3 className="font-semibold mb-2">7. Governing Law</h3>
                                <p className="text-xs text-zinc-400  mb-4">
                                    Nullam volutpat, erat in laoreet dictum, dui odio tempor erat, et dapibus purus nibh nec massa.
                                </p>
                                <h3 className="font-semibold mb-2">8. Governing Law</h3>
                                <p className="text-xs text-zinc-400  mb-4">
                                    Nullam volutpat, erat in laoreet dictum, dui odio tempor erat, et dapibus purus nibh nec massa.
                                </p>
                                <h3 className="font-semibold mb-2">9. Governing Law</h3>
                                <p className="text-xs text-zinc-400  mb-4">
                                    Nullam volutpat, erat in laoreet dictum, dui odio tempor erat, et dapibus purus nibh nec massa.
                                </p>
                                <h3 className="font-semibold mb-2">10. Governing Law</h3>
                                <p className="text-xs text-zinc-400  mb-4">
                                    Nullam volutpat, erat in laoreet dictum, dui odio tempor erat, et dapibus purus nibh nec massa.
                                </p>

                            </ScrollArea>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default TermsAndConditions