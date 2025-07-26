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
import { AddNewBooking, GetBooking, DeleteBooking, type BookInfos } from "@/api/booking";

const durationOptions = [30, 45, 60];
const pad = (n: number) => n.toString().padStart(2, "0");
const getWeekday = (date: Date) => date.toLocaleDateString("en-US", { weekday: "short" });
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Helper: Returns array of Date objects for specified month (JS months are 0-based)
function getMonthDays(year: number, month: number) {
    const days = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

// Given a duration (minutes), create time slots for a day
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
    // Local date state/logic
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const [selectedDuration, setSelectedDuration] = useState(durationOptions[0]);
    const [price, setPrice] = useState("5"); // always string for Input
    const [calendarOpen, setCalendarOpen] = useState(false);

    // Used to control/scroll the custom carousel
    const carouselRef = useRef<any>(null);
    const hasScrolledToSelected = useRef(false); // to scroll-to-selected only once per render

    // Track (per slot) booked state, hovering, and cached bookings
    const [bookedSlots, setBookedSlots] = useState<{ [slot: string]: boolean }>({});
    const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

    // Cache bookings for all dates (for dots/calendar)
    const [bookedDates, setBookedDates] = useState<{ [date: string]: BookInfos[] }>({});

    // Days available to show this month (exclude past)
    const daysInMonth = getMonthDays(currentYear, currentMonth);
    const visibleDays = daysInMonth.filter(d => d.getTime() >= today.getTime());

    // On visibleDays/selectedDate, scroll carousel to selected date (first render)
    useEffect(() => {
        let targetIdx = visibleDays.findIndex(d => d.getTime() === today.getTime());
        if (targetIdx === -1) targetIdx = 0;
        if (carouselRef.current?.scrollTo && targetIdx >= 0 && !hasScrolledToSelected.current) {
            carouselRef.current.scrollTo(targetIdx, true);
            hasScrolledToSelected.current = true;
        }
    }, [visibleDays, selectedDate]);

    // When month or year changes, allow scroll to reset again
    useEffect(() => { hasScrolledToSelected.current = false; }, [currentYear, currentMonth]);

    // True if this date is in the past (midnight logic)
    const isDateInPast = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date < today;
    };

    // When a date is selected from calendar, update and scroll to it
    const handleCalendarSelect = (date: Date | undefined) => {
        if (!date || isDateInPast(date)) return;
        date.setHours(0, 0, 0, 0);
        setCurrentYear(date.getFullYear());
        setCurrentMonth(date.getMonth());
        setSelectedDate(date);
        setCalendarOpen(false);
        setTimeout(() => {
            const idx = getMonthDays(date.getFullYear(), date.getMonth()).findIndex(
                d => d.toDateString() === date.toDateString()
            );
            if (carouselRef.current?.scrollTo && idx >= 0) carouselRef.current.scrollTo(idx, true);
        }, 100);
    };

    // Fetch bookings for the currently selected date
    useEffect(() => {
        const fetchBookings = async () => {
            const formattedDate = selectedDate.toISOString().split("T")[0];
            const result = await GetBooking(formattedDate);

            // Map bookings to slot keys for marking booked
            const booked: { [slot: string]: boolean } = {};
            result?.forEach(b => {
                const start = b.startTime.slice(0, 5);
                const key = `${start}-${b.endTime.slice(0, 5)}`;
                booked[key] = true;
            });

            setBookedSlots(booked);
        };
        fetchBookings();
    }, [selectedDate]);

    // Fetch all booked slots for the visible carousel days (for per-day "active count")
    useEffect(() => {
        const fetchAllCarouselDates = async () => {
            const fetches = await Promise.all(
                visibleDays.map(async (date) => {
                    const formatted = date.toISOString().split("T")[0];
                    const res = await GetBooking(formatted);
                    return { date: formatted, data: res || [] };
                })
            );
            const map: { [key: string]: BookInfos[] } = {};
            fetches.forEach(({ date, data }) => {
                map[date] = data;
            });
            setBookedDates(map);
        };
        fetchAllCarouselDates();
    }, [currentMonth, currentYear]);

    // Book or unbook a slot for the selected date
    const handleTimeSelect = async (slot: string) => {
        const [startTime] = slot.split("-");
        const formattedStartTime = `${startTime}:00`;
        const formattedDate = selectedDate.toISOString().split("T")[0];

        if (bookedSlots[slot]) {
            // Unbook: call API then update state
            await DeleteBooking(formattedDate, formattedStartTime);
            const updated = { ...bookedSlots };
            delete updated[slot];
            setBookedSlots(updated);
        } else {
            // Book: call API then mark slot as booked
            const minutes = Number(selectedDuration);
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            const formattedDuration = `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:00`;
            await AddNewBooking(formattedDate, formattedStartTime, formattedDuration, Number(price));
            setBookedSlots(prev => ({ ...prev, [slot]: true }));
        }
    };

    // Display for current selected date
    const selectedDayLabel = `${getWeekday(selectedDate)}, ${pad(selectedDate.getDate())}`;

    return (
        <div className="space-y-6 w-full">
            {/* Month selection with calendar */}
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
                            disabled={isDateInPast}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Date carousel */}
            <div className="relative max-w-xl mx-auto">
                <ShadCarousel className="w-full" opts={{ align: "center" }} setApi={api => (carouselRef.current = api)}>
                    <CarouselPrevious />
                    <CarouselContent>
                        {visibleDays.map((d) => {
                            const isPast = isDateInPast(d);
                            const formatted = d.toISOString().split("T")[0];
                            const activeCount = bookedDates[formatted]?.length || 0;
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
                                                    <span className="text-green-500 font-semibold">{activeCount} active</span>
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

            {/* Time slot controls */}
            <div className="flex flex-col relative max-w-2xl mx-auto sm:flex-row items-center gap-4 justify-between bg-zinc-900 rounded-xl px-4 py-2">
                <div className="flex items-center gap-2">
                    <span className="text-zinc-400 font-semibold text-xs">{selectedDayLabel} | {currentYear} {monthNames[currentMonth]}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-white text-xs">Duration:</span>
                    <Select value={selectedDuration.toString()} onValueChange={val => setSelectedDuration(Number(val))}>
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

            {/* Bookable time slots */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto">
                {generateTimeSlots(selectedDuration).map((slot) => {
                    const slotKey = `${slot.start}-${slot.end}`;
                    const isPastDay = isDateInPast(selectedDate);
                    const isBooked = bookedSlots[slotKey];
                    const isHovered = hoveredSlot === slotKey;
                    return (
                        <Button
                            key={slotKey}
                            variant="outline"
                            className={`h-10 flex flex-col items-center justify-center rounded-xl border-2 text-xs font-mono cursor-pointer transition-all duration-300
                            ${isBooked
                                    ? isHovered
                                        ? "bg-red-500 border-red-500 text-black"
                                        : "bg-green-500 border-green-500 text-black"
                                    : "bg-zinc-900 border-zinc-900 text-white"
                                }`}
                            onClick={() => !isPastDay && handleTimeSelect(slotKey)}
                            onMouseEnter={() => setHoveredSlot(slotKey)}
                            onMouseLeave={() => setHoveredSlot(null)}
                            disabled={isPastDay}
                        >
                            <span>{slot.start} - {slot.end}</span>
                        </Button>
                    );
                })}
            </div >
        </div>
    );
}

export default Carousel;
