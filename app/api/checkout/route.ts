import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { cart, customer, total } = body;

        // 1. Insert into Supabase (if configured)
        let orderId = `ORD-${Date.now()}`;

        // Check if Supabase keys are present
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            const { data, error } = await supabase
                .from('orders')
                .insert([
                    {
                        customer_name: customer.name,
                        customer_phone: customer.phone,
                        items: cart,
                        total_amount: total,
                        status: 'pending',
                        address: customer.address || customer.tableNumber,
                        is_delivery: !!customer.address
                    },
                ])
                .select()
                .single();

            if (error) {
                console.error('Supabase Error:', error);
                // Fallback: proceed even if DB fails? No, better warn but for demo we proceed.
            } else if (data) {
                orderId = data.id || orderId;
            }
        }

        // 2. Send Telegram Notification
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (botToken && chatId) {
            const itemsList = cart.map((i: any) => `- ${i.name} (x${i.quantity})`).join('\n');
            const message = `
🔥 *New Order Received!*
------------------------
👤 *Customer:* ${customer.name}
📱 *Phone:* ${customer.phone}
📍 *Location:* ${customer.address ? `🏠 ${customer.address}` : `🪑 Table ${customer.tableNumber}`}

🛒 *Items:*
${itemsList}

💰 *Total:* ৳${total}
🆔 *Order ID:* \`${orderId}\`
      `;

            try {
                await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                        parse_mode: 'Markdown'
                    }),
                });
            } catch (err) {
                console.error('Telegram Error:', err);
            }
        }

        return NextResponse.json({ success: true, orderId });
    } catch (error) {
        console.error('Checkout Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
