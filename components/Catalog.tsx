import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCategory, Product, Language } from '../types';
import { useCartStore, useUIStore } from '../store';
import { Plus } from 'lucide-react';

// Mock Data Generator (Since we can't connect to real Firestore in this demo)
const generateProducts = (count: number): Product[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `prod-${Math.random().toString(36).substr(2, 9)}`,
        price: Math.floor(Math.random() * 1000) + 50,
        category: Object.values(ProductCategory)[Math.floor(Math.random() * 4) + 1] as ProductCategory,
        available: Math.random() > 0.2,
        images: [`https://picsum.photos/seed/${i + Math.random()}/800/600`],
        createdAt: new Date().toISOString(),
        translations: {
            fr: { title: `Oeuvre d'Art ${i + 1}`, description: "Description en français...", tags: ["art"] },
            en: { title: `Artwork ${i + 1}`, description: "English description...", tags: ["art"] },
            de: { title: `Kunstwerk ${i + 1}`, description: "Deutsche beschreibung...", tags: ["kunst"] },
            pt: { title: `Obra de Arte ${i + 1}`, description: "Descrição em português...", tags: ["arte"] },
        }
    }));
};

export const Catalog: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ProductCategory>(ProductCategory.ALL);
    const [products, setProducts] = useState<Product[]>([]);
    const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { language } = useUIStore();
    const { addItem } = useCartStore();

    // Simulate fetching data
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const data = generateProducts(50);
            setProducts(data);
            setLoading(false);
        }, 1500);
    }, []);

    useEffect(() => {
        if (activeTab === ProductCategory.ALL) {
            setDisplayProducts(products);
        } else {
            setDisplayProducts(products.filter(p => p.category === activeTab));
        }
    }, [activeTab, products]);

    const tabs = [
        { id: ProductCategory.ALL, label: "Tout / All" },
        { id: ProductCategory.PAINTINGS, label: "Peintures" },
        { id: ProductCategory.JEWELRY, label: "Bijoux" },
        { id: ProductCategory.DIGITAL, label: "Digital" },
        { id: ProductCategory.PRINTS, label: "Impressions" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="catalog" className="min-h-screen py-20 bg-light dark:bg-[#252525]">
            <div className="container mx-auto px-6">
                
                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-8 mb-16 sticky top-20 z-40 bg-light/80 dark:bg-[#252525]/80 backdrop-blur-md py-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative pb-2 text-sm uppercase tracking-widest transition-colors ${
                                activeTab === tab.id ? 'text-accent' : 'text-gray-500 hover:text-primary dark:hover:text-white'
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div 
                                    layoutId="underline"
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                >
                    {loading ? (
                        // Skeletons
                        Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="bg-gray-200 dark:bg-white/5 h-[400px] animate-pulse rounded-sm" />
                        ))
                    ) : (
                        displayProducts.map((product) => (
                            <motion.div 
                                key={product.id}
                                variants={itemVariants}
                                className="group relative bg-white dark:bg-[#1e1e1e] shadow-sm hover:shadow-2xl transition-all duration-300 ease-out"
                                whileHover={{ y: -8 }}
                            >
                                <div className="aspect-[3/4] overflow-hidden relative">
                                    <img 
                                        src={product.images[0]} 
                                        alt={product.translations[language].title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button 
                                            onClick={() => addItem(product)}
                                            className="bg-white text-primary px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-accent hover:text-white flex items-center gap-2"
                                        >
                                            <Plus size={16} /> Add to Cart
                                        </button>
                                    </div>
                                    
                                    {!product.available && (
                                        <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                                            Sold
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h3 className="font-serif text-lg text-primary dark:text-white mb-1 truncate">
                                        {product.translations[language].title}
                                    </h3>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">
                                        {product.category}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-accent font-medium">
                                            € {product.price.toLocaleString(language)}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>

                {!loading && (
                    <div className="text-center mt-20 text-gray-400 text-sm">
                        You've reached the end of the collection.
                    </div>
                )}
            </div>
        </section>
    );
};
