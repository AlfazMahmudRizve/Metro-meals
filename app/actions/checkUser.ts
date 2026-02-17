"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function checkPhoneExists(phone: string) {
    if (!phone || phone.length < 11) return { exists: false };

    const { data, error } = await supabase
        .from("customers")
        .select("id")
        .eq("phone", phone)
        .single();

    if (error || !data) return { exists: false };
    return { exists: true };
}
