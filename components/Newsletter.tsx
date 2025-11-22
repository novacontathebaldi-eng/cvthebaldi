import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { createDocument } from '../lib/firebase/firestore';

export const Newsletter: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      await createDocument('newsletter_subscribers', { 
        email,
        source: 'website_footer',
        timestamp: new Date().toISOString()
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-light dark:bg-black transition-colors duration-500">
       {/* Background Aesthetics */}
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 dark:via-white/10 to-transparent" />
          <div className="absolute -top-[200px] -left-[200px] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl dark:bg-accent/10" />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl dark:bg-blue-500/10 translate-x-1/2" />
       </div>

       <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
             <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/5 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                    
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-accent text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                                {t('newsletter.title')}
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl text-primary dark:text-white leading-tight">
                                {t('newsletter.desc').split('.')[0]}.
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 leading-relaxed">
                                {t('newsletter.desc').split('.').slice(1).join('.')}
                            </p>
                        </motion.div>
                    </div>

                    <div className="w-full md:w-auto flex-1">
                        <motion.form 
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-3 relative"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={18} />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('newsletter.placeholder')}
                                    className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all dark:text-white placeholder:text-gray-400 text-sm"
                                    required
                                    disabled={status === 'loading' || status === 'success'}
                                />
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className={`h-12 font-medium uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 ${
                                    status === 'success' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-primary dark:bg-white text-white dark:text-primary hover:bg-accent dark:hover:bg-gray-200'
                                }`}
                            >
                                <AnimatePresence mode="wait">
                                    {status === 'loading' ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Loader2 className="animate-spin" size={18} />
                                        </motion.div>
                                    ) : status === 'success' ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Check size={18} />
                                            <span>Inscrito!</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            {t('newsletter.button')}
                                            <ArrowRight size={16} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                            
                            {status === 'error' && (
                                <motion.p 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="text-center text-red-500 text-xs mt-1"
                                >
                                    Ocorreu um erro. Tente novamente.
                                </motion.p>
                            )}
                        </motion.form>
                        
                        <p className="mt-4 text-[10px] text-gray-400 dark:text-gray-600 text-center md:text-left">
                            {t('newsletter.disclaimer')}
                        </p>
                    </div>
                </div>

             </div>
          </div>
       </div>
    </section>
  );
};