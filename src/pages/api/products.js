// pages/api/products.js

import axios from 'axios';

export default async function handler(req, res) {
    const { id, sectionId, search, page, pageSize } = req.query;
    const BASE_URL = process.env.API_BASE_URL;

    if (req.method === 'GET') {
        try {
            let url;

            if (id) {
                // Ambil berdasarkan ID tertentu
                url = `${BASE_URL}products/id/${id}`;
            } else {
                // Base URL untuk semua query
                const params = new URLSearchParams();

                if (sectionId) params.append('sectionId', sectionId);
                if (search) params.append('search', search);
                if (page) params.append('page', page);
                if (pageSize) params.append('pageSize', pageSize);

                url = `${BASE_URL}products?${params.toString()}`;
            }

            const response = await axios.get(url);
            res.status(200).json(response.data);
        } catch (error) {
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || 'Internal Server Error';
            res.status(status).json({ message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
