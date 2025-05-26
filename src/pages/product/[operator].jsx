import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostpaidForm from '@/components/Product/PostpaidForm';
import PrepaidForm from '@/components/Product/PrepaidForm';
import LoadingScreen from '@/components/LoadingScreen';
import { motion } from 'framer-motion';

const ProductDetail = () => {
    const router = useRouter();
    const { operator } = router.query;

    const [products, setProducts] = useState([]);
    const [dataSection, setDataSection] = useState();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [customerNumber, setCustomerNumber] = useState('');
    const [quantity] = useState(1);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [billInfo, setBillInfo] = useState(null);
    const [checkingBill, setCheckingBill] = useState(false);

    // Fetch section info
    useEffect(() => {
        if (!operator) return;
        const fetchOperator = async () => {
            try {
                const res = await axios.get(`/api/sections?id=${operator}`);
                setDataSection(res.data?.data);
            } catch (error) {
                console.error('Error fetching operator:', error);
            }
        };
        fetchOperator();
    }, [operator]);

    // Fetch product info
    useEffect(() => {
        if (!operator) return;
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`/api/products?sectionId=${operator}`);
                const productData = res.data?.data || [];
                setProducts(productData);
                if (productData.length > 0) {
                    setSelectedProductId(productData[0].id);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [operator, dataSection]);

    const selectedProduct = products.find((p) => p.id === selectedProductId);

    if (loading) return <LoadingScreen isLoading={loading} />;

    return (
        <motion.div
            className="relative flex flex-col items-center justify-start px-4 py-8 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Banner Section */}
            <div className="absolute top-1 w-full h-[250px] md:h-[300px] rounded-xl overflow-hidden z-10">
                <div className="absolute inset-0 bg-black/40 z-10 backdrop-blur-sm" />
                <img
                    src={`${process.env.NEXT_PUBLIC_URL_STORAGE}/${dataSection?.banner}`}
                    alt="Banner"
                    className="w-full h-full object-cover z-0"
                />
            </div>

            {/* Grid Section */}
            <div className=" w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 z-20">
                {/* Product Info */}
                <motion.div
                    className="bg-primary-dark p-6 rounded-xl text-white space-y-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="w-full h-48 md:h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                            src={`${process.env.NEXT_PUBLIC_URL_STORAGE}${dataSection?.banner}`}
                            alt={dataSection?.name || 'Product Image'}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{dataSection?.name || selectedProduct?.name}</h1>
                        <p className={`mt-2 text-sm ${showFullDescription ? '' : 'line-clamp-5'}`}>
                            {selectedProduct?.description || dataSection?.description || 'Tidak ada deskripsi produk.'}
                        </p>
                        {(selectedProduct?.description || dataSection?.description) && (
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="mt-2 text-primary hover:underline text-sm"
                            >
                                {showFullDescription ? 'Tampilkan lebih sedikit' : 'Lihat selengkapnya'}
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Form Section */}
                <motion.div
                    className="lg:col-span-2 bg-primary-dark rounded-xl p-6  space-y-6"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {dataSection?.type === 'prepaid' && (
                        <PrepaidForm
                            customerNumber={customerNumber}
                            setCustomerNumber={setCustomerNumber}
                            products={products}
                            selectedProductId={selectedProductId}
                            setSelectedProductId={setSelectedProductId}
                            quantity={quantity}
                            selectedProduct={selectedProduct}
                        />
                    )}

                    {dataSection?.type === 'postpaid' && (
                        <PostpaidForm
                            products={products}
                            customerNumber={customerNumber}
                            setCustomerNumber={setCustomerNumber}
                            setBillInfo={setBillInfo}
                            billInfo={billInfo}
                            setCheckingBill={setCheckingBill}
                            checkingBill={checkingBill}
                        />
                    )}
                </motion.div>
            </div>
        </motion.div>

    );
};

export default ProductDetail;
