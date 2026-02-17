"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, ChefHat, Utensils } from "lucide-react";

const steps = [
    { id: 1, label: "Order Received", icon: Clock, status: "completed" },
    { id: 2, label: "Cooking", icon: ChefHat, status: "current" },
    { id: 3, label: "Ready to Serve", icon: Utensils, status: "pending" },
];

export default function StatusPage() {
    return (
        <main className="min-h-screen bg-plate p-4 flex flex-col items-center pt-20">
            <h1 className="font-heading font-bold text-3xl mb-12">Order Status</h1>

            <div className="space-y-8 w-full max-w-md relative">
                {/* Connecting Line */}
                <div className="absolute left-6 top-4 bottom-4 w-1 bg-gray-200 -z-10" />

                {steps.map((step, index) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-center gap-6"
                    >
                        <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 ${step.status === "completed" ? "bg-green-500 border-green-500 text-white" :
                                step.status === "current" ? "bg-white border-metro text-metro animate-pulse" :
                                    "bg-white border-gray-300 text-gray-300"
                            }`}>
                            <step.icon size={20} />
                        </div>

                        <div>
                            <h3 className={`font-bold text-xl ${step.status === "pending" ? "text-gray-400" : "text-gray-900"
                                }`}>
                                {step.label}
                            </h3>
                            {step.status === "current" && (
                                <p className="text-metro text-sm font-medium">Estimated: 15 mins</p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
