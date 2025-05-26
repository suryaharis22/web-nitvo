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
            className="relative flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Banner Section */}
            <div className="w-full h-[300px] z-10 bg-cardimg bg-no-repeat bg-center bg-cover mt-2 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-500/30 backdrop-blur-sm z-10" />
                <img
                    src={`${process.env.NEXT_PUBLIC_URL_STORAGE}/${dataSection?.banner}`}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Form Section */}
            <motion.div
                className="absolute top-1/2 z-20 grid lg:grid-cols-3 gap-6 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {/* Product Info */}
                <div className="space-y-4 bg-primary-dark p-4 rounded-xl">
                    <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                        <img
                            src={`${process.env.NEXT_PUBLIC_URL_STORAGE}${dataSection?.banner}`}
                            alt={dataSection?.name || 'Product Image'}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="text-sm text-gray-200">
                        <h1 className="text-3xl font-bold text-white">
                            {dataSection?.name || selectedProduct?.name}
                        </h1>
                        <p className={showFullDescription ? '' : 'line-clamp-5'}>
                            {selectedProduct?.description || dataSection?.description || 'Tidak ada deskripsi produk.'}
                        </p>
                        {(selectedProduct?.description || dataSection?.description) && (
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="mt-2 text-primary-dark hover:underline text-sm"
                            >
                                {showFullDescription ? 'Tampilkan lebih sedikit' : 'Lihat selengkapnya'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Dynamic Form (Prepaid/Postpaid) */}
                <motion.div
                    className="space-y-6 col-span-2 bg-primary-dark p-4 rounded-xl"
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
            </motion.div>
        </motion.div>
    );
};

export default ProductDetail;
