import { motion } from 'motion/react';
import { Gift, Star, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';

const benefits = [
  {
    title: 'Earn Points',
    description: 'Get 1 point for every $1 spent on any service.',
    icon: Star,
  },
  {
    title: 'Exclusive Rewards',
    description: 'Redeem points for free services, upgrades, or products.',
    icon: Gift,
  },
  {
    title: 'Birthday Gift',
    description: 'Receive a special discount or free treatment on your birthday.',
    icon: Award,
  },
  {
    title: 'Early Access',
    description: 'Be the first to know about new services and seasonal offers.',
    icon: Zap,
  },
];

export function LoyaltyProgram() {
  const { user, userData, signIn } = useAuth();
  return (
    <section id="loyalty" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-primary font-medium tracking-[0.2em] uppercase mb-2">Join the Club</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">Andy's Loyalty Rewards</h3>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-light">
              We value our loyal clients. Join our rewards program today and start 
              earning points towards your next pampering session. It's our way of 
              saying thank you for choosing Nail by Andy's.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <Button 
              size="lg" 
              className="rounded-full px-10 py-6 text-lg"
              onClick={user ? undefined : signIn}
            >
              {user ? "You're a Member!" : "Join Now & Get 50 Points"}
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="bg-card border border-border/50 p-8 rounded-[2rem] shadow-2xl relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h4 className="text-xl font-bold mb-1">Loyalty Card</h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">
                      {user ? `Member Since ${new Date(userData?.createdAt?.seconds * 1000 || Date.now()).getFullYear()}` : 'Join Today'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                    <Star className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="space-y-6 mb-12">
                  <div className="flex justify-between items-end">
                    <span className="text-sm text-muted-foreground">Current Points</span>
                    <span className="text-4xl font-bold text-primary">{userData?.points || 0}</span>
                  </div>
                  <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(((userData?.points || 0) / 500) * 100, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    {userData?.points >= 500 
                      ? "You have a reward waiting!" 
                      : `Only ${500 - (userData?.points || 0)} points away from a free Gel Manicure!`}
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t border-border/50">
                  <div className="text-sm">
                    <p className="font-bold">{user?.displayName || 'Guest User'}</p>
                    <p className="text-muted-foreground">{user ? `ID: #${user.uid.slice(0, 8).toUpperCase()}` : 'Sign in to see ID'}</p>
                  </div>
                  <div className="w-16 h-16 bg-white p-2 rounded-lg">
                    {/* Placeholder for QR Code */}
                    <div className="w-full h-full bg-black/10 rounded flex items-center justify-center">
                      <Zap className="w-6 h-6 text-black/20" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Background Card */}
              <div className="absolute top-4 left-4 w-full h-full bg-primary/20 rounded-[2rem] -z-10 blur-sm" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
