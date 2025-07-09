import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, CircleDollarSign, Plus } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

interface TimeSlot {
    id: string;
    start: string;
    end: string;
    price?: string; // Added price field
}

interface DayAvailability {
    date: string;
    slots: TimeSlot[];
    isAvailable: boolean;
}

const AvailabilityCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [availability, setAvailability] = useState<Record<string, DayAvailability>>({
        '2024-12-15': {
            date: '2024-12-15',
            slots: [
                { id: '1', start: '09:00', end: '12:00' },
                { id: '2', start: '14:00', end: '17:00' }
            ],
            isAvailable: true
        },
        '2024-12-16': {
            date: '2024-12-16',
            slots: [
                { id: '3', start: '10:00', end: '15:00' }
            ],
            isAvailable: true
        }
    });
    const [showAddSlotForm, setShowAddSlotForm] = useState(false);
    const durationOptions = [30, 45, 60];
    const [selectedDuration, setSelectedDuration] = useState(30); // default 30m
    const [price, setPrice] = useState('4.99');

    function generateTimeSlots(duration: number) {
        const slots = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let min = 0; min < 60; min += duration) {
                const startHour = hour.toString().padStart(2, '0');
                const startMin = min.toString().padStart(2, '0');
                let endHour = hour;
                let endMin = min + duration;
                if (endMin >= 60) {
                    endHour += Math.floor(endMin / 60);
                    endMin = endMin % 60;
                }
                if (endHour >= 24) break;
                const endHourStr = endHour.toString().padStart(2, '0');
                const endMinStr = endMin.toString().padStart(2, '0');
                slots.push({
                    start: `${startHour}:${startMin}`,
                    end: `${endHourStr}:${endMinStr}`
                });
            }
        }
        return slots;
    }

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const getDayAvailability = (date: Date) => {
        const dateStr = formatDate(date);
        return availability[dateStr];
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const addTimeSlot = (dateStr: string, start?: string, end?: string, price?: string) => {
        const newSlot: TimeSlot = {
            id: Date.now().toString(),
            start: start || '09:00',
            end: end || '10:00',
            price: price || '4.99',
        };

        setAvailability(prev => ({
            ...prev,
            [dateStr]: {
                date: dateStr,
                slots: prev[dateStr] ? [...prev[dateStr].slots, newSlot] : [newSlot],
                isAvailable: true
            }
        }));
    };

    const removeTimeSlot = (dateStr: string, slotId: string) => {
        setAvailability(prev => {
            if (!prev[dateStr]) return prev;

            const updatedSlots = prev[dateStr].slots.filter(slot => slot.id !== slotId);

            return {
                ...prev,
                [dateStr]: {
                    ...prev[dateStr],
                    slots: updatedSlots,
                    isAvailable: updatedSlots.length > 0
                }
            };
        });
    };



    const days = getDaysInMonth(currentDate);
    const today = new Date();

    return (
        <div className="space-y-6 w-full">
            {/* Calendar Header */}
            <div className="flex  items-center justify-between">
                <Button variant="outline" size="icon" onClick={previousMonth} className='bg-[#19FF00] hover:bg-[#1aff0094] cursor-pointer'>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-xl font-semibold text-white">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <Button variant="outline" size="icon" onClick={nextMonth} className='bg-[#19FF00] hover:bg-[#1aff0094] cursor-pointer'>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Grid */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardContent className="px-4">
                            {/* Day Headers */}
                            <div className="grid grid-cols-7 gap-1 mb-4">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <div key={day} className="p-2 text-center text-sm font-medium text-zinc-400">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 gap-1">
                                {days.map((day, index) => {
                                    if (!day) {
                                        return <div key={index} className="p-2 h-20"></div>;
                                    }

                                    const dateStr = formatDate(day);
                                    const dayAvailability = getDayAvailability(day);
                                    const isToday = day.toDateString() === today.toDateString();
                                    const isPast = day < today;
                                    const isSelected = selectedDay === dateStr;

                                    return (
                                        <Button
                                            key={dateStr}
                                            onClick={() => !isPast && setSelectedDay(isSelected ? null : dateStr)}
                                            disabled={isPast}
                                            className={`
                        p-2 h-28 border rounded-lg transition-all bg-zinc-800/60  text-zinc-400 text-left flex flex-col 
                        ${isPast ? 'bg-zinc-950 text-zinc-400 cursor-not-allowed ' : 'hover:bg-zinc-800/40  cursor-pointer'}
                        ${isSelected ? 'ring-2 ring-blue-500 bg-blue-500' : ''}
                        ${isToday ? 'border-blue-500' : 'border-zinc-800'}
                        ${dayAvailability?.isAvailable ? 'bg-[#19FF00] hover:bg-[#1aff0094] text-black' : ''}
                      `}
                                        >
                                            <div className="flex items-center justify-center w-full">
                                                <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
                                                    {day.getDate()}
                                                </span>

                                            </div>
                                            {dayAvailability?.slots && (
                                                <div className="space-y-0.5 flex flex-col w-full">
                                                    {dayAvailability.slots.slice(0, 2).map((slot) => (
                                                        <Badge key={slot.id} className="text-xs  text-black px-1 py-0.5 rounded w-full text-center">
                                                            {slot.start} - {slot.end}
                                                        </Badge>
                                                    ))}
                                                    {dayAvailability.slots.length > 2 && (
                                                        <div className="text-xs text-black w-full text-center">
                                                            +{dayAvailability.slots.length - 2} more
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </Button>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Day Details Panel */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="px-4 max-h-[626px] overflow-y-auto">
                            {selectedDay ? (
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-semibold text-white">
                                            {new Date(selectedDay).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </h4>
                                        {!showAddSlotForm && (
                                            <Button
                                                size="sm"
                                                onClick={() => setShowAddSlotForm(true)}
                                                className="bg-[#19FF00] hover:bg-[#1aff0094] cursor-pointer transition-all duration-300"
                                            >
                                                <Plus className="h-4 w-4 mr-1" />
                                                Add Slot
                                            </Button>
                                        )}
                                    </div>
                                    {showAddSlotForm && (
                                        <div className="mb-4 flex flex-col gap-2">
                                            {/* Duration and Price Selector */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-white">Duration:</span>
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
                                                <span className="text-white ml-2">Price:</span>
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                            <CircleDollarSign className="h-4 w-4 text-zinc-500" />
                                                        </div>
                                                        <Input
                                                            id="price"
                                                            min="0"
                                                            step="0.01"
                                                            type="number"
                                                            placeholder="4.99"
                                                            className="pl-10 h-9 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/80 border-zinc-800 transition-all duration-300  "
                                                            value={price}
                                                            onChange={(e) => setPrice(e.target.value)}
                                                            required
                                                        />

                                                    </div>

                                                </div>
                                                
                                            </div>
                                            {/* Preset Time Slot Buttons */}
                                            <div className="grid grid-cols-4 gap-2">
                                                {generateTimeSlots(selectedDuration).map((slot) => (
                                                    <Button
                                                        key={slot.start + slot.end}
                                                        size="sm"
                                                        className="bg-[#19FF00] hover:bg-[#1aff0094] text-black px-2 py-1 cursor-pointer"
                                                        onClick={() => {
                                                            addTimeSlot(selectedDay, slot.start, slot.end, price);
                                                            // Do NOT close the form here
                                                        }}
                                                    >
                                                        {slot.start} - {slot.end}
                                                    </Button>
                                                ))}
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                <Button
                                                    size="sm"
                                                    className="bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700 transition-all duration-300"
                                                    onClick={() => setShowAddSlotForm(false)}
                                                >
                                                    Done
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="space-y-3">
                                        {availability[selectedDay]?.slots?.map((slot) => {

                                            // Format time to 12-hour with AM/PM
                                            function formatTime(t: string) {
                                                const [h, m] = t.split(':');
                                                const d = new Date();
                                                d.setHours(Number(h), Number(m));
                                                return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                                            }
                                            // Placeholder price/duration
                                            const durationMins = (Number(slot.end.split(':')[0]) * 60 + Number(slot.end.split(':')[1])) - (Number(slot.start.split(':')[0]) * 60 + Number(slot.start.split(':')[1]));
                                            const priceDisplay = `$${slot.price || '4.99'}/${durationMins}m`;
                                            return (
                                                <div
                                                    key={slot.id}
                                                    className="flex flex-col gap-1 bg-[#19FF00] hover:bg-[#1aff0094] p-1.5 px-2 pr-4 rounded-xl cursor-pointer transition-all duration-300"
                                                    title="Click to remove this slot"
                                                    onClick={() => removeTimeSlot(selectedDay, slot.id)}
                                                >
                                                    <div className="flex justify-between">
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="p-1 px-1.5 bg-green-700/80 rounded-md text-xs drop-shadow-2xl flex items-center">{priceDisplay}</div>
                                                        <div className="text-md text-black font-medium">{formatTime(slot.start)} - {formatTime(slot.end)}</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-zinc-400">
                                    <p>Select a day to manage availability</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityCalendar;