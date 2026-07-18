import { motion } from 'framer-motion';
import { Send, Terminal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message too short")
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const subject = encodeURIComponent(`Contact from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    window.open(`mailto:manishkumar37414@gmail.com?subject=${subject}&body=${body}`, '_blank');
    toast({
      title: "MESSAGE.SENT ✓",
      description: "Tumhara email app open ho gaya — wahan se Send karo.",
      className: "bg-card border-primary text-primary font-mono",
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-28 sm:py-32 px-4 sm:px-6 min-h-screen relative flex items-center">
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-2">
            <Terminal size={40} className="text-secondary opacity-80" />
            <h2 className="text-3xl md:text-6xl font-display font-bold text-primary glitch" data-text="CONTACT.MSG">
              CONTACT.MSG
            </h2>
          </div>
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-primary to-transparent mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-card/80 backdrop-blur-xl border border-primary/30 p-1 relative"
        >
          <div className="bg-background border border-border p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-80" />
            
            <div className="mb-10 font-mono text-sm md:text-base text-muted-foreground flex items-center gap-3 bg-card p-4 border border-border/50">
              <span className="text-primary animate-pulse">root@manish-sys:~#</span>
              <span className="text-white">./init_contact.sh</span>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3 relative group">
                  <label className="font-mono text-xs text-primary block uppercase tracking-wider pl-1">Name_Input</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">&gt;</span>
                    <input 
                      {...form.register("name")}
                      className="w-full bg-background border border-border focus:border-primary/60 p-4 pl-8 font-mono text-foreground placeholder:text-muted-foreground/30 transition-all outline-none"
                      placeholder="Enter your name"
                    />
                  </div>
                  {form.formState.errors.name && <p className="font-mono text-xs text-accent mt-1 pl-1 absolute -bottom-5">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-3 relative group">
                  <label className="font-mono text-xs text-secondary block uppercase tracking-wider pl-1">Email_Input</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">&gt;</span>
                    <input 
                      {...form.register("email")}
                      className="w-full bg-background border border-border focus:border-secondary/60 p-4 pl-8 font-mono text-foreground placeholder:text-muted-foreground/30 transition-all outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                  {form.formState.errors.email && <p className="font-mono text-xs text-accent mt-1 pl-1 absolute -bottom-5">{form.formState.errors.email.message}</p>}
                </div>
              </div>
              
              <div className="space-y-3 relative group">
                <label className="font-mono text-xs text-accent block uppercase tracking-wider pl-1">Message_Payload</label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-muted-foreground font-mono">&gt;</span>
                  <textarea 
                    {...form.register("message")}
                    rows={6}
                    className="w-full bg-background border border-border focus:border-accent/60 p-4 pl-8 font-mono text-foreground placeholder:text-muted-foreground/30 transition-all outline-none resize-none"
                    placeholder="Enter message body..."
                  />
                </div>
                {form.formState.errors.message && <p className="font-mono text-xs text-accent mt-1 pl-1 absolute -bottom-5">{form.formState.errors.message.message}</p>}
              </div>

              <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <a href="mailto:manishkumar37414@gmail.com" className="font-mono text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2 px-4 py-2 border border-transparent hover:border-border/50 bg-card/50">
                  <span className="text-secondary">&gt;</span> direct_mail protocol
                </a>
                
                <button 
                  type="submit"
                  className="w-full md:w-auto group relative inline-flex items-center justify-center px-10 py-4 font-display font-bold text-background bg-primary hover:bg-white transition-all duration-300 uppercase tracking-widest overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full -ml-full group-hover:ml-0 transition-all duration-500 ease-out bg-white/20"></span>
                  <span className="flex items-center gap-3 relative z-10 group-hover:text-black transition-colors">
                    TRANSMIT <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
