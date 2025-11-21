import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useToast } from './ui/Toast';
import { subscribeToNewsletter } from '../app/actions';
import { useLanguage } from '../hooks/useLanguage';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    const result = await subscribeToNewsletter(email);
    
    if (result.success) {
        setStatus('success');
        const msg = result.message === 'duplicate' ? t('newsletter.duplicate') : t('newsletter.success');
        toast(msg, 'success');
        setEmail('');
        // Reset status after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
    } else {
        setStatus('idle');
        // Show translation if it's a generic error, otherwise show specific (or map it)
        toast(t('newsletter.error'), 'error');
    }
  };

  return (
    <section className="py-32 bg-primary relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
            <img src="https://picsum.photos/seed/abstract_dark/1920/1080" className="w-full h-full object-cover" alt="" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
                        {t('newsletter.label')}
                    </span>
                    <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                        {t('newsletter.title')}
                    </h2>
                    <p className="text-gray-400 mb-12 font-light text-lg">
                        {t('newsletter.desc')}
                    </p>
                </motion.div>

                <motion.form 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative max-w-md mx-auto"
                >
                    <div className="relative flex items-center border-b border-white/20 focus-within:border-accent transition-colors duration-500">
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t('newsletter.placeholder')} 
                            className="w-full bg-transparent py-4 text-white placeholder:text-gray-600 focus:outline-none text-lg font-light"
                            disabled={status === 'loading' || status === 'success'}
                        />
                        <button 
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="ml-4 text-accent hover:text-white transition-colors disabled:opacity-50"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="animate-spin" />
                            ) : status === 'success' ? (
                                <Check className="text-green-500" />
                            ) : (
                                <ArrowRight size={24} />
                            )}
                        </button>
                    </div>
                    
                    <p className="text-xs text-gray-600 mt-4 text-left">
                        {t('newsletter.disclaimer')}
                    </p>
                </motion.form>
            </div>
        </div>
    </section>
  );
};