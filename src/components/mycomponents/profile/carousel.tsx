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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { ArrowRightLeft, ChevronDown } from "lucide-react";

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

function generateTimeSlots() {
    const slots = [];
    for (let hour = 9; hour < 22; hour++) {
        for (let min = 0; min < 60; min += 30) {
            let startHour = hour;
            let startMin = min;
            let endHour = hour;
            let endMin = min + 30;
            if (endMin >= 60) {
                endHour += Math.floor(endMin / 60);
                endMin = endMin % 60;
            }
            if (endHour >= 22) break;
            slots.push({
                start: `${pad(startHour)}:${pad(startMin)}`,
                end: `${pad(endHour)}:${pad(endMin)}`,
            });
        }
    }
    return slots;
}

// Generate sample availability data for today and next 30 days
function generateSampleAvailability() {
    const availability: Record<string, Record<string, { available: boolean; price: number }>> = {};
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateKey = date.toISOString().split('T')[0];
        
        // Generate time slots for this date
        const slots: Record<string, { available: boolean; price: number }> = {};
        
        for (let hour = 9; hour < 22; hour++) {
            for (let min = 0; min < 60; min += 30) {
                let startHour = hour;
                let startMin = min;
                let endHour = hour;
                let endMin = min + 30;
                if (endMin >= 60) {
                    endHour += Math.floor(endMin / 60);
                    endMin = endMin % 60;
                }
                if (endHour >= 22) break;
                
                const slotKey = `${pad(startHour)}:${pad(startMin)}-${pad(endHour)}:${pad(endMin)}`;
                
                // Random availability (70% available, 30% taken)
                const isAvailable = Math.random() > 0.3;
                
                // Different pricing based on day of week and time
                let basePrice = 15.99;
                const dayOfWeek = date.getDay();
                
                // Weekend pricing
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    basePrice = 18.99;
                }
                
                // Evening pricing (after 6 PM)
                if (hour >= 18) {
                    basePrice += 2.00;
                }
                
                // Add some randomness to pricing
                const finalPrice = basePrice + (Math.random() * 3 - 1.5);
                
                slots[slotKey] = {
                    available: isAvailable,
                    price: Math.round(finalPrice * 100) / 100
                };
            }
        }
        
        availability[dateKey] = slots;
    }
    
    return availability;
}

const sampleAvailability = generateSampleAvailability();

