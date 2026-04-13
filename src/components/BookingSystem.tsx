import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, Clock, User as UserIcon, ChevronRight, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from '@/lib/AuthContext';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const timeSlots = [
  '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM',
  '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM'
];

const services = [
  'Classic Manicure', 'Gel Manicure', 'Signature Spa Manicure',
  'Classic Pedicure', 'Gel Pedicure', 'Deluxe Spa Pedicure',
  'Full Set Acrylic', 'Acrylic Fill', 'Dipping Powder'
];

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({ open, onOpenChange }: BookingModalProps) {
  const { user, signIn } = useAuth();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [service, setService] = useState<string>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleConfirm = async () => {
    if (!user) {
      toast.error("Please sign in to book an appointment");
      signIn();
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        customerName: name,
        customerPhone: phone,
        service,
        date: date,
        time,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'bookings');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSuccess(false);
    setDate(undefined);
    setTime(undefined);
    setService(undefined);
    setName('');
    setPhone('');
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) setTimeout(resetForm, 300);
    }}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border/50 rounded-3xl">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto md:overflow-hidden">
          {/* Left Side: Info */}
          <div className="md:w-1/3 bg-primary p-8 text-primary-foreground flex flex-col justify-between">
            <div>
              <DialogHeader className="text-left p-0">
                <DialogTitle className="text-3xl font-heading font-bold mb-4 text-white">Book Your Session</DialogTitle>
              </DialogHeader>
              <p className="text-primary-foreground/80 font-light">
                Reserve your spot at Nails by Andy's. We recommend booking at least 24 hours in advance.
              </p>
            </div>
            
            <div className="space-y-6 mt-12">
              <div className="flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full justify-start px-6"
                  onClick={() => window.open('tel:9256390832')}
                >
                  <Phone className="w-4 h-4 mr-3" />
                  Call Us: 925 639 0832
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full justify-start px-6"
                  onClick={() => window.open('sms:9256390832')}
                >
                  <MessageSquare className="w-4 h-4 mr-3" />
                  Message Us
                </Button>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Instant Confirmation</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form / Success */}
          <div className="md:w-2/3 p-8 md:p-12 bg-card">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-heading font-bold mb-4">Booking Confirmed!</h3>
                  <p className="text-muted-foreground mb-8">
                    Thank you for choosing Nails by Andy's. We've received your appointment 
                    request for <span className="text-foreground font-medium">{service}</span>.
                  </p>
                  <Button onClick={() => onOpenChange(false)} className="rounded-full px-8">
                    Close
                  </Button>
                </motion.div>
              ) : (
                <div key="form">
                  <div className="flex items-center gap-4 mb-8">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                          step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {s}
                      </div>
                    ))}
                    <div className="h-[1px] flex-1 bg-border" />
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h4 className="text-2xl font-bold mb-4">Select Service</h4>
                        <div className="space-y-4">
                          <Label>Choose a Service</Label>
                          <Select onValueChange={setService} value={service}>
                            <SelectTrigger className="w-full rounded-xl py-6">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          className="w-full rounded-full py-6 mt-8" 
                          disabled={!service}
                          onClick={handleNext}
                        >
                          Next Step
                        </Button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h4 className="text-2xl font-bold mb-4">Date & Time</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label>Select Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal rounded-xl py-6",
                                    !date && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={date}
                                  onSelect={setDate}
                                  initialFocus
                                  disabled={(date) => date < new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label>Select Time</Label>
                            <Select onValueChange={setTime} value={time}>
                              <SelectTrigger className="w-full rounded-xl py-6">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((t) => (
                                  <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-8">
                          <Button variant="outline" className="flex-1 rounded-full py-6" onClick={handleBack}>
                            Back
                          </Button>
                          <Button 
                            className="flex-[2] rounded-full py-6" 
                            disabled={!date || !time}
                            onClick={handleNext}
                          >
                            Next Step
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h4 className="text-2xl font-bold mb-4">Your Details</h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="book-name">Name</Label>
                              <Input 
                                id="book-name" 
                                placeholder="Your name" 
                                className="rounded-xl py-6" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="book-phone">Phone</Label>
                              <Input 
                                id="book-phone" 
                                placeholder="Your phone" 
                                className="rounded-xl py-6" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
                            <h5 className="font-bold mb-2 text-sm uppercase tracking-wider">Summary</h5>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p><span className="font-medium text-foreground">Service:</span> {service}</p>
                              <p><span className="font-medium text-foreground">Date:</span> {date ? format(date, "PPP") : ''}</p>
                              <p><span className="font-medium text-foreground">Time:</span> {time}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-8">
                          <Button variant="outline" className="flex-1 rounded-full py-6" onClick={handleBack}>
                            Back
                          </Button>
                          <Button 
                            className="flex-[2] rounded-full py-6"
                            onClick={handleConfirm}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Confirming..." : "Confirm Booking"}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
