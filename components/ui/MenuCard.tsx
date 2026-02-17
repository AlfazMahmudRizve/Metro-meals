"use client";

import { motion } from "framer-motion";
import { Plus, Flame, Star } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { cn } from "@/lib/utils";

interface MenuCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    tags: string[];
}

export default function MenuCard({ id, name, price, image, tags }: MenuCardProps) {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAdd = () => {
        addToCart({ id, name, price, image });
    };

    return (
        <motion.div
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Image Section */}
            <div className="h-48 overflow-hidden relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Tags */}
                <div className="absolute top-2 left-2 flex gap-2">
                    {tags.includes("spicy") && (
                        <span className="flex items-center gap-1 bg-metro text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse shadow-[0_0_10px_#E62129]">
                            <Flame size={12} fill="currentColor" /> Spicy
                        </span>
                    )}
                    {tags.includes("bestseller") && (
                        <span className="flex items-center gap-1 bg-white border-2 border-cheese text-gray-800 px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                            <Star size={12} className="text-cheese" fill="currentColor" /> Best Seller
                        </span>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                    <h3 className="font-heading font-bold text-lg leading-tight text-gray-800 group-hover:text-metro transition-colors">
                        {name}
                    </h3>
                    <span className="font-sans font-bold text-lg text-gray-900">
                        ৳{price}
                    </span>
                </div>

                {/* Add Button - Updated to Solid Red */}
                <motion.button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAdd();
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-metro text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-red-700 shadow-md hover:shadow-lg mt-auto"
                >
                    <Plus size={18} />
                    Add to Cart
                </motion.button>
            </div>
        </motion.div>
    );
}
