import { useEffect, useState } from "react";
import axios from "axios";
import { useSections } from "@/context/SectionsContext";
import OpratorCard from "../Product/OpratorCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Sections = ({ selectCategory, setSelectCategory, searchSections }) => {
    const { sections, setSections } = useSections();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [totalPages, setTotalPages] = useState(1);
    const [totalRows, setTotalRows] = useState(0);

    useEffect(() => {
        const fetchSections = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();

                if (searchSections) params.append("search", searchSections);
                if (selectCategory && selectCategory !== "All") {
                    params.append("menuId", selectCategory);
                }

                params.append("page", page);
                params.append("pageSize", pageSize);

                const response = await axios.get(`/api/sections?${params}`);
                setSections(response.data.data || []);
                setTotalPages(response.data.metadata?.totalPages || 1);
                setTotalRows(response.data.metadata?.totalRows || 0);
            } catch (error) {
                console.error("Error fetching Sections:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSections();
    }, [selectCategory, page, searchSections]);

    const skeletonArray = Array.from({ length: 10 });

    return (
        <div className="min-h-screen rounded-xl text-white py-8 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {loading ? (
                    skeletonArray.map((_, index) => (
                        <div
                            key={index}
                            className="bg-white/10 rounded-xl shadow py-2 flex flex-col items-center text-center animate-pulse border border-white/10"
                        >
                            <div className="w-full h-[192px] bg-white/20 rounded-lg mb-3" />
                            <div className="w-3/4 h-4 bg-white/20 rounded mb-2" />
                            <div className="w-1/2 h-3 bg-white/20 rounded mb-2" />
                            <div className="w-1/3 h-5 bg-white/30 rounded mb-3" />
                            <div className="w-1/2 h-6 bg-white/30 rounded-full" />
                        </div>
                    ))
                ) : sections.length > 0 ? (
                    <AnimatePresence>
                        {sections.map((product, index) => (
                            <motion.div
                                key={product.id || index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <OpratorCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                ) : (
                    <div className="col-span-full text-center text-lg text-white/60 py-10">
                        Tidak ada data section tersedia.
                    </div>
                )}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <motion.div
                    className="flex justify-center items-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <nav>
                        <ul className="flex flex-wrap items-center gap-1 text-sm">
                            <li>
                                <button
                                    onClick={() => setPage(1)}
                                    disabled={page === 1}
                                    className={`px-3 h-8 rounded-md border transition-all ${page === 1
                                        ? "bg-white text-gray-400 cursor-not-allowed"
                                        : "bg-white text-gray-600 hover:bg-primary-light hover:text-white"
                                        }`}
                                >
                                    First
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className={`px-3 h-8 rounded-md border transition-all ${page === 1
                                        ? "bg-white text-gray-400 cursor-not-allowed"
                                        : "bg-white text-gray-600 hover:bg-primary-light hover:text-white"
                                        }`}
                                >
                                    <FaChevronLeft />
                                </button>
                            </li>

                            {/* Dynamic Pages */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                (pageNumber) =>
                                    Math.abs(page - pageNumber) <= 2 && (
                                        <li key={pageNumber}>
                                            <button
                                                onClick={() => setPage(pageNumber)}
                                                className={`px-3 h-8 rounded-md border transition-all ${pageNumber === page
                                                    ? "bg-primary text-white"
                                                    : "bg-white text-gray-600 hover:bg-primary-light hover:text-white"
                                                    }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        </li>
                                    )
                            )}

                            <li>
                                <button
                                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={page === totalPages}
                                    className={`px-3 h-8 rounded-md border transition-all ${page === totalPages
                                        ? "bg-white text-gray-400 cursor-not-allowed"
                                        : "bg-white text-gray-600 hover:bg-primary-light hover:text-white"
                                        }`}
                                >
                                    <FaChevronRight />
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setPage(totalPages)}
                                    disabled={page === totalPages}
                                    className={`px-3 h-8 rounded-md border transition-all ${page === totalPages
                                        ? "bg-white text-gray-400 cursor-not-allowed"
                                        : "bg-white text-gray-600 hover:bg-primary-light hover:text-white"
                                        }`}
                                >
                                    Last
                                </button>
                            </li>
                        </ul>
                    </nav>
                </motion.div>
            )}

            {/* Total Rows */}
            {!loading && (
                <motion.div
                    className="text-center mt-4 text-sm text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Total Data: <strong className="text-white">{totalRows}</strong>
                </motion.div>
            )}
        </div>
    );
};

export default Sections;
