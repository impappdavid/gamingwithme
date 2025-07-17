import { useTranslation } from "react-i18next"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Languages} from "lucide-react"

function LanguageSelector() {
    const { t, i18n } = useTranslation()
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="relative rounded-lg h-9 w-9 bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center px-2 cursor-pointer transition-all duration-200">
                        <Languages className="w-5 h-5" />

                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1" onClick={() => i18n.changeLanguage('en')}>
                            {t("English")}
                            <DropdownMenuShortcut>En</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1" onClick={() => i18n.changeLanguage('hu')}>
                            {t("Hungary")}
                            <DropdownMenuShortcut>Hu</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1" onClick={() => i18n.changeLanguage('de')}>
                            {t("Deutsch")}
                            <DropdownMenuShortcut>De</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem className=" hover:bg-zinc-500/20 flex gap-1" onClick={() => i18n.changeLanguage('sp')}>
                            {t("Spanish")}
                            <DropdownMenuShortcut>Sp</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
export default LanguageSelector