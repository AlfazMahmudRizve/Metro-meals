"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { CheckCircle, ArrowRight, Home } from "lucide-react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id");

    // Pizza Morph Animation Variant
    const pizzaVariants: Variants = {
        initial: { scale: 0.8, opacity: 0, rotate: -180 },
        animate: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 1.5
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-center font-sans w-full">
            <motion.div
                initial="initial"
                animate="animate"
                variants={pizzaVariants}
                className="text-9xl mb-6 relative"
            >
                🍕
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 border-4 border-white"
                >
                    <CheckCircle size={48} />
                </motion.div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-extrabold font-heading text-gray-900 mb-4"
            >
                Order Placed!
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600 max-w-md mx-auto mb-8"
            >
                High five! 🙌 The kitchen has received your order and the flames are on.
            </motion.p>

            {orderId && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full mb-8"
                >
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-2xl font-mono font-bold text-gray-900">#{orderId.slice(0, 8)}</p>
                    <div className="h-px bg-gray-100 my-4" />
                    <p className="text-sm text-gray-500 font-medium">Estimated Time: <span className="text-metro font-bold">20-30 mins</span></p>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4"
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <Home size={20} /> Back Home
                </Link>
                {/* Future: Link to /status or /profile */}
                <button className="flex items-center gap-2 px-6 py-3 bg-metro text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg active:scale-95">
                    Track Order <ArrowRight size={20} />
                </button>
            </motion.div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-metro/5 flex flex-col items-center justify-center p-6 bg-plate">
            <Suspense fallback={<div className="text-center font-bold text-gray-500">Loading order details...</div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
