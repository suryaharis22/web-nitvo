// src/pages/api/transactions.js
import axios from 'axios';

export default async function handler(req, res) {
    const BASE_URL = process.env.API_BASE_URL;

    if (req.method === 'POST') {
        try {
            const { product, destination } = req.body;

            // Validasi
            if (!product || !destination) {
                return res.status(400).json({ message: 'Product and destination are required' });
            }

            // Kirim payload ke API eksternal
            const payload = {
                product,
                destination,
            };

            const response = await axios.post(`${BASE_URL}/transactions`, payload);

            return res.status(200).json(response.data);
        } catch (error) {
            console.error('Transaction error:', error.message);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
