"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CartSheet() {
    const { cart, getCartTotal, isStudentDiscountActive, clearCart, updateQuantity, removeFromCart } = useCartStore();
    const [isOpen, setIsOpen] = useState(false);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: "", phone: "", tableNumber: "", address: "" });
    const router = useRouter();

    const total = getCartTotal();
    const discountActive = isStudentDiscountActive();
    const finalTotal = discountActive ? Math.round(total * 0.85) : total;
    const threshold = 1000;
    const remaining = Math.max(0, threshold - total);
    const progress = Math.min(100, (total / threshold) * 100);

    const isStoreOpenCheck = () => {
        const { isOpen, message } = require("@/lib/utils/businessHours").isStoreOpen();
        if (!isOpen) {
            alert(`Store is currently closed. ${message}`);
            return false;
        }
        return true;
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isStoreOpenCheck()) return;

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart,
                    customer: formData,
                    total: finalTotal
                })
            });

            if (res.ok) {
                clearCart();
                setIsOpen(false);
                setShowCheckoutForm(false);
                router.push('/success');
            }
        } catch (error) {
            console.error("Checkout failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // if (cart.length === 0) return null; // User wants to see the bar to know gamification exists

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl p-4"
                        onClick={() => setIsOpen(true)}
                    >
                        {/* Gamified Progress Bar */}
                        <div className="mb-3">
                            <div className="flex justify-between text-xs font-bold mb-1">
                                {cart.length === 0 ? (
                                    <span>Start adding to unlock discounts!</span>
                                ) : (
                                    <span>{discountActive ? "🎉 Discount Unlocked!" : `Add ${remaining} TK for 15% OFF`}</span>
                                )}
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className={cn("h-full", discountActive ? "bg-green-500" : "bg-cheese")}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className={cn("text-white p-3 rounded-full transition-colors", cart.length > 0 ? "bg-metro" : "bg-gray-400")}>
                                    <ShoppingBag size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Total</p>
                                    <p className="font-heading font-bold text-xl">৳{total}</p>
                                </div>
                            </div>
                            <button className={cn("px-6 py-2 rounded-xl font-bold text-white transition-colors", cart.length > 0 ? "bg-metro" : "bg-gray-400")}>
                                {cart.length === 0 ? "Empty Tray" : "View Cart"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Expanded Sheet */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center md:p-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="bg-plate w-full md:max-w-md md:rounded-3xl rounded-t-3xl h-[90vh] flex flex-col shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 bg-white border-b flex justify-between items-center">
                                <h2 className="font-heading font-bold text-2xl">
                                    {showCheckoutForm ? "Checkout" : "Your Tray"}
                                </h2>
                                <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {!showCheckoutForm ? (
                                    cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                                            <div className="flex gap-4 items-center flex-1">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-sm md:text-base">{item.name}</h4>
                                                    <p className="text-xs text-gray-500 mb-2">৳{item.price} x {item.quantity}</p>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-3 bg-gray-100 w-max px-2 py-1 rounded-lg">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm text-metro font-bold hover:bg-gray-50"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm text-green-600 font-bold hover:bg-gray-50"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2 ml-4">
                                                <div className="font-bold">৳{item.price * item.quantity}</div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-400 hover:text-metro transition-colors p-1"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-metro outline-none"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="017..."
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-metro outline-none"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Table No (Dine-in)</label>
                                            <input
                                                type="text"
                                                placeholder="05"
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-metro outline-none"
                                                value={formData.tableNumber}
                                                onChange={e => setFormData({ ...formData, tableNumber: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Address (Delivery)</label>
                                            <textarea
                                                placeholder="House 12, Road 5..."
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-metro outline-none"
                                                value={formData.address}
                                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                            />
                                        </div>
                                    </form>
                                )}
                            </div>

                            <div className="p-6 bg-white border-t">
                                {!showCheckoutForm ? (
                                    <>
                                        <div className="flex justify-between mb-4 text-lg">
                                            <span>Total</span>
                                            <span className="font-bold">৳{total}</span>
                                        </div>
                                        {discountActive && (
                                            <div className="flex justify-between mb-4 text-green-600 font-bold">
                                                <span>Student Discount (15%)</span>
                                                <span>-৳{Math.round(total * 0.15)}</span>
                                            </div>
                                        )}
                                        <button
                                            onClick={() => setShowCheckoutForm(true)}
                                            className="w-full bg-metro text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-red-700 transition-colors"
                                        >
                                            Checkout (৳{finalTotal})
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setShowCheckoutForm(false)}
                                            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold"
                                        >
                                            Back
                                        </button>
                                        <button
                                            form="checkout-form"
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 bg-metro text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50"
                                        >
                                            {isSubmitting ? "Placing Order..." : `Confirm ৳${finalTotal}`}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
