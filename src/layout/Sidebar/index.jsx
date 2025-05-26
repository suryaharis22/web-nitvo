import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaRegStickyNote } from "react-icons/fa";

export default function Sidebar({ isOpen }) {
    const router = useRouter();
    return (
        <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0 md:hidden bg-primary-dark border-r border-gray-200 dark:border-gray-700`}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto">
                <Link href="/" className="flex items-center space-x-3 mb-3 mx-2">
                    <img src="/NITVO-rmbg.png" className="h-14 mx-5" alt="Logo" />
                </Link>
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link
                            href="/"
                            className={`flex items-center p-2 hover:text-warning-light rounded-lg group ${router.pathname === "/" ? "text-warning-light font-semibold" : "text-white"
                                }`}
                        >
                            <FaHome className="w-5 h-5 shrink-0  group-hover:text-warning-light" />
                            <span className="ms-3">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex items-center p-2 text-white hover:text-warning-light rounded-lg group"
                        >
                            <FaRegStickyNote className="w-5 h-5 shrink-0 group-hover:text-warning-light" />
                            <span className="ms-3">Kanban</span>
                            <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center p-2 text-white hover:text-warning-light rounded-lg group">
                            <svg className="w-5 h-5 text-white group-hover:text-warning-light" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="ms-3">Inbox</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center p-2 text-white hover:text-warning-light rounded-lg group">
                            <svg className="w-5 h-5 text-white group-hover:text-warning-light" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                            </svg>
                            <span className="ms-3">Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center p-2 text-white hover:text-warning-light rounded-lg group">
                            <svg className="w-5 h-5 text-white group-hover:text-warning-light" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                            </svg>
                            <span className="ms-3">Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center p-2 text-white hover:text-warning-light rounded-lg group">
                            <svg className="w-5 h-5 text-white group-hover:text-warning-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                            </svg>
                            <span className="ms-3">Sign In</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
