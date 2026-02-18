"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { updateOrderStatus } from "@/app/actions/updateOrder";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type Order = {
    id: string;
    customer_id: string;
    items: any[];
    total_amount: number;
    status: string;
    created_at: string;
    table_number?: string;
    order_type?: string;
    customers?: {
        name: string;
        phone: string;
        visit_count: number;
        total_spend: number;
    };
};

export type Customer = {
    id: string;
    name: string;
    phone: string;
    total_spend: number;
    visit_count: number;
};

export function useDashboardData() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [storeStatus, setStoreStatus] = useState<{ isOpen: boolean, message: string, isManual: boolean, expiresAt?: string } | null>(null);
    const [audio] = useState(typeof Audio !== "undefined" ? new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3") : null);

    // Initial Fetch
    useEffect(() => {
        const fetchData = async () => {
            // Fetch Store Status
            const { getStoreStatus } = await import("@/app/actions/storeStatus");
            const status = await getStoreStatus();
            setStoreStatus(status);

            // Fetch Orders with Customer Data
            const { data: ordersData } = await supabase
                .from("orders")
                .select("*, customers(name, phone, visit_count, total_spend)")
                .order("created_at", { ascending: false });

            if (ordersData) setOrders(ordersData as any);

            // Fetch Top Customers (Whales)
            const { data: customersData } = await supabase
                .from("customers")
                .select("*")
                .order("total_spend", { ascending: false })
                .limit(50); // Increased limit for leaderboard

            if (customersData) setCustomers(customersData);
        };

        fetchData();

        // Realtime Subscription
        const channel = supabase
            .channel("realtime_dashboard")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, async (payload) => {
                console.log("New order!", payload);
                // Refetch to get customer relation
                const { data } = await supabase
                    .from("orders")
                    .select("*, customers(name, phone, visit_count, total_spend)")
                    .eq("id", payload.new.id)
                    .single();

                if (data) {
                    setOrders((prev) => [data as any, ...prev]);
                    if (audio) {
                        try { await audio.play(); } catch (e) { console.log('Audio blocked', e); }
                    }
                }
            })
            .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders" }, (payload) => {
                setOrders((prev) => prev.map(o => o.id === payload.new.id ? { ...o, ...payload.new } : o));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [audio]);

    const handleStatusUpdate = async (id: string, status: string) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
        await updateOrderStatus(id, status);
    };

    const handleToggleStore = async () => {
        if (!storeStatus) return;
        const { toggleStoreStatus, getStoreStatus } = await import("@/app/actions/storeStatus");

        // Optimistic UI
        const newStatus = !storeStatus.isOpen;
        setStoreStatus(prev => prev ? { ...prev, isOpen: newStatus, isManual: true } : null);

        await toggleStoreStatus(newStatus ? "OPEN" : "CLOSED");
        const updated = await getStoreStatus();
        setStoreStatus(updated);
    };

    return {
        orders,
        customers,
        storeStatus,
        handleStatusUpdate,
        handleToggleStore
    };
}
