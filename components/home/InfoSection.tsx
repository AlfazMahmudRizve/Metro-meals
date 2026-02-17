"use client";

import { Clock, MapPin, Truck, Utensils, ShoppingBag, Phone, Mail } from "lucide-react";
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
                            <Clock className="text-espresso" size={32} />
                            <h2 className="font-heading font-bold text-3xl text-espresso">Cafe Hours</h2>
                        </div>

                        <div className="bg-cream rounded-2xl p-6 shadow-sm border border-latte/20">
                            {/* Status Badge */}
                            <div className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${status?.isOpen ? "bg-sage/10 text-sage" : "bg-red-100 text-red-700"
                                }`}>
                                <div className={`w-2 h-2 rounded-full ${status?.isOpen ? "bg-sage animate-pulse" : "bg-red-600"}`} />
                                {status?.message}
                            </div>

                            <ul className="space-y-3">
                                {hours.map((h, i) => (
                                    <li key={i} className="flex justify-between items-center text-espresso/80 border-b border-latte/10 pb-2 last:border-0 last:pb-0 font-sans">
                                        <span className="font-bold">{h.day}</span>
                                        <span className="font-bold text-sm">{h.time}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-xs text-gray-400 mt-4 text-center">Timezone: Asia/Dhaka (GMT+6)</p>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Utensils className="text-latte" size={32} />
                            <h2 className="font-heading font-bold text-3xl text-espresso">Services</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {SERVICES.map((service) => (
                                <div key={service} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-latte/20 hover:border-latte transition-colors group">
                                    <div className="p-2 bg-cream rounded-lg group-hover:bg-latte/20 transition-colors">
                                        {service === "Delivery" && <Truck size={20} className="text-espresso" />}
                                        {service === "Takeout" && <ShoppingBag size={20} className="text-espresso" />}
                                        {service === "Dine-in" && <Utensils size={20} className="text-espresso" />}
                                        {service === "In-store pickup" && <MapPin size={20} className="text-espresso" />}
                                    </div>
                                    <span className="font-bold text-espresso">{service}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Column */}
                    <div className="md:col-span-2 mt-8 border-t border-latte/20 pt-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                            <div className="flex flex-col items-center md:items-start">
                                <MapPin className="text-espresso mb-2" size={24} />
                                <h3 className="font-bold text-espresso">Visit Us</h3>
                                <p className="text-espresso/70 text-sm mt-1 font-sans">
                                    House 123, Road 4, Block B<br />
                                    Banani, Dhaka, Bangladesh
                                </p>
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <Phone className="text-latte mb-2" size={24} />
                                <h3 className="font-bold text-espresso">Call Us</h3>
                                <p className="text-espresso/70 text-sm mt-1 font-sans">
                                    <a href="tel:+8801234567890" className="hover:text-sage transition-colors">+880 1234-567890</a>
                                </p>
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <Mail className="text-espresso mb-2" size={24} />
                                <h3 className="font-bold text-espresso">Email Us</h3>
                                <p className="text-espresso/70 text-sm mt-1 font-sans">
                                    <a href="mailto:urbanharvest.cafe@gmail.com" className="hover:text-sage transition-colors">urbanharvest.cafe@gmail.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
