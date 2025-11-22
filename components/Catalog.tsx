import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCategory, Product } from '../types';
import { useCartStore, useUIStore } from '../store';
import { Plus, AlertCircle } from 'lucide-react';
import { getCollection } from '../lib/firebase/firestore';

export const Catalog: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ProductCategory>(ProductCategory.ALL);
    const [products, setProducts] = useState<Product[]>([]);
    const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { language } = useUIStore();
    const { addItem } = useCartStore();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getCollection('products');
                // Map Firestore data to Product type ensuring type safety
                const mappedProducts: Product[] = data.map((doc: any) => ({
                    id: doc.id,
                    price: doc.price || 0,
                    category: doc.category || ProductCategory.PAINTINGS,
                    available: doc.available ?? true,
                    images: doc.images || [],
                    createdAt: doc.createdAt,
                    translations: doc.translations || {},
                    dimensions: doc.dimensions,
                    medium: doc.medium
                }));
                
                setProducts(mappedProducts);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Unable to load the catalog. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
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
        <section id="catalog" className="min-h-screen bg-light dark:bg-[#252525] pb-20">
            {/* Sticky Tabs Bar - Full Width, Matches Header Style */}
            <div className="sticky top-16 z-40 w-full bg-primary/80 backdrop-blur-md border-b border-white/10 transition-all duration-300 shadow-md">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-wrap justify-center gap-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative pb-2 text-sm uppercase tracking-widest transition-colors ${
                                    activeTab === tab.id ? 'text-accent' : 'text-white/70 hover:text-white'
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
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                
                {/* Error State */}
                {error && (
                    <div className="flex flex-col items-center justify-center py-20 text-red-500">
                        <AlertCircle size={48} className="mb-4" />
                        <p>{error}</p>
                    </div>
                )}

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
                        displayProducts.length > 0 ? (
                            displayProducts.map((product) => {
                                const translation = product.translations[language] || product.translations['en'] || { title: 'Untitled', description: '' };
                                return (
                                    <motion.div 
                                        key={product.id}
                                        variants={itemVariants}
                                        className="group relative bg-white dark:bg-[#1e1e1e] shadow-sm hover:shadow-2xl transition-all duration-300 ease-out"
                                        whileHover={{ y: -8 }}
                                    >
                                        <div className="aspect-[3/4] overflow-hidden relative bg-gray-100 dark:bg-black/20">
                                            {product.images && product.images.length > 0 ? (
                                                <img 
                                                    src={product.images[0]} 
                                                    alt={translation.title} 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                            )}
                                            
                                            {/* Overlay Actions */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <button 
                                                    onClick={() => addItem(product)}
                                                    disabled={!product.available}
                                                    className={`bg-white text-primary px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 ${
                                                        product.available ? 'hover:bg-accent hover:text-white' : 'opacity-50 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <Plus size={16} /> {product.available ? 'Add to Cart' : 'Sold Out'}
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
                                                {translation.title}
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
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                No products found in this category.
                            </div>
                        )
                    )}
                </motion.div>
            </div>
        </section>
    );
};
