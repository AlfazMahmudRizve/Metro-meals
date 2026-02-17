"use client";

import { Clock, MapPin, Truck, Utensils, ShoppingBag } from "lucide-react";
import { getFormattedHours, isStoreOpen, SERVICES } from "@/lib/utils/businessHours";
import { useEffect, useState } from "react";

export default function InfoSection() {
    const hours = getFormattedHours();
    const [status, setStatus] = useState<{ isOpen: boolean, message: string } | null>(null);

    useEffect(() => {
        setStatus(isStoreOpen());
    }, []);

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start max-w-5xl mx-auto">

                    {/* Hours Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="text-metro" size={32} />
                            <h2 className="font-heading font-bold text-3xl text-gray-800">Opening Hours</h2>
                        </div>

                        <div className="bg-plate rounded-2xl p-6 shadow-sm border border-gray-200">
                            {/* Status Badge */}
                            <div className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${status?.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}>
                                <div className={`w-2 h-2 rounded-full ${status?.isOpen ? "bg-green-600 animate-pulse" : "bg-red-600"}`} />
                                {status?.message}
                            </div>

                            <ul className="space-y-3">
                                {hours.map((h, i) => (
                                    <li key={i} className="flex justify-between items-center text-gray-700 border-b border-gray-200/50 pb-2 last:border-0 last:pb-0">
                                        <span className="font-bold">{h.day}</span>
                                        <span className="font-mono text-sm">{h.time}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-xs text-gray-400 mt-4 text-center">Timezone: Asia/Dhaka (GMT+6)</p>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Utensils className="text-cheese" size={32} />
                            <h2 className="font-heading font-bold text-3xl text-gray-800">Services</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {SERVICES.map((service) => (
                                <div key={service} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-cheese/50 transition-colors group">
                                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-cheese/20 transition-colors">
                                        {service === "Delivery" && <Truck size={20} className="text-metro" />}
                                        {service === "Takeout" && <ShoppingBag size={20} className="text-metro" />}
                                        {service === "Dine-in" && <Utensils size={20} className="text-metro" />}
                                        {service === "In-store pickup" && <MapPin size={20} className="text-metro" />}
                                    </div>
                                    <span className="font-bold text-gray-700">{service}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
