"use client";

import { usePathname } from "next/navigation";
import { LayoutGrid, Utensils, Store, TrendingUp, ChefHat, Users } from "lucide-react";
import Link from "next/link";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function DashboardHeader() {
    const pathname = usePathname();
    const { storeStatus, handleToggleStore } = useDashboardData();

    // Helper to check active state
    const isActive = (path: string) => pathname.includes(path);

    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 sticky top-4 z-50 mb-8">
            <div>
                <Link href="/dashboard/kitchen" className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold font-heading text-gray-800">Kitchen Command Center</h1>
                </Link>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>running on Harvest OS 🌿</span>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                {/* Navigation Buttons */}
                <div className="flex items-center gap-1 mr-4 bg-gray-50 p-1 rounded-lg border border-gray-200">
                    <Link
                        href="/dashboard/analytics"
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${isActive('analytics')
                                ? "bg-white text-green-600 shadow-sm"
                                : "text-gray-600 hover:bg-white hover:text-green-600"
                            }`}
                    >
                        <TrendingUp size={14} /> Analytics
                    </Link>
                    <Link
                        href="/dashboard/kitchen"
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${isActive('kitchen')
                                ? "bg-white text-orange-600 shadow-sm"
                                : "text-gray-600 hover:bg-white hover:text-orange-600"
                            }`}
                    >
                        <ChefHat size={14} /> Kitchen
                    </Link>
                    <Link
                        href="/dashboard/customers"
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${isActive('customers')
                                ? "bg-white text-purple-600 shadow-sm"
                                : "text-gray-600 hover:bg-white hover:text-purple-600"
                            }`}
                    >
                        <Users size={14} /> Customers
                    </Link>
                </div>

                {storeStatus && (
                    <button
                        onClick={handleToggleStore}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs transition-all border active:scale-95 ${storeStatus.isOpen
                            ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                            : "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                            }`}
                    >
                        <div className={`w-2 h-2 rounded-full ${storeStatus.isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                        {storeStatus.isOpen ? "OPEN" : "CLOSED"}
                        {storeStatus.isManual && (
                            <span className="text-[9px] bg-white/50 px-1 py-0.5 rounded ml-1 border border-black/5 opacity-70">
                                M
                            </span>
                        )}
                    </button>
                )}

                <a
                    href="/dashboard/menu"
                    className="bg-white hover:bg-gray-50 text-gray-700 font-bold px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm transition-all active:scale-95 flex items-center gap-2 text-xs"
                >
                    <Utensils size={14} /> Menu
                </a>
                <a
                    href="/"
                    target="_blank"
                    className="bg-espresso text-cream hover:bg-espresso/90 font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95 flex items-center gap-2 text-xs"
                >
                    <Store size={14} /> Store
                </a>
            </div>
        </header>
    );
}
