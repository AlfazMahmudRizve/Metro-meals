"use client";

import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

// Register ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export function RevenueChart({ orders }: { orders: any[] }) {
    // Process Data: Last 7 days revenue
    const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
    }).reverse();

    const revenueData = last7Days.map(date => {
        return orders
            .filter(o => o.created_at.startsWith(date))
            .reduce((acc, o) => acc + o.total_amount, 0);
    });

    const data = {
        labels: last7Days.map(d => new Date(d).toLocaleDateString('en-US', { weekday: 'short' })),
        datasets: [
            {
                label: 'Revenue (৳)',
                data: revenueData,
                backgroundColor: 'rgba(230, 33, 41, 0.8)', // Metro Red
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Weekly Revenue' },
        },
        scales: {
            y: { beginAtZero: true }
        }
    };

    return <Bar data={data} options={options} />;
}

export function CategoryPieChart({ orders }: { orders: any[] }) {
    // Process Data: Items by Category
    // Note: detailed items are in order.items JSON
    // We assume items have a 'category' field inside the JSON or we'd need to join.
    // Since we store simple item JSON without category in `orders` usually, we might rely on item names or fetch.
    // For MVP, let's just count item occurrences if category is missing, OR better:
    // We update placeOrder to include category in the items json!
    // But for now, let's just use a dummy distribution or existing logic if available.

    // Let's count by generic types if possible or just item names?
    // Let's use Top 5 Items distribution for now as a Pie

    const itemCounts: Record<string, number> = {};
    orders.forEach(o => {
        o.items.forEach((i: any) => {
            itemCounts[i.name] = (itemCounts[i.name] || 0) + i.quantity;
        });
    });

    // Top 5
    const topItems = Object.entries(itemCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    const data = {
        labels: topItems.map(([name]) => name),
        datasets: [
            {
                data: topItems.map(([, count]) => count),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                ],
            },
        ],
    };

    const options = {
        plugins: {
            title: { display: true, text: 'Top Items Sold' },
        },
    };

    return <Pie data={data} options={options} />;
}
