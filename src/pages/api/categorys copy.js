// pages/api/categorys.js

export default function handler(req, res) {
    // Cek jika method yang digunakan adalah GET
    if (req.method === 'GET') {
        // Data kategori dengan ikon (mengirimkan nama ikon sebagai string)
        const categories = [
            { name: 'All', icon: 'IconGridDots' },
            { name: 'Pulsa', icon: 'IconDeviceMobileCharging' },
            { name: 'Paket Data', icon: 'IconWifi' },
            { name: 'Listrik', icon: 'IconBolt' },
            { name: 'PDAM', icon: 'IconDroplet' },
            { name: 'BPJS', icon: 'IconHeartbeat' },
            { name: 'Internet', icon: 'IconSatellite' },
            { name: 'TV Kabel', icon: 'IconCreditCard' },
            { name: 'E-Money', icon: 'IconCash' },
        ];

        // Mengirimkan response dengan data kategori
        res.status(200).json(categories);
    } else {
        // Menangani metode selain GET
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
