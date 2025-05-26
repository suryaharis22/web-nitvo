"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex flex-col min-h-screen">
            <Header toggleSidebar={toggleSidebar} />
            <div className="flex flex-1">
                <Sidebar isOpen={isSidebarOpen} />
                <main className="flex-1 px-2 bg-white  min-h-screen">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}
