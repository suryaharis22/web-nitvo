import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Icons from '@tabler/icons-react';
import { useCategory } from '@/context/CategoryContext';
import { motion } from 'framer-motion';

const Category = ({ selectCategory, setSelectCategory }) => {
    const { categorys, setCategorys } = useCategory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categorys');
                setCategorys(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [setCategorys]);

    // Buat priorityOrder berdasarkan kategori yang ada dan diinginkan
    const priorityOrder = ['PULSA & DATA', 'GAME', 'TAGIHAN'].filter(
        prioName => categorys.some(cat => cat.name.toUpperCase() === prioName)
    );

    // Sorting kategori berdasarkan priorityOrder, sisanya alfabet
    const sortedCategorys = [...categorys].sort((a, b) => {
        const indexA = priorityOrder.indexOf(a.name.toUpperCase());
        const indexB = priorityOrder.indexOf(b.name.toUpperCase());

        if (indexA === -1 && indexB === -1) {
            return a.name.localeCompare(b.name);
        }
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

    // Variants untuk framer-motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const skeletonArray = Array.from({ length: 8 });

    return (
        <div className="bg-gdn rounded-xl shadow p-4">
            {/* Outer: scroll horizontal */}
            <div className="overflow-x-auto scrollbar-hide">
                {/* Inner: flex dan justify-center */}
                <motion.div
                    className="flex justify-center gap-10 whitespace-nowrap px-2 min-w-max"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {loading
                        ? skeletonArray.map((_, idx) => (
                            <motion.div
                                key={idx}
                                className="inline-flex flex-col items-center justify-center text-center min-w-[72px]"
                                variants={itemVariants}
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <div className="p-3 bg-gray-400 rounded-full mb-1 w-12 h-12" />
                                <div className="w-12 h-3 bg-gray-400 rounded" />
                            </motion.div>
                        ))
                        : sortedCategorys.map((category) => {
                            const IconComponent = Icons[category.icon];
                            const isSelected = selectCategory === category.id;

                            return (
                                <>
                                    <motion.div
                                        key={category.id}
                                        onClick={() => setSelectCategory(category.id)}
                                        className={`inline-flex flex-col items-center justify-center text-center min-w-[72px] cursor-pointer transition group-hover:text-warning-light
                ${isSelected ? 'text-warning-light font-semibold' : 'text-white'}`}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') setSelectCategory(category.id);
                                        }}
                                    >
                                        <div
                                            className={`p-2 rounded-full mb-1
                  ${isSelected ? 'bg-warning-light/20' : 'bg-primary-dark/40'}`}
                                        >
                                            {IconComponent ? (
                                                <IconComponent
                                                    className={`w-8 h-8 ${isSelected ? 'text-primary-light' : 'text-white'}`}
                                                />
                                            ) : (
                                                <div className="w-14 h-14 rounded-full bg-cardimg bg-no-repeat bg-center bg-cover flex items-center justify-center">
                                                    <img
                                                        src="/Untitled-3.png"
                                                        alt={category.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-xs sm:text-sm">{category.name}</span>
                                    </motion.div>

                                </>
                            );
                        })}
                </motion.div>
            </div>
        </div>

    );
};

export default Category;
