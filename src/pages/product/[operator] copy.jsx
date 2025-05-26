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
    const [dataSection, setDataSection] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [customerNumber, setCustomerNumber] = useState('');
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [billInfo, setBillInfo] = useState(null);
    const [checkingBill, setCheckingBill] = useState(false);

    const quantity = 1;

    // Fetch section data
    useEffect(() => {
        if (!operator) return;

        const fetchSection = async () => {
            try {
                const res = await axios.get(`/api/sections?id=${operator}`);
                setDataSection(res.data?.data);
            } catch (error) {
                console.error('Error fetching operator:', error);
            }
        };

        fetchSection();
    }, [operator]);

    // Fetch product data
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
    }, [operator]);

    const selectedProduct = products.find((p) => p.id === selectedProductId);

    if (loading) return <LoadingScreen isLoading />;

    return (
        <motion.div
            className="relative min-h-screen py-10 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Background */}
            <div className="absolute inset-0 z-0 my-2 rounded-xl overflow-hidden bg-cardimg bg-no-repeat bg-center bg-cover">
                <img
                    src={`${process.env.NEXT_PUBLIC_URL_STORAGE}/${dataSection?.banner}`}
                    alt="Banner"
                    className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm rounded-xl" />
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 w-full max-w-7xl bg-primary-dark rounded-2xl shadow-xl p-6 md:p-10 grid gap-8 lg:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {/* Left Section */}
                <div className="space-y-4 col-span-1">


                    <div className="w-full rounded-xl overflow-hidden bg-gray-200 aspect-video">
                        <img
                            src={`${process.env.NEXT_PUBLIC_URL_STORAGE}/${dataSection?.banner}`}
                            alt={dataSection?.name || 'Product Image'}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-white">
                        {dataSection?.name || selectedProduct?.name}
                    </h1>

                    <div className="text-sm text-gray-200">
                        <p className={showFullDescription ? '' : 'line-clamp-5'}>
                            {selectedProduct?.description || dataSection?.description || 'Tidak ada deskripsi produk.'} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur dignissimos corporis esse totam amet minima accusamus omnis vitae, alias libero, eum tempore et nemo velit? Tempore consequuntur ipsum dignissimos voluptatum.
                            {selectedProduct?.description || dataSection?.description || 'Tidak ada deskripsi produk.'} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur dignissimos corporis esse totam amet minima accusamus omnis vitae, alias libero, eum tempore et nemo velit? Tempore consequuntur ipsum dignissimos voluptatum.
                            {selectedProduct?.description || dataSection?.description || 'Tidak ada deskripsi produk.'} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur dignissimos corporis esse totam amet minima accusamus omnis vitae, alias libero, eum tempore et nemo velit? Tempore consequuntur ipsum dignissimos voluptatum.
                            {selectedProduct?.description || dataSection?.description || 'Tidak ada deskripsi produk.'} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur dignissimos corporis esse totam amet minima accusamus omnis vitae, alias libero, eum tempore et nemo velit? Tempore consequuntur ipsum dignissimos voluptatum.
                        </p>
                        {(selectedProduct?.description || dataSection?.description) && (
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="mt-2 text-primary hover:underline"
                            >
                                {showFullDescription ? 'Tampilkan lebih sedikit' : 'Lihat selengkapnya'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Section */}
                <motion.div
                    className="space-y-6 col-span-1 lg:col-span-2"
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
