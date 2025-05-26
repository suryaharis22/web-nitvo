import Link from 'next/link';
import Image from 'next/image';
import { FaDiscord, FaDribbble, FaFacebookF, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-primary-dark text-white">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-8 lg:py-12">
                <div className="md:flex md:justify-between">
                    <div className="mb-8 md:mb-0">
                        <Link href="/" className="flex items-center space-x-3">
                            <Image
                                src="/NITVO-rmbg.png"
                                alt="PPOBku Logo"
                                width={40}
                                height={40}
                                className="h-10 w-10"
                            />

                        </Link>
                        <p className="mt-2 text-sm text-gray-300">Solusi pembayaran tagihan Anda.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:gap-10 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-4 text-sm font-semibold uppercase text-white">Layanan</h2>
                            <ul className="text-gray-300 text-sm space-y-2">
                                <li><Link href="#" className="hover:text-white transition-colors duration-200">PLN</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors duration-200">PDAM</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors duration-200">Pulsa & Data</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-sm font-semibold uppercase text-white">Ikuti Kami</h2>
                            <ul className="text-gray-300 text-sm space-y-2">
                                <li><Link href="#" className="hover:text-white transition-colors duration-200">Facebook</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors duration-200">Discord</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-sm font-semibold uppercase text-white">Legal</h2>
                            <ul className="text-gray-300 text-sm space-y-2">
                                <li><Link href="#" className="hover:text-white transition-colors duration-200">Kebijakan Privasi</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors duration-200">Syarat & Ketentuan</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-600" />

                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-400 sm:text-center">© 2025 NITVO. All rights reserved.</span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0 gap-4 text-lg">
                        <Link href="#" className="hover:text-warning transition-colors"><FaFacebookF /></Link>
                        <Link href="#" className="hover:text-warning transition-colors"><FaDiscord /></Link>
                        <Link href="#" className="hover:text-warning transition-colors"><FaTwitter /></Link>
                        <Link href="#" className="hover:text-warning transition-colors"><FaGithub /></Link>
                        <Link href="#" className="hover:text-warning transition-colors"><FaDribbble /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
