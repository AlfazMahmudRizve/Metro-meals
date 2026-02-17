"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function StoreStatusBanner() {
    const [status, setStatus] = useState<{ isOpen: boolean; message: string; isManual: boolean } | null>(null);

    const fetchStatus = async () => {
        const { getStoreStatus } = await import("@/app/actions/storeStatus");
        const data = await getStoreStatus();
        setStatus(data);
    };

    useEffect(() => {
        // Initial Fetch
        fetchStatus();

        // Realtime Subscription
        const channel = supabase
            .channel("store_status_sync")
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "store_settings", filter: "id=eq.1" },
                () => {
                    // Re-fetch full status logic (actions have business logic)
                    fetchStatus();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    if (!status || status.isOpen) return null;

    return (
        <div className="bg-red-600 text-white py-3 px-4 text-center font-bold sticky top-0 z-[60] shadow-md flex items-center justify-center gap-2 animate-in slide-in-from-top duration-500">
            <Clock size={20} className="animate-pulse" />
            <span>{status.message}</span>
        </div>
    );
}
