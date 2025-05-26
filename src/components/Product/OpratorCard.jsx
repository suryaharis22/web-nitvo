import { useRouter } from "next/router";

const OpratorCard = ({ product }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/product/${product.id}`)}
            className="group  rounded-xl shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden relative"
        >
            <div className="w-full h-[192px] rounded-t-xl group-hover:bg-black/40 overflow-hidden relative">
                <img
                    src={`${process.env.NEXT_PUBLIC_URL_STORAGE}/${product.banner}`}
                    // src={`/menu-section/ewallet/link-aja-section.png`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 bg-cardimg bg-no-repeat bg-center bg-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 py-2 group-hover:bg-white/40">
                    <h3 className="text-white group-hover:text-white text-base font-bold transition-colors duration-300">
                        {product.name}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default OpratorCard;
