import { useRouter } from "next/router";

const CekTransaction = () => {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const refNumber = e.target.refNumber.value;
        router.push(`/payment/${refNumber}`);
    };
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-primary-dark text-foreground w-full max-w-md p-6 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold mb-4 text-white text-center">
                    Cek Transaksi
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="refNumber"
                            className="block text-sm font-medium text-white"
                        >
                            Nomor Referensi Transaksi
                        </label>
                        <input
                            type="text"
                            id="refNumber"
                            name="refNumber"
                            placeholder="Masukkan nomor referensi"
                            className="mt-1 block w-full px-4 py-2 bg-white border border-primary text-secondary-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-warning text-white py-2 px-4 rounded-md hover:bg-warning-light transition duration-300"
                    >
                        Cek Sekarang
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CekTransaction;
