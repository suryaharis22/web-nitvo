"use client";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

const QRCodeWithLogo = ({ text, logoSrc, size = 200 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const generateQR = async () => {
            try {
                const canvas = canvasRef.current;
                await QRCode.toCanvas(canvas, text, {
                    width: size,
                    margin: 1,
                });

                const ctx = canvas.getContext("2d");

                // Load logo image
                const logo = new Image();
                logo.src = logoSrc;
                logo.crossOrigin = "anonymous";

                logo.onload = () => {
                    const logoWidth = size * 0.4;  // ubah sesuai keinginan
                    const logoHeight = size * 0.20; // bisa beda dari width kalau ingin

                    const x = (canvas.width - logoWidth) / 2;
                    const y = (canvas.height - logoHeight) / 2;

                    ctx.fillStyle = "white";
                    ctx.fillRect(x, y, logoWidth, logoHeight); // background putih (opsional)
                    ctx.drawImage(logo, x, y, logoWidth, logoHeight); // gambar logo
                };
            } catch (err) {
                console.error("Failed to generate QR code", err);
            }
        };

        generateQR();
    }, [text, logoSrc, size]);

    return (
        <div className="p-4 bg-white rounded shadow">
            <canvas ref={canvasRef} className="mx-auto" />
        </div>
    );
};

export default QRCodeWithLogo;
