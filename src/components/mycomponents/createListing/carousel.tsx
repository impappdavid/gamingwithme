import { useState, useRef, useEffect } from "react";
import {
    Carousel as ShadCarousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown } from "lucide-react";
import { AddNewBooking } from "@/api/booking";

const durationOptions = [30, 45, 60];
const pad = (n: number) => n.toString().padStart(2, "0");
const getWeekday = (date: Date) => date.toLocaleDateString("en-US", { weekday: "short" });
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function getMonthDays(year: number, month: number) {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

function generateTimeSlots(duration: number) {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let min = 0; min < 60; min += duration) {
            let startHour = hour;
            let startMin = min;
            let endHour = hour;
            let endMin = min + duration;
            if (endMin >= 60) {
                endHour += Math.floor(endMin / 60);
                endMin = endMin % 60;
            }
            if (endHour >= 24) break;
            slots.push({
                start: `${pad(startHour)}:${pad(startMin)}`,
                end: `${pad(endHour)}:${pad(endMin)}`,
            });
        }
    }
    return slots;
}

function Carousel() {
    // State for current month/year in view
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const [selectedDuration, setSelectedDuration] = useState(durationOptions[0]);
    const [price, setPrice] = useState("4.99");
    const [calendarOpen, setCalendarOpen] = useState(false);
    const carouselRef = useRef<any>(null);
    const hasScrolledToSelected = useRef(false);
    const [selectedSlots, setSelectedSlots] = useState<{ [slot: string]: string }>(() => ({}));

    // Generate days for the current month
    const daysInMonth = getMonthDays(currentYear, currentMonth);

    // Only show today and future days in the carousel
    const visibleDays = daysInMonth.filter(d => {
        const day = new Date(d);
        day.setHours(0, 0, 0, 0);
        return day.getTime() >= today.getTime();
    });

    // Scroll carousel to today (or first available future date) on mount or when month changes
    useEffect(() => {
        let targetIdx = visibleDays.findIndex(d => {
            const day = new Date(d);
            day.setHours(0, 0, 0, 0);
            return day.getTime() === today.getTime();
        });
        // If today is not in this month, scroll to first available future date
        if (targetIdx === -1) {
            targetIdx = 0;
        }
        if (carouselRef.current && carouselRef.current.scrollTo && targetIdx >= 0) {
            if (!hasScrolledToSelected.current) {
                carouselRef.current.scrollTo(targetIdx, true);
                hasScrolledToSelected.current = true;
            }
        }
    }, [visibleDays, selectedDate]);

    // Reset scroll flag when month/year changes
    useEffect(() => {
        hasScrolledToSelected.current = false;
    }, [currentYear, currentMonth]);

    // Check if date is in the past
    const isDateInPast = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date < today;
    };

    // When a date is picked from the calendar, update month/year and selectedDate
    const handleCalendarSelect = (date: Date | undefined) => {
        if (date) {
            // Only allow today and future dates
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            date.setHours(0, 0, 0, 0);
            if (date < today) return;
            setCurrentYear(date.getFullYear());
            setCurrentMonth(date.getMonth());
            setSelectedDate(date);
            setCalendarOpen(false);
            // Optionally scroll carousel to the selected day
            setTimeout(() => {
                if (carouselRef.current && carouselRef.current.scrollTo) {
                    const idx = getMonthDays(date.getFullYear(), date.getMonth()).findIndex(d => d.toDateString() === date.toDateString());
                    if (idx >= 0) carouselRef.current.scrollTo(idx, true);
                }
            }, 100);
        }
    };

    // Time slot selection logic
    const handleTimeSelect = (slot: string) => {
        setSelectedSlots(prev => {
            if (prev[slot]) {
                // Deselect
                const newSlots = { ...prev };
                delete newSlots[slot];
                return newSlots;
            } else {
                // Select with current price
                return { ...prev, [slot]: price };
            }
        });

        const [startTime, endTime] = slot.split("-");
        const formattedStartTime = `${startTime}:00`;
        handleSubmit(formattedStartTime, endTime)
    };

    const handleSubmit = async (start: string, end: string) => {

        const dateObj: Date = new Date(selectedDate);

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(dateObj.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate, start, selectedDuration.toLocaleString(), Number(price))
        const minutes = Number(selectedDuration); // e.g., 30
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        const formattedDuration = `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:00`;


        try {
            await AddNewBooking(formattedDate, start, formattedDuration, Number(price))

        } catch (err: any) {
            console.error(err.message || "Failed to add game.")
        }

    }

    // Selected day display
    const selectedDayLabel = `${getWeekday(selectedDate)}, ${pad(selectedDate.getDate())}`;

    return (
        <div className="space-y-6 w-full">
            {/* Centered year/month as calendar dropdown trigger */}
            <div className="flex justify-center mb-2">
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="text-2xl font-bold text-white flex items-center gap-2 px-4 py-2 hover:bg-zinc-900">
                            {currentYear}, {monthNames[currentMonth]}
                            <ChevronDown className="w-5 h-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="center" className="p-2 bg-zinc-950 rounded-xl shadow-xl border-zinc-800">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleCalendarSelect}
                            disabled={(date) => isDateInPast(date)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Date Carousel */}
            <div className="relative max-w-xl mx-auto">
                <ShadCarousel className="w-full" opts={{ align: "center" }} setApi={api => (carouselRef.current = api)}>
                    <CarouselPrevious />
                    <CarouselContent className=" ">
                        {visibleDays.map((d) => {
                            const isPast = isDateInPast(d);
                            return (
                                <CarouselItem key={d.toISOString()} className="basis-1/4 sm:basis-1/7">
                                    <Card
                                        className={`cursor-pointer transition-all duration-200 border-2 px-2 py-2 rounded-lg text-center min-w-[80px] max-w-[80px] h-[80px] mx-auto flex flex-col justify-center ${selectedDate.toDateString() === d.toDateString() ? "border-green-500 bg-zinc-900" : isPast ? "border-zinc-700 bg-zinc-900 opacity-50" : "border-zinc-800 bg-zinc-950"}`}
                                        onClick={() => { if (!isPast) setSelectedDate(d); }}
                                    >
                                        <CardContent className="flex flex-col items-center gap-1 p-0 justify-center h-full">
                                            <span className="text-xs text-zinc-400">{getWeekday(d)}</span>
                                            <CardTitle className="text-base font-bold p-0 m-0">{pad(d.getDate())}</CardTitle>
                                            <CardDescription className="text-[10px] mt-0">
                                                {isPast ? (
                                                    <span className="text-zinc-500">Past</span>
                                                ) : (
                                                    <span className="text-green-500 font-semibold">{(d.getDate() % 3) + 1} active</span>
                                                )}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselNext />
                </ShadCarousel>
            </div>

            {/* Toolbar for duration, price, selected day, and create button */}
            <div className="flex flex-col relative max-w-2xl mx-auto sm:flex-row items-center gap-4 justify-between bg-zinc-900 rounded-xl px-4 py-2">
                <div className="flex items-center gap-2">
                    <span className="text-zinc-400 font-semibold text-xs">{selectedDayLabel} | {currentYear} {monthNames[currentMonth]}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-white text-xs">Duration:</span>
                    <Select value={selectedDuration.toString()} onValueChange={val => setSelectedDuration(Number(val))} disabled={selectedDuration === 30 && Object.keys(selectedSlots).length > 0}>
                        <SelectTrigger className="w-24">
                            <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                            {durationOptions.map(d => (
                                <SelectItem key={d} value={d.toString()}>{d}m</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-white text-xs">Price:</span>
                    <Input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-24 bg-zinc-800/40 h-8.5 rounded-xl border-zinc-800 text-white"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
            </div>

            {/* List all time slots for the selected duration */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto">
                {generateTimeSlots(selectedDuration).map((slot) => {
                    const slotKey = `${slot.start}-${slot.end}`;
                    const isSelected = selectedSlots[slotKey] !== undefined;
                    // Disable slot selection if selectedDate is in the past
                    const isPastDay = isDateInPast(selectedDate);
                    return (
                        <>
                            {
                                isSelected ? (
                                    <Button
                                        key={slotKey}
                                        variant="outline"
                                        className={`h-10 flex flex-col items-center justify-center rounded-xl border-2 text-xs font-mono cursor-pointer transition-all duration-300 ${isSelected ? "bg-green-500 border-green-500 text-black" : "bg-zinc-900 border-zinc-900 text-white"}`}
                                        onClick={() => !isPastDay && handleTimeSelect(slotKey)}
                                        disabled={isPastDay}
                                    >
                                        {isSelected ? (
                                            <span>{slot.start} - {slot.end} | ${selectedSlots[slotKey]}</span>
                                        ) : (
                                            <span>{slot.start} - {slot.end}</span>
                                        )}
                                    </Button>
                                ) : (
                                    <Button
                                        key={slotKey}
                                        variant="outline"
                                        className={`h-10 flex flex-col items-center justify-center rounded-xl border-2 text-xs font-mono cursor-pointer transition-all duration-300 ${isSelected ? "bg-green-500 border-green-500 text-black" : "bg-zinc-900 border-zinc-900 text-white"}`}
                                        onClick={() => !isPastDay && handleTimeSelect(slotKey)}
                                        disabled={isPastDay}
                                    >
                                        {isSelected ? (
                                            <span>{slot.start} - {slot.end} | ${selectedSlots[slotKey]}</span>
                                        ) : (
                                            <span>{slot.start} - {slot.end}</span>
                                        )}
                                    </Button>
                                )}
                        </>
                    );

                })}
            </div >
        </div >

    );
}

export default Carousel;