import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

const slideData = [
    {
        type: 'image',
        src: '/slide/NITVO-PULSA.png',
        title: 'Deskripsi Gambar 1',
        description: '',
        buttonText: '',
        buttonUrl: '',
    },
    {
        type: 'gif',
        src: '/slide/NITVO-GAME-WALLLET.gif',
        title: '',
        description: '',
        buttonText: '',
        buttonUrl: '',
    },
    {
        type: 'image',
        src: '/slide/NITVO-E-Wallet.png',
        title: '',
        description: '',
        buttonText: '',
        buttonUrl: '',
    },
    {
        type: 'gif',
        src: '/slide/NITVO-Ban.gif',
        title: 'GIF Lucu',
        description: 'Ini adalah animasi GIF yang menarik.',
        buttonText: 'Lihat Detail',
        buttonUrl: '#',
    }

];

export default function Carousel() {
    return (
        <div className="flex justify-center items-center mt-4 w-full">
            <Swiper
                navigation
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                slidesPerView={1}
                className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
            >
                {slideData.map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        {slide.type === 'image' || slide.type === 'gif' ? (
                            <img
                                src={slide.src}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                            />
                        ) : (
                            <video
                                muted
                                autoPlay
                                loop
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                            >
                                <source src={slide.src} type="video/mp4" />
                                Browser Anda tidak mendukung tag video.
                            </video>
                        )}

                        <div className="absolute bottom-8 left-8 text-white">
                            {slide.title && (
                                <h2 className="text-xl font-bold mb-4">{slide.title}</h2>
                            )}
                            {slide.description && (
                                <p className="mb-4">{slide.description}</p>
                            )}
                            {slide.buttonText && slide.buttonUrl && (
                                <a href={slide.buttonUrl} className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                                    {slide.buttonText}
                                </a>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
