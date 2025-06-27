"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Motion({ children }: { children: React.ReactNode }) {
    const path = usePathname();

    return (
        <motion.div
            key={path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
}
