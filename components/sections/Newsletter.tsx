import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { subscribeToNewsletter } from '../../actions/newsletter';

// This component uses a "Magnetic Minimalist" design approach
export const Newsletter: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackKey, setFeedbackKey] = useState('');
  
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    const formData = new FormData();
    formData.append('email', email);

    // Simulate network delay for smoother animation on super fast connections
    const minDelay = new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const [result] = await Promise.all([
        subscribeToNewsletter({ success: false }, formData),
        minDelay
      ]);

      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setFeedbackKey(result.message === 'invalid_email' ? 'newsletter.invalid' : 'newsletter.error');
        
        // Reset to idle after delay so they can try again
        setTimeout(() => {
            setStatus('idle');
        }, 3000);
      }
    } catch (err) {
      setStatus('error');
      setFeedbackKey('newsletter.error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 } 
    }
  };

  return (
    <section 
        ref={ref}
        className="relative py-32 md:py-48 px-6 bg-[#F8F8F8] dark:bg-black overflow-hidden transition-colors duration-500"
    >
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-start w-full"
        >
            {/* Section Label */}
            <motion.span 
                className="text-accent text-xs font-bold tracking-[0.25em] uppercase mb-8"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
                {t('newsletter.title')}
            </motion.span>

            {/* Interactive Form Container */}
            <div className="w-full relative min-h-[200px]">
                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col gap-4"
                        >
                            <h2 className="font-serif text-4xl md:text-6xl text-primary dark:text-white leading-tight">
                                {t('newsletter.success')}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                {t('newsletter.welcome')}
                            </p>
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 mt-4"
                            >
                                <Check size={24} />
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            className="w-full"
                        >
                            <h2 className="font-serif text-3xl md:text-4xl text-primary dark:text-white mb-12 max-w-xl leading-snug">
                                {t('newsletter.subtitle')}
                            </h2>

                            <form onSubmit={handleSubmit} className="relative w-full group">
                                <motion.input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('newsletter.placeholder')}
                                    className={`w-full bg-transparent border-b-2 pt-4 pb-4 md:pt-8 md:pb-8 text-2xl md:text-5xl font-light outline-none transition-all duration-300 placeholder:text-gray-300 dark:placeholder:text-white/20 ${
                                        status === 'error' 
                                            ? 'border-red-500 text-red-500' 
                                            : 'border-gray-300 dark:border-white/20 focus:border-accent text-primary dark:text-white'
                                    }`}
                                    animate={status === 'error' ? { x: [-10, 10, -10, 10, 0] } : {}}
                                    transition={{ duration: 0.4 }}
                                />

                                {/* Dynamic Button */}
                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading' || !email}
                                    className="absolute right-0 bottom-4 md:bottom-8 text-primary dark:text-white disabled:opacity-0 transition-opacity duration-300"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: email ? 1 : 0, x: email ? 0 : -20 }}
                                >
                                    {status === 'loading' ? (
                                        <Loader2 size={32} className="animate-spin text-accent" />
                                    ) : (
                                        <div className="group-hover:translate-x-2 transition-transform duration-300 bg-accent rounded-full p-3 md:p-4 text-white shadow-lg hover:shadow-accent/50">
                                            <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                    )}
                                </motion.button>

                                {/* Error Message */}
                                <AnimatePresence>
                                    {status === 'error' && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute -bottom-8 left-0 text-red-500 text-sm font-medium tracking-wide uppercase"
                                        >
                                            {feedbackKey ? t(feedbackKey) : t('newsletter.error')}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
      </div>
    </section>
  );
};