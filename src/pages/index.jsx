// src/pages/index.jsx

import { useEffect, useState } from "react";
import Carousel from "@/components/Carousel";
import Category from "@/components/Category";
import Sections from "@/components/Sections";
import LoadingScreen from "@/components/LoadingScreen";
import { IconClock, IconCreditCard, IconShieldCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectCategory, setSelectCategory] = useState("All");
  const [searchSections, setSearchSections] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <IconClock className="w-8 h-8 text-indigo-600" />,
      title: "Transaksi cepat dan aman",
      description:
        "Topup game dan isi ulang hanya dalam hitungan detik, dengan sistem keamanan terjamin.",
    },
    {
      icon: <IconCreditCard className="w-8 h-8 text-indigo-600" />,
      title: "Banyak metode pembayaran",
      description:
        "Kami mendukung transfer bank, e-wallet, QRIS, dan metode lainnya yang mudah.",
    },
    {
      icon: <IconShieldCheck className="w-8 h-8 text-indigo-600" />,
      title: "Semua kebutuhanmu di satu tempat",
      description:
        "Satu platform untuk berbagai topup game, pulsa, data, listrik, dan voucher digital.",
    },
  ];

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <div className="px-1 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Carousel />
          </motion.div>

          <motion.h1
            className="text-xl font-bold my-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Product Category
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Category
              selectCategory={selectCategory}
              setSelectCategory={setSelectCategory}
            />
          </motion.div>

          <motion.h1
            className="text-xl font-bold mt-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Product List
          </motion.h1>

          <motion.input
            type="text"
            value={searchSections}
            onChange={(e) => setSearchSections(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            placeholder="Search product"
            className="border border-primary-dark rounded-md px-4 py-2 mb-4 w-full max-w-md mt-4 shadow-sm focus:outline-none "
          />

          <motion.div
            className="bg-gdn p-4 rounded-xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Sections
              selectCategory={selectCategory}
              setSelectCategory={setSelectCategory}
              searchSections={searchSections}
            />
          </motion.div>

          <motion.section
            className="bg-gdn py-10 px-4 my-6 rounded-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Mengapa Topup Game dan Isi Ulang di <br className="hidden sm:inline" />
                <span className="text-yellow-300">NITVO?</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {features.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      )}
    </>
  );
}
