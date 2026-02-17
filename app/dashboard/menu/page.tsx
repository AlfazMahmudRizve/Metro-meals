"use client";

import { useEffect, useState } from "react";
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem, toggleItemAvailability } from "@/app/actions/menu";
import { Plus, Edit2, Trash2, X, Save, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuDashboard() {
    const [items, setItems] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Initial Fetch
    useEffect(() => {
        loadItems();
    }, []);

    async function loadItems() {
        const data = await getMenuItems();
        setItems(data);
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Optimistic Update (sort of) - we just reload for now
        if (editingItem) {
            await updateMenuItem(editingItem.id, formData);
        } else {
            await createMenuItem(formData);
        }

        setIsModalOpen(false);
        setEditingItem(null);
        loadItems();
    }

    async function handleDelete(id: string) {
        if (confirm("Are you sure you want to delete this item?")) {
            await deleteMenuItem(id);
            loadItems();
        }
    }

    async function handleToggle(id: string, current: boolean) {
        await toggleItemAvailability(id, current);
        loadItems();
    }

    function openAddModal() {
        setEditingItem(null);
        setIsModalOpen(true);
    }

    function openEditModal(item: any) {
        setEditingItem(item);
        setIsModalOpen(true);
    }

    const categories = Array.from(new Set(items.map(i => i.category)));

    if (loading) return <div className="p-8 text-center">Loading Menu...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold font-heading text-gray-900 tracking-tight">Menu Manager 🍔</h1>
                    <p className="text-gray-500 font-medium mt-1">Update prices, items, and availability.</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-metro hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
                >
                    <Plus size={20} /> Add New Item
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <motion.div
                        layout
                        key={item.id}
                        className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative group ${!item.available ? 'opacity-60 grayscale' : ''}`}
                    >
                        <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 bg-gray-100 relative">
                            {/* Valid Image Check or Placeholder */}
                            <img
                                src={item.image || "https://placehold.co/600x400?text=No+Image"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            {!item.available && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white font-bold uppercase tracking-widest border-2 border-white px-4 py-1">Unavailable</span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 leading-tight">{item.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md uppercase">{item.category}</span>
                                    <span className="text-lg font-extrabold text-metro">৳{item.price}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            <button
                                onClick={() => openEditModal(item)}
                                className="flex items-center justify-center gap-1 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-xs"
                            >
                                <Edit2 size={14} /> Edit
                            </button>
                            <button
                                onClick={() => handleToggle(item.id, item.available)}
                                className={`flex items-center justify-center gap-1 py-2 rounded-lg font-bold text-xs ${item.available ? 'bg-orange-50 hover:bg-orange-100 text-orange-700' : 'bg-green-50 hover:bg-green-100 text-green-700'}`}
                            >
                                {item.available ? <><EyeOff size={14} /> Disable</> : <><Eye size={14} /> Enable</>}
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="flex items-center justify-center gap-1 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs"
                            >
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white p-6 rounded-3xl w-full max-w-lg shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold font-heading">{editingItem ? "Edit Item" : "New Delicious Item"}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Item Name</label>
                                    <input name="name" defaultValue={editingItem?.name} required className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-metro font-bold" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (৳)</label>
                                        <input name="price" type="number" defaultValue={editingItem?.price} required className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-metro font-bold" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                                        <input name="category" list="categories" defaultValue={editingItem?.category} required className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-metro font-bold" />
                                        <datalist id="categories">
                                            {categories.map((c: any) => <option key={c} value={c} />)}
                                            <option value="New Category" />
                                        </datalist>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL</label>
                                    <input name="image" defaultValue={editingItem?.image} placeholder="https://..." className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-metro font-mono text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tags (comma separated)</label>
                                    <input name="tags" defaultValue={editingItem?.tags?.join(", ")} placeholder="spicy, bestseller" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-metro font-medium" />
                                </div>

                                <button type="submit" className="w-full bg-metro hover:bg-red-700 text-white py-4 rounded-xl font-bold shadow-lg mt-4 flex justify-center items-center gap-2">
                                    <Save size={20} /> {editingItem ? "Update Item" : "Create Item"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
