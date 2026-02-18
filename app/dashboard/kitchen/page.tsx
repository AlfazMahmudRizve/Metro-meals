"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import { Column } from "@/components/dashboard/SharedComponents";
import OrderCard from "@/components/dashboard/OrderCard";
import { MetricCard } from "@/components/dashboard/SharedComponents";
import { ChefHat, Flame, Utensils, ShoppingBag, Truck, Clock, AlertCircle, CheckCircle } from "lucide-react";

export default function KitchenPage() {
    const { orders, handleStatusUpdate } = useDashboardData();

    // 1. MAIN KANBAN LOGIC (Status-based)
    const pendingOrders = orders.filter(o => o.status === "pending");
    const cookingOrders = orders.filter(o => o.status === "cooking");
    const completedOrders = orders.filter(o => o.status === "completed").slice(0, 10);
    const activeOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'cooking').length;

    // 2. ORDER TYPE LOGIC (Channel-based) - For the tables below
    const activeOrders = orders.filter(o => o.status !== "completed" && o.status !== "cancelled");
    const dineInOrders = activeOrders.filter(o => o.order_type === 'dine-in' || !o.order_type);
    const takeoutOrders = activeOrders.filter(o => o.order_type === 'takeout');
    const deliveryOrders = activeOrders.filter(o => o.order_type === 'delivery');

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-300 pb-20">
            {/* Header Metrics */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg w-fit">
                    <ChefHat className="text-orange-600" size={20} />
                    <h2 className="text-lg font-bold font-heading text-orange-800">Kitchen Command Center</h2>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-bold text-gray-600">
                    <Clock size={16} />
                    <span>Avg Prep Time: 12m</span>
                </div>
            </div>

            <MetricCard
                title="Active Orders"
                value={activeOrdersCount}
                icon={<Flame className="text-orange-500" size={24} />}
                color="border-orange-500 bg-orange-50/10"
                trend={`${pendingOrders.length} Pending`}
            />

            {/* SECTION 1: MAIN KANBAN BOARD (Workflow) */}
            <div>
                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Flame size={16} /> Live Workflow
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
                    <Column
                        title="PENDING"
                        count={pendingOrders.length}
                        color="bg-red-50/50 border-red-100"
                        headerColor="bg-red-600 text-white"
                        icon={<AlertCircle size={18} />}
                    >
                        {pendingOrders.map(order => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onAction={() => handleStatusUpdate(order.id, "cooking")}
                                actionLabel="Start Cooking"
                                actionColor="bg-gray-900 hover:bg-gray-800 text-white"
                                isPending
                            />
                        ))}
                    </Column>

                    <Column
                        title="COOKING"
                        count={cookingOrders.length}
                        color="bg-yellow-50/50 border-yellow-100"
                        headerColor="bg-yellow-400 text-black"
                        icon={<ChefHat size={18} />}
                    >
                        {cookingOrders.map(order => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onAction={() => handleStatusUpdate(order.id, "completed")}
                                actionLabel="Mark Ready"
                                actionColor="bg-green-600 hover:bg-green-700 text-white"
                            />
                        ))}
                    </Column>

                    <Column
                        title="READY"
                        count={completedOrders.length}
                        color="bg-gray-50 border-gray-100"
                        headerColor="bg-gray-200 text-gray-700"
                        icon={<CheckCircle size={18} />}
                    >
                        {completedOrders.map(order => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                isCompleted
                            />
                        ))}
                    </Column>
                </div>
            </div>

            {/* SECTION 2: ORDER TYPE BREAKDOWN (Tables) */}
            <div>
                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2 mt-8">
                    <Utensils size={16} /> Channel Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Dine-In Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-4 py-3 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
                            <span className="font-bold text-blue-800 flex items-center gap-2 text-sm"><Utensils size={14} /> Dine-In</span>
                            <span className="bg-blue-200 text-blue-800 text-[10px] px-2 py-0.5 rounded-full font-bold">{dineInOrders.length}</span>
                        </div>
                        <div className="p-2 max-h-[300px] overflow-y-auto">
                            {dineInOrders.length === 0 && <p className="text-center text-xs text-gray-400 py-4">No active orders</p>}
                            {dineInOrders.map(order => (
                                <ChannelOrderRow key={order.id} order={order} />
                            ))}
                        </div>
                    </div>

                    {/* Takeout Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-4 py-3 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
                            <span className="font-bold text-purple-800 flex items-center gap-2 text-sm"><ShoppingBag size={14} /> Takeout</span>
                            <span className="bg-purple-200 text-purple-800 text-[10px] px-2 py-0.5 rounded-full font-bold">{takeoutOrders.length}</span>
                        </div>
                        <div className="p-2 max-h-[300px] overflow-y-auto">
                            {takeoutOrders.length === 0 && <p className="text-center text-xs text-gray-400 py-4">No active orders</p>}
                            {takeoutOrders.map(order => (
                                <ChannelOrderRow key={order.id} order={order} />
                            ))}
                        </div>
                    </div>

                    {/* Delivery Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-4 py-3 bg-orange-50 border-b border-orange-100 flex justify-between items-center">
                            <span className="font-bold text-orange-800 flex items-center gap-2 text-sm"><Truck size={14} /> Delivery</span>
                            <span className="bg-orange-200 text-orange-800 text-[10px] px-2 py-0.5 rounded-full font-bold">{deliveryOrders.length}</span>
                        </div>
                        <div className="p-2 max-h-[300px] overflow-y-auto">
                            {deliveryOrders.length === 0 && <p className="text-center text-xs text-gray-400 py-4">No active orders</p>}
                            {deliveryOrders.map(order => (
                                <ChannelOrderRow key={order.id} order={order} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Mini Component for the list rows
function ChannelOrderRow({ order }: { order: any }) {
    return (
        <div className="flex justify-between items-center p-2 mb-1 rounded hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
            <div className="flex flex-col">
                <span className="font-bold text-xs text-gray-800">#{order.id.slice(0, 4)}</span>
                <span className="text-[10px] text-gray-500">{order.customers?.name || 'Guest'}</span>
            </div>
            <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${order.status === 'pending' ? 'bg-red-100 text-red-600' :
                    order.status === 'cooking' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                }`}>
                {order.status}
            </div>
        </div>
    );
}
