// pages/api/sections.js

import axios from 'axios';

export default async function handler(req, res) {
    const { id, menuId, search, page, pageSize } = req.query;
    const BASE_URL = process.env.API_BASE_URL;

    if (req.method === 'GET') {
        try {
            let url = '';

            if (id) {
                // Ambil berdasarkan ID
                url = `${BASE_URL}sections/id/${id}`;
            } else {
                // Gunakan query string untuk filter/pagination
                const params = new URLSearchParams();

                if (search) params.append('search', search);
                if (menuId) params.append('menuId', menuId);
                if (page) params.append('page', page);
                if (pageSize) params.append('pageSize', pageSize);

                url = `${BASE_URL}sections?${params.toString()}`;
            }

            const response = await axios.get(url);
            res.status(200).json(response.data);
        } catch (error) {
            if (error.response?.status === 404) {
                res.status(404).json({ message: 'Section not found' });
            }
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || 'Internal Server Error';
            res.status(status).json({ message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
