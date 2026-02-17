"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function StoreStatusBanner() {
    const [status, setStatus] = useState<{ isOpen: boolean; message: string; isManual: boolean } | null>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            const { getStoreStatus } = await import("@/app/actions/storeStatus");
            const data = await getStoreStatus();
            setStatus(data);
        };
        fetchStatus();
    }, []);

    if (!status || status.isOpen) return null;

    return (
        <div className="bg-red-600 text-white py-3 px-4 text-center font-bold sticky top-0 z-[60] shadow-md flex items-center justify-center gap-2 animate-in slide-in-from-top duration-500">
            <Clock size={20} className="animate-pulse" />
            <span>{status.message}</span>
        </div>
    );
}
