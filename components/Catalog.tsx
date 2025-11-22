import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, ProductCategory } from '../types/product';
import { useProducts } from '../hooks/useProducts';
import { useLanguage } from '../hooks/useLanguage';
import { ProductCard } from './catalog/ProductCard';
import { ProductModal } from './catalog/ProductModal';
import { Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

// Define Order of Categories for One-Page Scroll
const CATEGORY_ORDER = [
    ProductCategory.PAINTINGS,
    ProductCategory.SCULPTURES,
    ProductCategory.JEWELRY,
    ProductCategory.PRINTS,
    ProductCategory.DIGITAL,
];

export const Catalog: React.FC = () => {
    const { t } = useLanguage();
    const { data: products, isLoading, error } = useProducts();
    const [activeCategory, setActiveCategory] = useState<ProductCategory>(ProductCategory.PAINTINGS);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    // Group Products by Category
    const groupedProducts = React.useMemo(() => {
        if (!products) return {};
        return products.reduce((acc, product) => {
            const cat = product.category;
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(product);
            return acc;
        }, {} as Record<ProductCategory, Product[]>);
    }, [products]);

    // Handle Scroll Spy to update Active Tab
    useEffect(() => {
        const handleScroll = () => {
            const headerOffset = 150; // Height of headers
            
            for (const cat of CATEGORY_ORDER) {
                const element = document.getElementById(`category-${cat}`);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
                        setActiveCategory(cat);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToCategory = (cat: ProductCategory) => {
        setActiveCategory(cat);
        const element = document.getElementById(`category-${cat}`);
        if (element) {
            const headerOffset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-light dark:bg-[#252525]">
                <Loader2 size={40} className="animate-spin text-accent" />
            </div>
        );
    }

    if (error) {
        return (
             <div className="min-h-[60vh] flex flex-col items-center justify-center text-red-500 bg-light dark:bg-[#252525]">
                <AlertCircle size={48} className="mb-4" />
                <p>Unable to load the gallery.</p>
            </div>
        );
    }

    return (
        <section id="catalog" className="min-h-screen bg-light dark:bg-[#252525] relative">
            
            {/* Sticky Tabs Header */}
            <div className="sticky top-0 md:top-[88px] z-30 w-full bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 shadow-sm transition-all">
                <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
                    <div className="flex items-center justify-start md:justify-center gap-8 min-w-max py-4 px-2">
                        {CATEGORY_ORDER.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => scrollToCategory(cat)}
                                className={cn(
                                    "relative py-2 text-xs md:text-sm uppercase tracking-widest transition-colors font-medium",
                                    activeCategory === cat 
                                        ? "text-accent" 
                                        : "text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white"
                                )}
                            >
                                {cat}
                                {activeCategory === cat && (
                                    <motion.div 
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content - Sequential Categories */}
            <div className="container mx-auto px-6 py-12 pb-32 space-y-24">
                {CATEGORY_ORDER.map((cat) => {
                    const categoryProducts = groupedProducts[cat] || [];
                    if (categoryProducts.length === 0) return null;

                    return (
                        <motion.div 
                            key={cat} 
                            id={`category-${cat}`}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="scroll-mt-32"
                        >
                            {/* Category Title */}
                            <div className="flex items-center gap-4 mb-12">
                                <h2 className="text-2xl md:text-4xl font-serif text-primary dark:text-white uppercase tracking-tight">
                                    {cat}
                                </h2>
                                <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
                                <span className="text-xs text-gray-400 font-mono">
                                    ({categoryProducts.length})
                                </span>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                                {categoryProducts.map((product, index) => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        index={index}
                                        onClick={() => setSelectedProduct(product)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Details Modal */}
            <ProductModal 
                product={selectedProduct} 
                isOpen={!!selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
            />

        </section>
    );
};
