import { Input } from "@/components/ui/input"
import { DollarSign, Search, ChevronUp, ChevronDown, Funnel, X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next";

function Filter({
    filterText,
    setFilterText,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    orderBy,
    setOrderBy,
    showActive,
    setShowActive,
}: {
    filterText: string;
    setFilterText: (v: string) => void;
    minPrice: number | undefined;
    setMinPrice: (v: number | undefined) => void;
    maxPrice: number | undefined;
    setMaxPrice: (v: number | undefined) => void;
    orderBy: string;
    setOrderBy: (v: string) => void;
    showActive: boolean;
    setShowActive: (v: boolean) => void;
}) {
    const handleMinPriceChange = (increment: boolean) => {
        const currentValue = minPrice || 0;
        const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1);
        setMinPrice(newValue);
    };

    const handleMaxPriceChange = (increment: boolean) => {
        const currentValue = maxPrice || 0;
        const newValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1);
        setMaxPrice(newValue);
    };

    const {t} = useTranslation()

    return (
        <div className="flex gap-2 items-center p-2">
            <div className="relative w-full ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4.5 w-4.5 text-zinc-500" />
                </div>
                <Input
                    id="filter"
                    type="text"
                    placeholder={t("searchpog")}
                    className="pl-9 h-10 rounded-xl text-[14px] lg:text-[14px] bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300  "
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                />
            </div>
            <div className="hidden sm:flex items-center">
                <Button
                    type="button"
                    className={`h-10 px-4 rounded-xl text-zinc-400 border cursor-pointer border-zinc-800 bg-zinc-800/40 hover:bg-zinc-800/80 transition-all flex items-center gap-2 ${showActive ? 'ring-2 ring-green-500' : ''}`}
                    onClick={() => setShowActive(!showActive)}
                >
                    <span className="relative flex h-2 w-2">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span>Online</span>
                </Button>
            </div>
            <div className="relative max-w-46 hidden md:flex">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4.5 w-4.5 text-zinc-500" />
                </div>
                <Input
                    id="minPrice"
                    type="number"
                    min={0}
                    placeholder={t("min")}
                    className="pl-9 pr-16 h-10 rounded-xl lg:text-[14px] bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                    value={minPrice === undefined ? '' : minPrice}
                    onChange={(e) => setMinPrice(e.target.value === '' ? undefined : Number(e.target.value))}
                />
                <div className="absolute  inset-y-0 right-0 flex items-center">
                    <div className="flex flex-col">
                        <Button
                            type="button"
                            onClick={() => handleMinPriceChange(true)}
                            className="h-5 w-7 flex items-center justify-center bg-zinc-800/40 text-zinc-400 hover:bg-green-500/50 hover:text-white border-l cursor-pointer border-zinc-800 transition-all   rounded-tr-xl  rounded-b-none rounded-l-none"
                        >
                            <ChevronUp className="h-3 w-3 " />
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleMinPriceChange(false)}
                            className="h-5 w-7 flex items-center justify-center bg-zinc-800/40 text-zinc-400 hover:bg-green-500/50 hover:text-white border-l cursor-pointer border-zinc-800 transition-all  rounded-br-xl  rounded-t-none rounded-l-none"
                        >
                            <ChevronDown className="h-3 w-3 " />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="relative max-w-46 hidden md:flex">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4.5 w-4.5 text-zinc-500" />
                </div>
                <Input
                    id="maxPrice"
                    type="number"
                    min={0}
                    placeholder={t("max")}
                    className="pl-9 pr-16 h-10 rounded-xl lg:text-[14px] bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                    value={maxPrice === undefined ? '' : maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value === '' ? undefined : Number(e.target.value))}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <div className="flex flex-col">
                        <Button
                            type="button"
                            onClick={() => handleMaxPriceChange(true)}
                            className="h-5 w-7 flex items-center justify-center bg-zinc-800/40 text-zinc-400 hover:bg-green-500/50 hover:text-white border-l cursor-pointer border-zinc-800 transition-all   rounded-tr-xl  rounded-b-none rounded-l-none"
                        >
                            <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                            type="button"
                            onClick={() => handleMaxPriceChange(false)}
                            className="h-5 w-7 flex items-center justify-center bg-zinc-800/40 text-zinc-400 hover:bg-green-500/50 hover:text-white border-l cursor-pointer border-zinc-800 transition-all  rounded-br-xl  rounded-t-none rounded-l-none"
                        >
                            <ChevronDown className="h-3 w-3 " />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex">
                <Select value={orderBy} onValueChange={setOrderBy}>
                    <SelectTrigger className="w-fit h-10">
                        <SelectValue placeholder="Order by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="highest">{t("highest")}</SelectItem>
                            <SelectItem value="lowest">{t("lowest")}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="relative md:hidden rounded-lg h-10 min-w-10 bg-zinc-800/50 hover:bg-zinc-800 border flex gap-2 text-zinc-400 items-center justify-center px-2 cursor-pointer transition-all duration-200">
                        <Funnel className="w-4.5 h-4.5" />

                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] h-fit  max-h-[800px] flex flex-col ">
                    <DialogHeader className="flex flex-col gap-3">
                        <DialogTitle className="flex justify-between items-center gap-4">
                            <div className="">{t("filter")}</div>
                            <DialogClose>
                                <X className="w-4.5 h-4.5" />
                            </DialogClose>
                        </DialogTitle>

                        <div className="h-[2px] bg-zinc-800 w-full"></div>
                        <DialogDescription>
                            <div className="flex flex-col gap-4">
                                <Select value={orderBy} onValueChange={setOrderBy}>
                                    <SelectTrigger className="w-full h-10">
                                        <SelectValue placeholder="Order by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="highest">{t("highest")}</SelectItem>
                                            <SelectItem value="lowest">{t("lowest")}</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <div className="flex items-center">
                                    <Button
                                        type="button"
                                        className={`h-10 px-4 w-full justify-start rounded-xl text-zinc-400 border cursor-pointer border-zinc-800 bg-zinc-800/40 hover:bg-zinc-800/80 transition-all flex items-center gap-2 ${showActive ? 'ring-2 ring-green-500' : ''}`}
                                        onClick={() => setShowActive(!showActive)}
                                    >
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span>Online</span>
                                    </Button>
                                </div>
                                <div className="relative w-full ">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <DollarSign className="h-4.5 w-4.5 text-zinc-500" />
                                    </div>
                                    <Input
                                        id="minPrice"
                                        type="number"
                                        min={0}
                                        placeholder={t("min")}
                                        className="pl-9 pr-16 h-10 rounded-xl lg:text-[14px] bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                        value={minPrice === undefined ? '' : minPrice}
                                        onChange={(e) => setMinPrice(e.target.value === '' ? undefined : Number(e.target.value))}
                                    />
                                    <div className="absolute  inset-y-0 right-0 flex items-center">
                                        <div className="flex flex-col">
                                            <Button
                                                type="button"
                                                onClick={() => handleMinPriceChange(true)}
                                                className="h-5 w-7 flex items-center justify-center bg-zinc-800/40 text-zinc-400 hover:bg-green-500/50 hover:text-white border-l cursor-pointer border-zinc-800 transition-all   rounded-tr-xl  rounded-b-none rounded-l-none"
                                            >
                                                <ChevronUp className="h-3 w-3 " />
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={() => handleMinPriceChange(false)}
                                                className="h-5 w-7 flex items-center justify-center bg-zinc-800/40 text-zinc-400 hover:bg-green-500/50 hover:text-white border-l cursor-pointer border-zinc-800 transition-all  rounded-br-xl  rounded-t-none rounded-l-none"
                                            >
                                                <ChevronDown className="h-3 w-3 " />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative w-full ">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <DollarSign className="h-4.5 w-4.5 text-zinc-500" />
                                    </div>
                                    <Input
                                        id="maxPrice"
                                        type="number"
                                        min={0}
                                        placeholder={t("max")}
                                        className="pl-9 pr-16 h-10 rounded-xl lg:text-[14px] bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300"
                                        value={maxPrice === undefined ? '' : maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value === '' ? undefined : Number(e.target.value))}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                        <div className="flex flex-col">
                                            <Button
                                                type="button"
                                                onClick={() => handleMaxPriceChange(true)}
                                                className="h-5 w-7 flex items-center justify-center bg-zinc-800/40 text-zinc-400 hover:bg-green-500/50 hover:text-white border-l cursor-pointer border-zinc-800 transition-all   rounded-tr-xl  rounded-b-none rounded-l-none"
                                            >
                                                <ChevronUp className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={() => handleMaxPriceChange(false)}
                                                className="h-5 w-7 flex items-center justify-center bg-zinc-800/40 text-zinc-400 hover:bg-green-500/50 hover:text-white border-l cursor-pointer border-zinc-800 transition-all  rounded-br-xl  rounded-t-none rounded-l-none"
                                            >
                                                <ChevronDown className="h-3 w-3 " />
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                                <div className="grid grid-cols-2 w-full gap-4">
                                    <DialogClose >
                                        <Button className="w-full rounded-xl bg-zinc-800 hover:bg-zinc-700/40 border text-zinc-400">{t("close")}</Button>
                                    </DialogClose>
                                    <DialogClose>
                                        <Button className="w-full rounded-xl bg-green-500 hover:bg-green-500/60">{t("search")}</Button>
                                    </DialogClose>
                                </div>
                            </div>
                        </DialogDescription>

                    </DialogHeader>

                </DialogContent>
            </Dialog >


        </div >
    )
}
export default Filter