import { motion, AnimatePresence } from "framer-motion";

const blobVariants = {
    animate: {
        borderRadius: [
            "25% 75% 40% 60% / 50% 50% 30% 70%",
            "10% 90% 20% 80% / 60% 40% 70% 30%",
            "35% 65% 15% 85% / 55% 45% 60% 40%",
            "25% 75% 40% 60% / 50% 50% 30% 70%",
        ],
        backgroundColor: [
            "#4028b8",
            "#8230c9",
            "#fa9420",
            "#4028b8",
        ],
        transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
        },
    },
};

export default function LoadingScreen({ isLoading }) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 flex items-center justify-center bg-background z-50"
                >
                    <motion.div
                        variants={blobVariants}
                        animate="animate"
                        className="w-52 h-52 flex items-center justify-center relative"
                    >
                        <img
                            src="/NITVO-rmbg.png"
                            alt="Logo"
                            className="w-24 h-24 absolute z-10"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
