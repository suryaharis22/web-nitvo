import Link from "next/link";
import { useState } from "react";

export default function Header({ toggleSidebar }) {
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <nav className="bg-primary-dark border-gray-700 p-2">
            <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3">
                    <img src="/NITVO-rmbg.png" className="h-10 mx-5" alt="Logo" />
                </Link>

                <button
                    onClick={toggleSidebar}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary-light"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="hidden md:block md:w-auto">
                    <ul className="flex flex-col md:flex-row items-start md:items-center font-medium bg-primary-dark md:bg-transparent rounded-lg md:space-x-8 p-4 md:p-0 text-white transition-all duration-300">
                        <li>
                            <Link href="#" className="block py-2 px-3 hover:text-warning-light transition-all duration-200">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="block py-2 px-3 hover:text-warning-light transition-all duration-200">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="block py-2 px-3 hover:text-warning-light transition-all duration-200">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="block py-2 px-3 hover:text-warning-light transition-all duration-200">
                                Contact
                            </Link>
                        </li>
                        <li className="relative">
                            <button
                                onClick={() => setOpenDropdown(!openDropdown)}
                                className="flex items-center gap-1 py-2 px-3 hover:text-warning-light transition-all duration-200"
                            >
                                Dropdown
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 10 6">
                                    <path d="M1 1l4 4 4-4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div
                                className={`absolute top-full left-0 mt-2 w-44 bg-primary-dark text-white    rounded-md shadow-lg z-20 transition-all duration-300 ${openDropdown ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                                    }`}
                            >
                                <ul className="py-2 text-sm">
                                    <li>
                                        <Link href="#" className="block px-4 py-2 bg-primary-dark hover:text-warning-light ">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="block px-4 py-2 bg-primary-dark hover:text-warning-light ">
                                            Settings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="block px-4 py-2 bg-primary-dark hover:text-warning-light ">
                                            Earnings
                                        </Link>
                                    </li>
                                </ul>
                                <div className="border-t border-gray-200 dark:border-gray-600">
                                    <Link href="#" className="block px-4 py-2 text-sm bg-primary-dark hover:text-warning-light">
                                        Sign out
                                    </Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
