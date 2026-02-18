"use client";

import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export function MetricCard({ title, value, icon, color, trend }: any) {
    return (
        <div className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${color} flex items-center justify-between`}>
            <div>
                <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">{title}</p>
                <div className="text-4xl font-extrabold font-heading mt-1 text-gray-900">{value}</div>
                <p className="text-xs font-medium text-gray-400 mt-2">{trend}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl">
                {icon}
            </div>
        </div>
    );
}

export function Column({ title, count, color, headerColor, icon, children, maxHeight }: any) {
    return (
        <div className={`flex flex-col rounded-2xl border ${color} overflow-hidden bg-white shadow-sm h-full`}>
            <div className={`p-4 font-bold flex justify-between items-center ${headerColor}`}>
                <div className="flex items-center gap-2 uppercase tracking-widest text-sm">
                    {icon}
                    {title}
                </div>
                <span className="bg-black/20 text-white px-2 py-1 rounded text-xs font-bold">{count}</span>
            </div>
            <div className={`flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 ${maxHeight || ''}`}>
                <AnimatePresence mode="popLayout">
                    {children}
                </AnimatePresence>
            </div>
        </div>
    );
}
