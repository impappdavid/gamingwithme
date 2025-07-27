import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FilterProps {
    filterText: string;
    setFilterText: (v: string) => void;
}

function Filter({
    filterText,
    setFilterText,
}: FilterProps) {

    const { t } = useTranslation()

    return (
        <div className="flex gap-2 items-center p-2">
            <div className="relative w-full ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4.5 w-4.5 text-zinc-500" />
                </div>
                <Input
                    id="filter"
                    type="text"
                    placeholder={t("Search games...")}
                    className="pl-9 h-10 rounded-xl text-[14px] lg:text-[14px] bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                    value={filterText}
                    // This keeps the input value and filterText prop in sync
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </div>
        </div >
    )
}

export default Filter
