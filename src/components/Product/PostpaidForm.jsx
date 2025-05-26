// components/PostpaidForm.jsx
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import 'sweetalert2/dist/sweetalert2.min.css';

const PostpaidForm = ({
    products,
    customerNumber,
    setCustomerNumber,
    setBillInfo,
    billInfo,
    setCheckingBill,
    checkingBill
}) => {
    const router = useRouter();

    const handleCheckBill = async () => {
        if (!customerNumber.trim()) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'warning',
                title: 'Nomor pelanggan tidak boleh kosong',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            return;
        }

        setCheckingBill(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/inquiry`, {
                product: products[0].code,
                destination: customerNumber,
            });

            setBillInfo(response.data.data);
        } catch (err) {
            console.error('Gagal cek tagihan:', err);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Gagal cek tagihan',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            setBillInfo(null);
        } finally {
            setCheckingBill(false);
        }
    };

    const handleSubmitPostpaid = async (e) => {
        e.preventDefault();

        if (!billInfo || !billInfo.referenceNo) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Tagihan tidak valid',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}transactions`, {
                product: products[0].code,
                destination: customerNumber,
                referenceNo: billInfo.referenceNo,
            });

            const { referenceNo } = response.data.data;


            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Pembayaran berhasil! Mengalihkan...',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });

            router.push(`/payment/${referenceNo}`);
        } catch (err) {
            console.error('Gagal bayar tagihan:', err);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Gagal membayar tagihan',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }
    };

    return (
        <div className="space-y-4">
            {/* Input Nomor */}
            {!billInfo && (
                <div>
                    <label htmlFor="customerNumber" className="block text-sm font-medium text-gray-700">
                        User ID
                    </label>
                    <input
                        type="text"
                        id="customerNumber"
                        value={customerNumber}
                        onChange={(e) => setCustomerNumber(e.target.value)}
                        required
                        placeholder="Contoh: 1234567890"
                        className="mt-1 w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            )}

            {/* Info Tagihan */}
            {billInfo && (
                <div className="mt-12 p-6 border rounded-lg bg-gray-50 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Detail Tagihan</h3>

                    <div className="flex items-center justify-center mb-4">
                        <span className="text-indigo-700 font-semibold text-base">
                            {billInfo.title}
                        </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-600">Nama Pelanggan:</span>
                        <span className="font-medium text-gray-900">{billInfo.customerName}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-600">Nomor Pelanggan:</span>
                        <span className="font-medium text-gray-900">{billInfo.customerId}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Tagihan:</span>
                        <span className="font-semibold text-red-600">
                            Rp {billInfo.price.toLocaleString('id-ID')}
                        </span>
                    </div>
                </div>
            )}

            {/* Tombol */}
            {!billInfo ? (
                <button
                    type="button"
                    onClick={handleCheckBill}
                    disabled={checkingBill}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition shadow-sm"
                >
                    {checkingBill ? 'Mengecek...' : 'Cek Tagihan'}
                </button>
            ) : (
                <button
                    onClick={handleSubmitPostpaid}
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition shadow-sm"
                >
                    Bayar Tagihan
                </button>
            )}
        </div>
    );
};

export default PostpaidForm;
