import { useEffect, useState } from "react";
import axios from "axios";;
import { useProduct } from "@/context/ProductContext";
import OpratorCard from "./OpratorCard";

const Product = ({ selectCategory, setSelectCategory }) => {
    const { products, setProducts } = useProduct();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Aktifkan loading saat fetch dimulai

            try {
                let response;

                if (selectCategory === 'All') {
                    response = await axios.get('/api/products');
                } else {
                    response = await axios.get(`/api/products?category=${selectCategory}`);
                }

                console.log(response.data.data);
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false); // Matikan loading setelah fetch selesai
            }
        };

        fetchProducts();
    }, [selectCategory]);

    const groupedProducts = products.reduce((acc, product) => {
        const key = product.operator || "Lainnya";
        if (!acc[key]) acc[key] = [];
        acc[key].push(product);
        return acc;
    }, {});

    // Convert the groupedProducts object to an array
    const groupedProductsArray = Object.entries(groupedProducts).map(([operator, items]) => ({
        operator,
    }));

    const skeletonArray = Array.from({ length: 10 });

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            {loading ? (
                skeletonArray.map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow py-2 flex flex-col items-center text-center animate-pulse"
                    >
                        <div className="w-full h-[192px] bg-gray-200 rounded-lg mb-3" />
                        <div className="w-3/4 h-4 bg-gray-200 rounded mb-2" />
                        <div className="w-1/2 h-3 bg-gray-200 rounded mb-2" />
                        <div className="w-1/3 h-5 bg-gray-300 rounded mb-3" />
                        <div className="w-1/2 h-6 bg-gray-300 rounded-full" />
                    </div>
                ))
            ) : groupedProductsArray.length > 0 ? (
                groupedProductsArray.map((grpProduct, index) => (
                    <OpratorCard key={index} product={grpProduct} />
                ))
            ) : (
                <div className="col-span-full text-center text-xl text-gray-600">No products available</div>
            )}
        </div>
    );
};

export default Product;
