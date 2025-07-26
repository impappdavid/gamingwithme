import Navbar from "../navbar/navbar"
import { useTranslation } from "react-i18next"
import Footer from "../global/footer"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

function Faq() {
    const { t } = useTranslation()
    return (
        <>
            <div className="w-full xl:h-screen sm:p-2">
                <div className="w-full h-full sm:max-h-screen bg-black sm:rounded-2xl border border-zinc-800 sm:overflow-y-auto relative">
                    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl sm:rounded-t-2xl">
                        <Navbar page={t("FAQ")} />
                    </div>
                    <div className="min-h-[950px] flex justify-center">
                        <div className="w-full max-w-2xl flex flex-col gap-4 py-4">
                            <div className="flex flex-col gap-1">
                                <div className="text-3xl font-semibold">FAQ</div>
                                <div className="text-sm text-zinc-400">A collection of common questions and answers.</div>
                            </div>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>What is Lorem Ipsum?</AccordionTrigger>
                                    <AccordionContent>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Why do we use it?</AccordionTrigger>
                                    <AccordionContent>
                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Where can I get some?</AccordionTrigger>
                                    <AccordionContent>
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}
export default Faq