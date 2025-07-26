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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentWithStripeBooking, ValidateCoupon } from "@/api/stripe";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription
} from '@/components/ui/dialog';
import { GetBookingsByNameAndDate, type BookInfos } from "@/api/booking";
import { useParams } from "react-router-dom";

// --- DATE UTILS ---

function toLocalIsoDateString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const pad = (n: number) => n.toString().padStart(2, "0");
const getWeekday = (date: Date) => date.toLocaleDateString("en-US", { weekday: "short" });
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Proper days-of-month calculation, no infinite loop
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
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const carouselRef = useRef<any>(null);
  const hasScrolledToSelected = useRef(false);
  const [bookedDates, setBookedDates] = useState<{ [date: string]: BookInfos[] }>({});

  // Payment dialog states
  const [payModal, setPayModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookInfos | null>(null);
  const [coupon, setCoupon] = useState('');
  const [percent, setPercent] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const paymentType = "Appointment";

  const daysInMonth = getMonthDays(currentYear, currentMonth);
  // Only allow booking on today or later
  const visibleDays = daysInMonth.filter(d => d.getTime() >= today.getTime());

  // On initial mount/select, auto-scroll carousel to today (or 1st visible)
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

  // Fetch all bookings for visible month days
  useEffect(() => {
    const fetchAllCarouselDates = async () => {
      const fetches = await Promise.all(
        visibleDays.map(async (date) => {
          const formatted = toLocalIsoDateString(date);
          if (typeof slug === "string") {
            const res = await GetBookingsByNameAndDate(slug, formatted);
            return { date: formatted, data: res || [] };
          } else {
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
  }, [currentMonth, currentYear, visibleDays, slug]);

  // ---------------------------
  // Payment logic below
  // ---------------------------
  const handlePayClick = (booking: BookInfos) => {
    setSelectedBooking(booking);
    setNotes('');
    setCoupon('');
    setPercent(0);
    setIsValid(false);
    setError('');
    setPayModal(true);
  };

  const handleCouponValidate = async () => {
    setError('');
    try {
      const data = await ValidateCoupon(coupon);
      if (data.valid) {
        setIsValid(true);
        setCoupon(data.couponId);
        setPercent(data.percentOff);
      } else {
        setIsValid(false);
        setCoupon("");
        setPercent(0);
        setError("Invalid coupon.");
      }
    } catch (e) {
      setError("Coupon validation error");
    }
  };

  // Main Stripe payment flow
  const handlePayment = async () => {
    if (!selectedBooking) return;
    setLoading(true);
    setError('');
    try {
      const data = await PaymentWithStripeBooking(
        userId,
        paymentType,
        selectedBooking.id,
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
    // If you want to show "next day", uncomment below
    // d.setDate(d.getDate() + 1); 
    return d.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
  }

  return (
    <>
      <div className="space-y-6 w-full">
        {/* Calendar picker - simple month/year display */}
        <div className="flex justify-center mb-2">
          <Button variant="ghost" className="text-2xl font-bold text-white flex items-center gap-2 px-4 py-2 hover:bg-transparent">
            {currentYear}, {monthNames[currentMonth]}
          </Button>
        </div>
        {/* Day selector carousel */}
        <div className="relative max-w-xl mx-auto">
          <ShadCarousel className="w-full" opts={{ align: "center" }} setApi={api => (carouselRef.current = api)}>
            <CarouselPrevious />
            <CarouselContent>
              {visibleDays.map((d) => {
                const isPast = isDateInPast(d);
                const formatted = toLocalIsoDateString(d);
                const activeCount = bookedDates[formatted]?.length || 0;
                return (
                  <CarouselItem key={d.toISOString()} className="basis-1/3 sm:basis-1/7 ">
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
        {/* Bookings for selected day */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto mt-4">
          {(bookedDates[toLocalIsoDateString(selectedDate)] || []).map((booking) => (
            // Prefer booking.id as key for best React practices:
            <Card
              key={booking.id}
              className={`cursor-pointer rounded-xl p-4 border transition-colors duration-200  bg-zinc-950 hover:bg-zinc-900 ${booking.isAvailable ? "border-green-500" : "border-red-500"}`}
              onClick={booking.isAvailable ? () => handlePayClick(booking) : undefined}
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
          ))}
        </div>
      </div>

      {/* Payment dialog for a booking */}
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
