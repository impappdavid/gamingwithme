import { useState, useRef, useEffect } from "react";
import {
    Carousel as ShadCarousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import {
    Card, CardContent, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown } from "lucide-react";
import { PaymentWithStripe, PaymentWithStripeBooking, ValidateCoupon } from "@/api/stripe";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { GetBooking, GetBookingsByNameAndDate, type BookInfos } from "@/api/booking";
import { useParams } from "react-router-dom";

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

function Carousel({ userId }: { userId: string }) {
    const { slug } = useParams<{ slug: string }>();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const carouselRef = useRef<any>(null);
    const hasScrolledToSelected = useRef(false);
    const [bookedDates, setBookedDates] = useState<{ [date: string]: BookInfos[] }>({});

    // Payment dialog states
    const [payModal, setPayModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<BookInfos | null>(null);
    const [coupon, setCoupon] = useState('');
    const [percent, setPercent] = useState(0);
    const [bookId, setBookId] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const paymentType = "Appointment";

    const daysInMonth = getMonthDays(currentYear, currentMonth);
    const visibleDays = daysInMonth.filter(d => d.getTime() >= today.getTime());

    useEffect(() => {
        let targetIdx = visibleDays.findIndex(d => d.getTime() === today.getTime());
        if (targetIdx === -1) targetIdx = 0;
        if (carouselRef.current?.scrollTo && targetIdx >= 0 && !hasScrolledToSelected.current) {
            carouselRef.current.scrollTo(targetIdx, true);
            hasScrolledToSelected.current = true;
        }
    }, [visibleDays, selectedDate]);

    useEffect(() => { hasScrolledToSelected.current = false; }, [currentYear, currentMonth]);

    const isDateInPast = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date < today;
    };

    

    useEffect(() => {
        const fetchAllCarouselDates = async () => {
            const fetches = await Promise.all(
                visibleDays.map(async (date) => {
                    const formatted = date.toISOString().split("T")[0];
                    // Only call GetBookingsByNameAndDate if slug is defined
                    if (typeof slug === "string") {
                        const res = await GetBookingsByNameAndDate(slug, formatted);
                        return { date: formatted, data: res || [] };
                    } else {
                        // If slug is not defined, return empty data for this date
                        return { date: formatted, data: [] };
                    }
                })
            );
            const map: { [key: string]: BookInfos[] } = {};
            fetches.forEach(({ date, data }) => {
                map[date] = data;
            });
            setBookedDates(map);
        };
        fetchAllCarouselDates();
    }, [currentMonth, currentYear, visibleDays]);




    // ---------------------------
    // Payment logic below
    // ---------------------------

    // On booking card click, open dialog
    const handlePayClick = (booking: BookInfos) => {
        setSelectedBooking(booking);
        setNotes('');
        setCoupon('');
        setPercent(0);
        setIsValid(false);
        setError('');
        setPayModal(true);
    };

    // Coupon validation
    const handleCouponValidate = async () => {
        setError('');
        try {
            const data = await ValidateCoupon(coupon);
            if (data.valid) {
                setIsValid(true);
                setCoupon(data.couponId)
                setPercent(data.percentOff);
            } else {
                setIsValid(false);
                setCoupon("")
                setPercent(0);
                setError("Invalid coupon.");
            }
        } catch (e) {
            setError("Coupon validation error");
        }
    };

    // Main Stripe payment
    const handlePayment = async () => {
        if (!selectedBooking) return;
        setLoading(true);
        setError('');
        console.log(`
            userId: ${userId} \n
            paymentType: ${paymentType} \n
            bookingId: ${selectedBooking.id} \n
            notes: ${notes} \n
            coupon: ${coupon}
            `)
        try {
            // You might want to use a more specific "booking id" string
            const data = await PaymentWithStripeBooking(
                userId,
                paymentType,
                selectedBooking.id, // Assume this is booking id
                notes,
                coupon
            );

            if (data?.checkoutUrl) {
                window.open(data.checkoutUrl, '_blank');
                setPayModal(false);
            }
        } catch (e) {
            setError("Payment request failed");
        }
        setLoading(false);
    };

    function formatBookingDatePlusOne(dateString: string) {
        const d = new Date(dateString);
        d.setDate(d.getDate() + 1);
        return d.toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
        });
    }

    return (
        <>
            <div className="space-y-6 w-full">
                {/* Calendar picker */}
                <div className="flex justify-center mb-2">
                    <Button variant="ghost" className="text-2xl font-bold text-white flex items-center gap-2 px-4 py-2 hover:bg-transparent">
                        {currentYear}, {monthNames[currentMonth]}
                    </Button>
                </div>
                {/* Carousel */}
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
                {/* Bookings grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto mt-4">
                    {(bookedDates[selectedDate.toISOString().split('T')[0]] || []).map((booking, index) => (
                        <>
                            {booking.isAvailable ? (
                                <Card
                                    key={index}
                                    className={`cursor-pointer rounded-xl p-4 border transition-colors duration-200  bg-zinc-950 hover:bg-zinc-900 border-green-500`}
                                    onClick={() => handlePayClick(booking)}
                                >
                                    <CardContent className="flex flex-col px-0">
                                        <CardTitle className="text-md font-bold">
                                            {booking.startTime} - {booking.endTime}
                                        </CardTitle>
                                        <CardDescription className="text-xs text-zinc-400">
                                            {formatBookingDatePlusOne(booking.date)}
                                        </CardDescription>
                                        {booking.price && <span className="text-green-400 font-semibold">Price: ${booking.price}</span>}
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card
                                    key={index}
                                    className={`cursor-pointer rounded-xl p-4 border transition-colors duration-200  bg-zinc-950 hover:bg-zinc-900 border-red-500`}

                                >
                                    <CardContent className="flex flex-col px-0">
                                        <CardTitle className="text-md font-bold">
                                            {booking.startTime} - {booking.endTime}
                                        </CardTitle>
                                        <CardDescription className="text-xs text-zinc-400">
                                            {formatBookingDatePlusOne(booking.date)}
                                        </CardDescription>
                                        {booking.price && <span className="text-green-400 font-semibold">Price: ${booking.price}</span>}
                                    </CardContent>
                                </Card>
                            )}

                        </>
                    ))}
                </div>
            </div>
            {/* PAYMENT DIALOG */}
            <Dialog open={payModal} onOpenChange={setPayModal}>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <DialogTitle>Booking Payment</DialogTitle>
                        <DialogDescription>Review your total and optional coupon. Payment opens in new tab.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        {selectedBooking && (
                            <>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Date:</span>
                                    <span>{formatBookingDatePlusOne(selectedBooking.date)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Time:</span>
                                    <span>{selectedBooking.startTime} - {selectedBooking.endTime}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Price:</span>
                                    <span>
                                        ${selectedBooking.price ? selectedBooking.price.toFixed(2) : "N/A"}
                                        {percent ? <span className="ml-2 text-green-500 text-xs">-{percent}%</span> : null}
                                    </span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <Input placeholder="Coupon" value={coupon} onChange={e => setCoupon(e.target.value)} disabled={isValid} />
                                    <Button type="button" onClick={handleCouponValidate} disabled={isValid} className="bg-blue-500 text-black border hover:bg-blue-600">Apply</Button>
                                </div>
                                <Textarea
                                    placeholder="Message (optional)..."
                                    className="rounded-xl border-zinc-800 mt-1"
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                />
                                {error && <p className="text-red-500 text-xs">{error}</p>}
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <Button onClick={() => setPayModal(false)} className="bg-black border text-zinc-400 hover:bg-zinc-900/60" variant="default">
                                Cancel
                            </Button>
                            <Button
                                onClick={handlePayment}
                                className="bg-green-500 hover:bg-green-600"
                                disabled={loading}
                                variant="default"
                            >
                                {loading ? "Redirecting..." : "Proceed to Pay"}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Carousel;