function Carousel() {
    // State for current month/year in view
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{ time: string; price: number } | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const carouselRef = useRef<any>(null);
    const hasScrolledToSelected = useRef(false);

    // Generate days for the current month
    const daysInMonth = getMonthDays(currentYear, currentMonth);
    // Only show today and future days in the carousel
    const visibleDays = daysInMonth.filter(d => {
        const day = new Date(d);
        day.setHours(0, 0, 0, 0);
        return day.getTime() >= today.getTime();
    });

    // Scroll carousel to selected day (today by default) on mount or when month changes
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

    // When a date is picked from the calendar, update month/year and selectedDate
    const handleCalendarSelect = (date: Date | undefined) => {
        if (date) {
            // Only allow today and future dates
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            date.setHours(0, 0, 0, 0);
            
            if (date >= today) {
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
        }
    };

    // Handle slot selection
    const handleSlotClick = (slot: string) => {
        const dateKey = selectedDate.toISOString().split('T')[0];
        const availability = sampleAvailability[dateKey];
        
        if (availability && availability[slot] && availability[slot].available) {
            setSelectedSlot({ time: slot, price: availability[slot].price });
            setDialogOpen(true);
        }
    };

    

    // Get availability for selected date
    const getDateAvailability = (date: Date) => {
        const dateKey = date.toISOString().split('T')[0];
        const availability = sampleAvailability[dateKey];
        
        if (!availability) return { available: 0, total: 0, avgPrice: 0 };
        
        const slots = Object.values(availability);
        const available = slots.filter(slot => slot.available).length;
        const total = slots.length;
        const avgPrice = slots.reduce((sum, slot) => sum + slot.price, 0) / total;
        
        return { available, total, avgPrice };
    };

    // Check if date is in the past
    const isDateInPast = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date < today;
    };

   

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
            <div className="relative max-w-2xl mx-auto">
                <ShadCarousel className="w-full" opts={{ align: "center" }} setApi={api => (carouselRef.current = api)}>
                    <CarouselPrevious />
                    <CarouselContent className=" ">
                        {visibleDays.map((d) => {
                            const availability = getDateAvailability(d);
                            const isPast = isDateInPast(d);
                            
                            return (
                                <CarouselItem key={d.toISOString()} className="basis-1/4 sm:basis-1/7">
                                    <Card
                                        className={`cursor-pointer transition-all duration-200 border-2 px-2 py-2 rounded-lg text-center min-w-[85px] max-w-[85px] h-[85px] mx-auto flex flex-col justify-center ${
                                            selectedDate.toDateString() === d.toDateString() 
                                                ? "border-green-500 bg-zinc-900" 
                                                : isPast 
                                                    ? "border-zinc-700 bg-zinc-900 opacity-50" 
                                                    : "border-zinc-800 bg-zinc-950"
                                        }`}
                                        onClick={() => !isPast && setSelectedDate(d)}
                                    >
                                        <CardContent className="flex flex-col items-center gap-1 p-0 justify-center h-full">
                                            <span className="text-xs text-zinc-400">{getWeekday(d)}</span>
                                            <CardTitle className="text-base font-bold p-0 m-0">{pad(d.getDate())}</CardTitle>
                                            <CardDescription className="text-[10px] mt-0">
                                                {isPast ? (
                                                    <span className="text-zinc-500">Past</span>
                                                ) : (
                                                    <>
                                                        <span className="text-green-500 font-semibold">{availability.available} available</span>
                                                        <br />
                                                        <span className="text-zinc-400">${availability.avgPrice.toFixed(2)}</span>
                                                    </>
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

           

            {/* Time slots grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-2 w-full mx-auto">
                {generateTimeSlots().map((slot) => {
                    const slotKey = `${slot.start}-${slot.end}`;
                    const dateKey = selectedDate.toISOString().split('T')[0];
                    const availability = sampleAvailability[dateKey];
                    const slotData = availability?.[slotKey];
                    
                    if (!slotData) return null;
                    
                    const isAvailable = slotData.available;
                    
                    return (
                        <Button
                            key={slotKey}
                            variant="outline"
                            className={`h-12 flex items-center justify-between rounded-xl border-2 text-xs font-mono cursor-pointer transition-all duration-300 ${
                                isAvailable 
                                    ? "bg-green-500 border-green-500 text-black hover:bg-green-600" 
                                    : "bg-red-500 border-red-500 text-white opacity-50 cursor-not-allowed"
                            }`}
                            onClick={() => handleSlotClick(slotKey)}
                            disabled={!isAvailable}
                        >
                            <div className="font-semibold">{slot.start} - {slot.end}</div>
                            <div className="text-xs">${slotData.price}</div>
                        </Button>
                    );
                })}
            </div>

            {/* Booking Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="bg-zinc-950 border-zinc-800 max-w-md p-0">
                    <div className="flex flex-col w-full">
                        {/* You send section */}
                        <div className="flex items-center justify-between px-6 pt-6 pb-2">
                            <div className="flex flex-col">
                                <span className="text-zinc-400 text-xs">You send</span>
                                <span className="text-2xl text-white font-bold">${selectedSlot?.price ?? 0}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800">
                                <span className="w-5 h-5 flex items-center justify-center">
                                    {/* Example: game controller icon or $ sign */}
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#f7931a"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">$</text></svg>
                                </span>
                                <span className="text-white font-medium">USD</span>
                            </div>
                        </div>
                        {/* Swap icon */}
                        <div className="flex justify-center items-center py-1">
                            <ArrowRightLeft />
                        </div>
                        {/* You receive section */}
                        <div className="flex items-center justify-between px-6 pb-2">
                            <div className="flex flex-col">
                                <span className="text-zinc-400 text-xs">You receive</span>
                                <span className="text-2xl text-white font-bold">1x Game Session</span>
                            </div>
                            <div className="flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-800">
                                <span className="w-5 h-5 flex items-center justify-center">
                                    {/* Example: controller icon */}
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" rx="4" fill="#a3e635"/><circle cx="8" cy="12" r="1.5" fill="#fff"/><circle cx="16" cy="12" r="1.5" fill="#fff"/></svg>
                                </span>
                                <span className="text-lime-400 font-medium">Session</span>
                            </div>
                        </div>
                        {/* Exchange button  */}
                        <div className="px-6 pt-4 pb-6">
                            <Button 
                                className="w-full bg-lime-500 hover:bg-lime-600 text-black text-lg font-semibold rounded-xl py-6 cursor-pointer opacity-80"
                                
                            >
                                PAY
                            </Button>
                        </div>
                        
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Carousel;