"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { isStoreOpen as checkSchedule, getNextScheduleChange } from "@/lib/utils/businessHours";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getStoreStatus() {
    // 1. Check for Manual Override
    const { data: settings } = await supabase
        .from("store_settings")
        .select("manual_status, override_expires_at")
        .eq("id", 1)
        .single();

    if (settings && settings.manual_status && settings.override_expires_at) {
        const expiresAt = new Date(settings.override_expires_at);
        if (expiresAt > new Date()) {
            const isOpen = settings.manual_status === "OPEN";
            return {
                isOpen,
                message: isOpen
                    ? `Store is Manually OPEN until ${expiresAt.toLocaleTimeString()}`
                    : `Store is Manually CLOSED until ${expiresAt.toLocaleTimeString()}`,
                isManual: true,
                expiresAt: settings.override_expires_at
            };
        }
    }

    // 2. Fallback to Regular Schedule
    const status = checkSchedule();
    return { ...status, isManual: false };
}

export async function toggleStoreStatus(forceStatus: "OPEN" | "CLOSED" | null) {
    if (forceStatus === null) {
        // Clear override
        await supabase
            .from("store_settings")
            .update({ manual_status: null, override_expires_at: null })
            .eq("id", 1);
    } else {
        // Create override until next schedule change
        const nextChange = getNextScheduleChange();

        await supabase
            .from("store_settings")
            .update({
                manual_status: forceStatus,
                override_expires_at: nextChange.toISOString()
            })
            .eq("id", 1);
    }

    revalidatePath("/dashboard");
    revalidatePath("/"); // Update homepage/cart check
    return { success: true };
}
