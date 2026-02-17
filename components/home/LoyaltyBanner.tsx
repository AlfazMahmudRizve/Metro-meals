"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LoyaltyBanner() {
    return (
        <section className="w-full bg-gradient-to-r from-metro via-orange-500 to-cheese py-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />

            <div className="container mx-auto px-4 relative z-10 flex items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 max-w-4xl shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <div className="flex-shrink-0 bg-white text-metro p-4 rounded-full shadow-lg animate-pulse">
                            <Sparkles size={32} />
                        </div>
                        <div className="text-white space-y-2">
                            <h3 className="font-heading font-extrabold text-2xl md:text-3xl leading-tight">
                                Loyalty tastes better <span className="text-yellow-200">😋💳</span>
                            </h3>
                            <p className="font-sans font-medium text-lg md:text-xl opacity-95">
                                Visit us <span className="font-bold text-yellow-200">5 times in 120 days</span> & enjoy <span className="font-bold text-yellow-200">20% OFF</span> for the next 365 days.
                            </p>
                            <p className="text-sm font-bold uppercase tracking-widest opacity-80 mt-2">
                                Because our regulars deserve more! 🔥
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
