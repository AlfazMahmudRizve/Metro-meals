# 📘 Urban Harvest Cafe - User & Admin Guide

Welcome to the official documentation for **Urban Harvest Cafe**. This guide will help both customers and administrators get the most out of our modern food ordering platform.

---

## 🥐 For Customers: Ordering Made Simple

Experience the warmth of artisanal food with our easy-to-use ordering system.

### 1. **Browsing the Menu**
- **Categories**: Use the sticky navigation bar to jump between *Breakfast*, *Lunch*, *Dinner*, *Drinks*, and *Dessert*.
- **"Steaming" Items**: Look for the 🔥 icon to find our hot, fresh-out-the-oven specials.
- **Search**: (Coming Soon) Quickly find your favorite latte or croissant.

### 2. **Building Your Tray (Cart)**
- **Add to Tray**: Click the **"Add +"** button on any item card.
- **Adjust Quantity**: Use the **+** and **-** buttons in your tray to add more or remove items.
- **Live Total**: See your total bill update instantly as you add items.

### 3. **Discounts & Loyalty**
- **Student Discount**: Order **3 or more items** to automatically unlock a **15% Student Discount**.
- **Loyalty Program**: (Coming Soon) Earn points for every taka you spend!

### 4. **Checkout**
1.  Open your **Serving Tray** (Cart icon).
2.  Review your items and total.
3.  Click **"Proceed to Checkout"**.
4.  Enter your Name, Phone Number, and delivery details (or Table Number for dine-in).
5.  Click **"Confirm Order"**.
6.  You'll be redirected to a **Success Page** with your Order ID.

---

## 👑 For the Owner: Harvest OS Dashboard

Manage your cafe efficiently with **Harvest OS**, our custom-built admin panel.

### 🔐 Accessing the Dashboard
- **URL**: Go to `/dashboard/login` (e.g., `your-site.com/dashboard/login`).
- **Credentials**: Enter your secure admin username and password.

### 📊 Dashboard Overview
Once logged in, you'll see the **Kitchen Command Center**:
- **Revenue Charts**: Visual bar charts showing daily and weekly revenue in Taka (৳).
- **Popular Items**: A breakdown of your top-selling items (Espresso vs Latte?).
- **Recent Orders**: A live feed of incoming orders with customer details and status.

### 🍔 Menu Management
Go to the **"Menu"** tab to update your offerings:
- **Add Item**: Click "Add New Item", fill in name, price, category, and upload an image URL.
- **Edit Item**: Click the pencil icon to change prices or descriptions.
- **Delete Item**: Remove seasonal items that are no longer available.
- **Stock Status**: Toggle items as "Sold Out" instantly to prevent orders.

### 📦 Order Management
- **View Orders**: See all pending, cooking, and delivered orders.
- **Update Status**: Move an order from **"Pending"** → **"Cooking"** → **"Ready"** → **"Delivered"** with a single click.
- **Customer Info**: Access phone numbers and addresses for delivery coordination.

---

## 🛠 For Developers: Quick Start

### Tech Stack
-   **Framework**: Next.js 14 (App Router)
-   **Styling**: Tailwind CSS (Espresso/Sage/Cream Palette)
-   **State**: Zustand (Cart & User Session)
-   **Database**: Supabase (PostgreSQL)

### Running Locally
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Deployment
The project is optimized for deployment on Vercel. Ensure your environment variables (Supabase URL/Key) are set in the Vercel project settings.

---

*© 2026 Urban Harvest Cafe. All rights reserved.*
