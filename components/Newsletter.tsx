import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, Mail } from 'lucide-react';
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
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="relative py-32 overflow-hidden bg-light dark:bg-black transition-colors duration-500">
       {/* Background Elements */}
       <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
       </div>

       <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
             >
                <h2 className="font-serif text-4xl md:text-5xl mb-6 text-primary dark:text-white">
                   {t('newsletter.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg leading-relaxed max-w-2xl mx-auto">
                   {t('newsletter.desc')}
                </p>
             </motion.div>

             <motion.form 
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
             >
                <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('newsletter.placeholder')}
                        className="w-full pl-12 pr-6 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all dark:text-white placeholder:text-gray-400"
                        required
                    />
                </div>
                <button 
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className={`px-8 py-4 font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 min-w-[160px] rounded-sm ${
                        status === 'success' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-primary dark:bg-white text-white dark:text-primary hover:bg-accent dark:hover:bg-gray-200'
                    }`}
                >
                    {status === 'loading' ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : status === 'success' ? (
                        <Check size={20} />
                    ) : (
                        <>
                            {t('newsletter.button')}
                        </>
                    )}
                </button>
                
                {status === 'error' && (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -bottom-8 left-0 w-full text-center text-red-500 text-sm"
                    >
                        Error. Please try again.
                    </motion.p>
                )}
             </motion.form>
             
             <motion.p 
                className="mt-6 text-xs text-gray-400 dark:text-gray-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
             >
                {t('newsletter.disclaimer')}
             </motion.p>
          </div>
       </div>
    </section>
  );
};