"use client";

import { motion } from "framer-motion";
import { Check, Pizza } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessPage() {
    const [showPizza, setShowPizza] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPizza(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="min-h-screen bg-plate flex flex-col items-center justify-center p-4 text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-8 relative"
            >
                {!showPizza ? (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 1.2, duration: 0.3 }}
                    >
                        <Check size={64} className="text-white" />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    >
                        <Pizza size={64} className="text-white" />
                    </motion.div>
                )}
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-heading font-extrabold text-4xl mb-4 text-gray-900"
            >
                Order Received!
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-600 text-lg mb-8"
            >
                The kitchen is firing up the stove. <br />
                Get ready for some flavor.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <Link href="/status" className="bg-metro text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-red-700 transition-colors">
                    Track Status
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-8"
            >
                <Link href="/" className="text-gray-500 underline">
                    Back to Menu
                </Link>
            </motion.div>
        </main>
    );
}
