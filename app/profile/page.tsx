"use client";

import { useEffect, useState } from "react";
import { getCustomerSession } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import { User, Clock, ShoppingBag, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutCustomer } from "@/lib/auth";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProfilePage() {
    const [customer, setCustomer] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function loadData() {
            const session = await getCustomerSession();
            if (!session) {
                router.push("/login");
                return;
            }

            // Fetch fresh customer data
            const { data: customerData } = await supabase
                .from("customers")
                .select("*")
                .eq("id", session.id)
                .single();

            setCustomer(customerData);

            // Fetch orders
            const { data: ordersData } = await supabase
                .from("orders")
                .select("*")
                .eq("customer_id", session.id)
                .order("created_at", { ascending: false });

            if (ordersData) setOrders(ordersData);
            setLoading(false);
        }
        loadData();
    }, [router]);

    async function handleLogout() {
        await logoutCustomer();
        router.push("/");
    }

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            <div className="bg-metro text-white pb-20 pt-8 px-6">
                <div className="max-w-4xl mx-auto flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-extrabold font-heading">My Profile</h1>
                        <p className="opacity-80">Welcome back, {customer?.name}!</p>
                    </div>
                    <button onClick={handleLogout} className="bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-12 space-y-8">
                {/* Stats */}
                <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-50 p-4 rounded-full text-metro">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Customer Info</p>
                            <p className="font-bold text-gray-900">{customer?.phone}</p>
                            <p className="text-xs text-gray-400 truncate w-32">{customer?.address}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-green-50 p-4 rounded-full text-green-600">
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Total Spend</p>
                            <p className="font-bold text-2xl text-gray-900">৳{customer?.total_spend}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-orange-50 p-4 rounded-full text-orange-500">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Total Visits</p>
                            <p className="font-bold text-2xl text-gray-900">{customer?.visit_count}</p>
                        </div>
                    </div>
                </div>

                {/* Order History */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Order History</h2>
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <span className="text-xs text-gray-400 font-mono">#{order.id.slice(0, 8)}</span>
                                    </div>
                                    <div className="text-sm font-medium text-gray-600">
                                        {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {order.items.map((i: any) => `${i.quantity}x ${i.name}`).join(", ")}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-extrabold text-gray-900">৳{order.total_amount}</div>
                                    <button onClick={() => router.push(`/success?id=${order.id}`)} className="text-xs font-bold text-metro hover:underline mt-1">
                                        View Receipt
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
