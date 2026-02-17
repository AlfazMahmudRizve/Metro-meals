"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getMenuItems() {
    const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("category", { ascending: true }); // simplified sort

    if (error) {
        console.error("Fetch Error:", error);
        return [];
    }
    return data;
}

export async function createMenuItem(formData: FormData) {
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const image = formData.get("image") as string;
    const tagsString = formData.get("tags") as string; // Expecting comma separated

    const tags = tagsString ? tagsString.split(",").map(t => t.trim()) : [];

    const { error } = await supabase.from("menu_items").insert({
        name,
        price,
        category,
        image,
        tags
    });

    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/dashboard/menu");
    return { success: true };
}

export async function updateMenuItem(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const category = formData.get("category") as string;
    const image = formData.get("image") as string;
    const tagsString = formData.get("tags") as string;

    const tags = tagsString ? tagsString.split(",").map(t => t.trim()) : [];

    const { error } = await supabase
        .from("menu_items")
        .update({ name, price, category, image, tags })
        .eq("id", id);

    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/dashboard/menu");
    return { success: true };
}

export async function deleteMenuItem(id: string) {
    const { error } = await supabase.from("menu_items").delete().eq("id", id);

    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/dashboard/menu");
    return { success: true };
}

export async function toggleItemAvailability(id: string, currentStatus: boolean) {
    const { error } = await supabase
        .from("menu_items")
        .update({ available: !currentStatus })
        .eq("id", id);

    if (error) return { success: false, error: error.message };

    revalidatePath("/");
    revalidatePath("/dashboard/menu");
    return { success: true };
}
