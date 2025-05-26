import QRCodeWithLogo from "@/components/QRCode";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const statusMapping = {
    '00': { label: 'Pembayaran Berhasil', color: 'text-green-600', image: '/imgicon.png' },
    '01': { label: 'Menunggu Pembayaran', color: 'text-yellow-600', image: null }, // QRIS
    '02': { label: 'Sedang Diproses', color: 'text-blue-600', image: '/imgicon.png' },
    '03': { label: 'Menunggu Konfirmasi', color: 'text-yellow-500', image: '/imgicon.png' },
    '04': { label: 'Dana Dikembalikan', color: 'text-purple-600', image: '/imgicon.png' },
    '05': { label: 'Pembayaran Dibatalkan', color: 'text-gray-600', image: '/imgicon.png' },
    '06': { label: 'Gagal', color: 'text-red-600', image: '/imgicon.png' },
    '07': { label: 'Transaksi Tidak Ditemukan', color: 'text-red-500', image: '/imgicon.png' },
    '08': { label: 'QR Code Kedaluwarsa', color: 'text-red-500', image: '/imgicon.png' },
};

const PaymentStatus = () => {
    const router = useRouter();
    const { noref } = router.query;
    const [dataTransaction, setDataTransaction] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0);
    const status = dataTransaction?.statusCode;
    const info = statusMapping[status];
    const activeStatuses = ['01', '02', '03'];

    useEffect(() => {
        if (!noref) return;

        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/ref/${noref}`
                );
                setDataTransaction(res.data.data);
            } catch (error) {
                console.error("Gagal mengambil data transaksi:", error);
            }
        };

        fetchData();
    }, [noref]);

    // Hitung waktu kedaluwarsa
    useEffect(() => {
        if (!dataTransaction?.paymentExpiry) return;

        const expiry = new Date(dataTransaction.paymentExpiry).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const diff = Math.max(0, Math.floor((expiry - now) / 1000));
            setRemainingTime(diff);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [dataTransaction]);

    // Polling status setiap 5 detik jika status masih aktif
    useEffect(() => {
        if (!noref || !activeStatuses.includes(status)) return;

        const interval = setInterval(async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/ref/${noref}`
                );
                const newStatus = res.data.data?.statusCode;
                setDataTransaction(res.data.data);

                if (!activeStatuses.includes(newStatus)) {
                    clearInterval(interval);
                }
            } catch (error) {
                console.error("Gagal memperbarui status transaksi:", error);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [noref, status]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} menit ${secs < 10 ? '0' : ''}${secs} detik`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 p-4">
            <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md text-center space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Status Pembayaran</h1>

                {dataTransaction ? (
                    <>
                        {/* Jika statusCode === '01' (initiated), tampilkan QRCode */}
                        {status === '01' ? (
                            <>
                                <div className="flex justify-center">
                                    <QRCodeWithLogo
                                        text={dataTransaction.paymentCode}
                                        logoSrc="/logo_qris.png"
                                        size={250}
                                    />
                                </div>
                                <p className="text-gray-700">
                                    Silakan scan QR code di atas menggunakan aplikasi pembayaran favoritmu.
                                </p>
                                <p className="mt-2 text-lg text-red-600 font-semibold">
                                    Waktu tersisa: {formatTime(remainingTime)}
                                </p>
                                {remainingTime === 0 && (
                                    <p className="text-sm text-gray-500 mt-2">QR code telah kedaluwarsa</p>
                                )}
                            </>
                        ) : (
                            <>
                                {/* Status selain '01' */}
                                {info?.image && (
                                    <div className="flex justify-center">
                                        <img src={info.image} alt="status icon" className="w-28 h-28" />
                                    </div>
                                )}
                                <p className={`text-xl font-semibold ${info?.color}`}>{info?.label}</p>
                            </>
                        )}
                    </>
                ) : (
                    <p className="text-gray-500">Memuat data transaksi...</p>
                )}
                {/* Detail Pembayaran */}
                <div className="text-left mt-6 space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Detail Pembayaran</h2>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Nomor Referensi:</span>
                        <span
                            className="font-medium text-gray-900 cursor-pointer hover:underline"
                            onClick={() => {
                                if (dataTransaction?.referenceNo) {
                                    navigator.clipboard.writeText(dataTransaction.referenceNo);
                                    Swal.fire({
                                        toast: true,
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Nomor referensi berhasil disalin',
                                        showConfirmButton: false,
                                        timer: 2000,
                                        timerProgressBar: true,
                                    });
                                }
                            }}
                        >
                            {dataTransaction?.referenceNo || '-'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Nama Produk:</span>
                        <span className="font-medium text-gray-900">{dataTransaction?.title || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">destination:</span>
                        <span className="font-medium text-gray-900">{dataTransaction?.destination}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Harga:</span>
                        <span className="font-medium text-gray-900">{dataTransaction?.price ? `Rp${Number(dataTransaction.price).toLocaleString('id-ID')}` : '-'}</span>
                    </div>
                    {dataTransaction?.serialNumber && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Nomor Serial:</span>
                            <span className="font-medium text-gray-900">{dataTransaction.serialNumber}</span>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => router.push('/')}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
                >
                    Kembali ke Beranda
                </button>
            </div>
        </div>
    );
};

export default PaymentStatus;
