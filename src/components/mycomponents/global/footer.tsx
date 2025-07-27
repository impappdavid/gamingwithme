import { Facebook, Instagram, Mail, HelpCircle, FileText, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

// Simple, stateless Footer
function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="bg-black text-white py-8 border-t border-[#19FF00]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    {/* Logo & copyright */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="logo" className="w-14 h-14"/>
                            <span className="text-2xl font-bold">GamingWithMe</span>
                        </div>
                        <div className="text-xs pl-1.5 text-zinc-400">
                            <p>&copy; 2025 GamingWithMe. {t(`All rights reserved.`)}</p>
                        </div>
                    </div>

                    {/* Social Media: just icon buttons (for demo you can add href if wanted) */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold mb-2">{t(`Follow Us`)}</h3>
                        <div className="flex gap-3">
                            <Button variant="ghost" size="icon" className="text-white hover:text-[#19FF00]">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white hover:text-[#19FF00]">
                                <Instagram className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-white hover:text-[#19FF00]">
                                <Mail className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Navigation/Friendly quick-links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold mb-2">{t(`Quick Links`)}</h3>
                        <div className="flex flex-col gap-2">
                            <Link to="/faq" className="justify-start flex text-white hover:text-[#19FF00] p-0 h-auto text-xs">
                                <HelpCircle className="h-4 w-4 mr-2" />
                                FAQ
                            </Link>
                            <Link to="/terms-and-conditions" className="justify-start text-white flex hover:text-[#19FF00] p-0 h-auto text-xs">
                                <FileText className="h-4 w-4 mr-2" />
                                {t(`Terms and Conditions`)}
                            </Link>
                            <Link to="/support" className="justify-start text-white flex hover:text-[#19FF00] p-0 h-auto text-xs">
                                <HeadphonesIcon className="h-4 w-4 mr-2" />
                                {t(`Support`)}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
