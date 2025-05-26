import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { motion } from 'framer-motion';

const PrepaidForm = ({
    customerNumber,
    setCustomerNumber,
    products,
    selectedProductId,
    setSelectedProductId,
    quantity,
    selectedProduct,
}) => {
    const router = useRouter();

    const handleSubmit = async () => {
        if (!customerNumber.trim()) {
            return Swal.fire({
                toast: true,
                position: 'top',
                icon: 'warning',
                title: 'Nomor pelanggan tidak boleh kosong',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }

        if (!selectedProduct) {
            return Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'warning',
                title: 'Silakan pilih produk terlebih dahulu',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }

        const payload = {
            product: selectedProduct.code,
            destination: customerNumber,
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}transactions`, payload);
            if (response.status === 200) {
                const { referenceNo } = response.data.data;
                router.push(`/payment/${referenceNo}`);
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Transaksi gagal, coba lagi',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Terjadi kesalahan saat transaksi',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 p-4 bg-white rounded-xl "
        >
            {/* Input Nomor */}
            <div>
                <label htmlFor="customerNumber" className="block text-sm font-medium text-foreground">
                    Nomor Pelanggan
                </label>
                <input
                    type="text"
                    id="customerNumber"
                    value={customerNumber}
                    onChange={(e) => setCustomerNumber(e.target.value)}
                    required
                    placeholder="Contoh: 08123456789"
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Grouped Products */}
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Pilih Produk</h2>
                {Object.entries(
                    products.reduce((grouped, product) => {
                        const label = product.label || 'Lainnya';
                        if (!grouped[label]) grouped[label] = [];
                        grouped[label].push(product);
                        return grouped;
                    }, {})
                ).map(([label, items]) => (
                    <div key={label} className="mb-6">
                        <h3 className="text-md font-semibold text-gray-500 mb-2 capitalize">{label}</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {items.map((product) => (
                                <motion.label
                                    key={product.id}
                                    whileHover={{ scale: 1.02 }}
                                    className={`flex items-center gap-3 cursor-pointer rounded-xl border p-4 transition-all duration-200 ${selectedProductId === product.id
                                        ? 'border-primary bg-primary/10'
                                        : 'border-gray-200 hover:border-primary'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="product"
                                        value={product.id}
                                        checked={selectedProductId === product.id}
                                        onChange={(e) => setSelectedProductId(e.target.value)}
                                        className="hidden"
                                    />
                                    <div className="w-10 h-10 rounded-full bg-gdn flex items-center justify-center">
                                        <img
                                            src="/Untitled-3.png"
                                            className="w-full h-full object-contain"
                                            alt="icon"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-foreground font-medium">{product.name}</div>
                                        <div className="text-sm text-gray-500">
                                            Rp {product.price.toLocaleString('id-ID')}
                                        </div>
                                    </div>
                                </motion.label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Harga dan Tombol Beli */}
            <div className="text-lg font-semibold text-primary">
                Total: Rp {selectedProduct ? (selectedProduct.price * quantity).toLocaleString('id-ID') : 0}
            </div>
            <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition shadow-md"
            >
                Beli Sekarang
            </motion.button>
        </motion.div>
    );
};

export default PrepaidForm;
