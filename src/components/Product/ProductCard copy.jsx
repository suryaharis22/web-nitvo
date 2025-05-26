
const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-md transition py-2 flex flex-col items-center text-center">
            <div className="w-full h-[192px] object-contain mb-3 bg-gray-600 rounded-lg"></div>
            {/* <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-contain mb-3"
            /> */}
            <h3 className="text-sm font-medium text-gray-800">{product.operator}</h3>
            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            <p className="text-lg font-semibold text-indigo-600">{product.price}</p>
            <button className="mt-3 px-4 py-1 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700">
                Beli
            </button>
        </div>
    );
}

export default ProductCard;